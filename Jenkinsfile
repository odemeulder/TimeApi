pipeline {
    agent { docker { image 'node:11.0' } }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}