# TimeApi
Test Project to test Jenkins

## How to set up jenkins

Run Jenkins in a docker container. Run the following commands:

```bash
docker pull jenkins/jenkins:lts
docker run -d -v jenkins_home:/var/jenkins_home -p 8080:8080 -p 50000:50000 jenkins/jenkins:lts
```

Some useful docker commands
```bash
docker container ls
```

To view the logs of the Jenkins container
```bash
docker logs [container id]
```