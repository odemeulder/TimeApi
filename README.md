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

Workaround permissions issue, log into the docker container (as root) and change the permissions of the jenkins user.
```bash
docker exec -it -u root [container id] /bin/bash
usermod -a -G root jenkins
exit
docker restart [container id]
```