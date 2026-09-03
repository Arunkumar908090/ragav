pipeline {
    agent any

    tools {
        maven 'Maven'
    }

    stages {
        stage('stage1') {
            steps {
                 sh 'rm -rf frontend/node/ frontend/node_modules/ backend/node/ backend/node_modules/'
                sh 'mvn clean install'
            }
        }
    }
}
