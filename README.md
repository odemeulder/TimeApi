# TimeApi
Test Project to test Jenkins
## How to set up jenkins
Run Jenkins in a docker container. Run the following commands:
```bash
docker pull jenkins/jenkins:lts
docker run -d -v jenkins_home:/var/jenkins_home -p 8080:8080 -p 50000:50000 -v /var/run/docker.sock:/var/run/docker.sock -v /usr/local/bin/docker:/usr/local/bin/docker jenkins/jenkins:lts
```
Some useful docker commands
```bash
docker container ls
```
To view the logs of the Jenkins container
```bash
docker logs [container id]
```
To build the image
```bash
docker image build -t odemeulder/timeapi .
```
Workaround permissions issue, log into the docker container (as root) and change the permissions of the jenkins user.
```bash
docker exec -it -u root [container id] /bin/bash
usermod -a -G root jenkins
exit
docker restart [container id]
```
# Setting an Elastic Container Service on AWS (ECS)
Following [these instructions](https://docs.aws.amazon.com/AWSGettingStartedContinuousDeliveryPipeline/latest/GettingStarted/CICD_Jenkins_Pipeline.html):
## Create the cluster and Jenkins master
Set build the cluster using a cloudformation stack. The stack template is in `deployment` folder.
```bash
# create stack
aws cloudformation create-stack --template-body file://deployment/ecs-cluster.template \
--stack-name ecs-odm-timeapi \
--capabilities CAPABILITY_IAM \
--region us-east-1 \
--tags Key=Name,Value=ECS \
--parameters ParameterKey=KeyName,ParameterValue=kp-odm-eks ParameterKey=EcsCluster,ParameterValue=ecs-cluster-odm-timeapi ParameterKey=AsgMaxSize,ParameterValue=2
# check status
aws cloudformation describe-stacks \
--stack-name ecs-odm-timeapi \
--query 'Stacks[*].[StackId, StackStatus]'
```
Create the Jenkins box
```bash
aws cloudformation create-stack 
--template-body file://deployment/ecs-jenkins.template \
--stack-name JenkinsStack 
--capabilities CAPABILITY_IAM \
--tags Key=Name,Value=Jenkins \
--region us-east-1 \
--parameters ParameterKey=EcsStackName,ParameterValue=ecs-odm-timeapi
```
## Create a container repository
```bash
# create repository
aws ecr create-repository --repository-name odm --region us-east-1
# get docker login in command 
aws ecr get-login --no-include-email
# execute the generated login command
docker login -u AWS -p xxxxx
# or both steps above could have been combined into one:
$(aws ecr get-login --no-include-email)
```
## Create key for github
```bash
# generate key
ssh-keygen -t rsa -b 4096 -C your_email@company.com
# verify that ssh agent is enabled
eval "$(ssh-agent -s)"
# add key to the agent
ssh-add ~/.ssh/id_rsa
# copy the key to clipboard
pbcopy < ~/.ssh/id_rsa.pub
```
Add the key to github, under `settings > SSH & GPG keys`, click `Add SSH key`.
## Create Jenkins job

