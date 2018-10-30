pipeline {
  agent { 
    docker { 
      image 'node:alpine'
      args '-p 3000:3000'
    } 
  }
  stages {
    stage('init') {
      steps {
        sh 'npm --version'
        sh 'echo "Hello World"'
      }
    }
    stage('build') {
      steps {
        sh 'npm install'
      }
    }
    stage('test') {
      steps {
        sh 'npm test'
      }
    }
  }
}