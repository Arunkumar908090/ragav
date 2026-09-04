pipeline {
    agent any

    tools {
        maven 'Maven123'
    }

    stages {
        stage('stage1') {
            steps {
                deleteDir()
                checkout scm
                sh 'mvn clean install'
            }
        }
        stage('stage2') {
            steps {
                sh 'mvn test'
            }
        }
    }
    post {
            success {
                // Captures any JAR file generated inside target directories
                archiveArtifacts artifacts: '**/target/*.jar', allowEmptyArchive: false
            }
        }
    }
