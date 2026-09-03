pipeline {
    agent any

    tools {
        maven 'Maven'
    }

    stages {
        stage('stage1') {
            steps {
                deleteDir()
                checkout scm
                sh 'mvn clean install'
            }
        }
    }
}
