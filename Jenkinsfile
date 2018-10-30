pipeline {
  agent { 
    docker { 
      image 'node:alpine',
      args '-p 3000:3000'
    } 
  }
  stages {
    stage('init') {
      steps {
        sh 'npm --version'
        sh 'echo "Hello World"'
        sh '''
            echo "Multiline shell steps works too"
            ls -lah
        '''
      }
    }
    state('build') {
      steps {
        sh 'npm install'
      }
    }
  }
}