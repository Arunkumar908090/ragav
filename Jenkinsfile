pipeline {
    agent any

    tools {
        maven 'Maven'
    }

    stages {
        stage('stage1') {
            steps {
                sh 'mvn clean install'
            }
        }
    }
}
