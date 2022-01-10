pipeline {
    agent any
    environment {
        IMAGE_REPOSITORY = 'registry.cn-hangzhou.aliyuncs.com'
        IMAGE_NAME = 'xfschain/xfschain-explorer-react'
        CI = 'false'
        REACT_APP_API_BASE_URL = 'https://api.scan.xfs.tech/'
     }
    stages {
        stage('BuildAndRelease') {
            when {
                branch 'main'
            }
            steps {
                script {
                    dockerImage = docker.build("${IMAGE_REPOSITORY}/${IMAGE_NAME}",
                     "--build-arg REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL} .")
                    docker.withRegistry("https://${IMAGE_REPOSITORY}",
                         "${env.DEFAULT_DOCKER_REPOSITORY_CREDENTIAL}"){
                             dockerImage.push()
                        }
                }
            }
        }
    }
}