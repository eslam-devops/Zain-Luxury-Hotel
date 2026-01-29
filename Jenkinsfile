pipeline {
    agent any

    /* =========================
       OPTIONS
    ========================= */
    options {
        buildDiscarder logRotator(
            daysToKeepStr: '30',
            numToKeepStr: '5'
        )
        timestamps()
    }

    /* =========================
       TOOLS
    ========================= */
    tools {
        nodejs 'NodeJS'
    }

    /* =========================
       ENVIRONMENT
    ========================= */
    environment {

        /* DockerHub Credentials */
        dockerhub = credentials('dockerhub-cred')

        /* Docker Images */
        BACKEND_IMAGE  = "eslamzain99/zain-hotel-backend"
        FRONTEND_IMAGE = "eslamzain99/zain-hotel-frontend"
        IMAGE_TAG      = "${BUILD_NUMBER}"

        /* SonarQube */
        SONAR_PROJECT_KEY  = "zain-hotel"
        SONAR_PROJECT_NAME = "zain-hotel-app"
    }

    stages {

        /* =========================
           CHECKOUT
        ========================= */
        stage('Checkout') {
            steps {
                checkout scmGit(
                    branches: [[name: '*/develop']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/eslam-devops/Zain-Luxury-Hotel.git'
                    ]]
                )
            }
        }

        /* =========================
           INSTALL DEPENDENCIES
        ========================= */
        stage('Install Backend Dependencies') {
            steps {
                sh '''
                  cd src/backend
                  npm install
                '''
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                sh '''
                  cd src/frontend
                  npm install
                '''
            }
        }

        /* =========================
           TESTS
        ========================= */
        stage('Run Tests') {
            steps {
                sh '''
                  cd src/backend
                  npm test || true
                '''
            }
        }

        /* =========================
           SONARQUBE
        ========================= */
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQubeServer') {
                    script {
                        def scannerHome = tool 'SonarScanner'
                        sh """
                        ${scannerHome}/bin/sonar-scanner \
                          -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                          -Dsonar.projectName=${SONAR_PROJECT_NAME} \
                          -Dsonar.sources=src \
                          -Dsonar.language=js
                        """
                    }
                }
            }
        }

        /* =========================
           DOCKER BUILD
        ========================= */
        stage('Docker Build') {
            steps {
                sh '''
                  docker build -t backend:${IMAGE_TAG} ./src/backend
                  docker build -t frontend:${IMAGE_TAG} ./src/frontend
                '''
            }
        }

        /* =========================
           TRIVY SCAN
        ========================= */
        stage('Trivy Scan') {
            steps {
                sh '''
                  trivy image --severity HIGH,CRITICAL backend:${IMAGE_TAG} || true
                  trivy image --severity HIGH,CRITICAL frontend:${IMAGE_TAG} || true
                '''
            }
        }

        /* =========================
           DOCKERHUB LOGIN
        ========================= */
        stage('Login to DockerHub') {
            steps {
                sh '''
                  echo $dockerhub_PSW | docker login \
                    -u $dockerhub_USR --password-stdin
                '''
            }
        }

        /* =========================
           PUSH IMAGES
        ========================= */
        stage('Push Images to DockerHub') {
            steps {
                sh '''
                  docker tag backend:${IMAGE_TAG} ${BACKEND_IMAGE}:${IMAGE_TAG}
                  docker tag frontend:${IMAGE_TAG} ${FRONTEND_IMAGE}:${IMAGE_TAG}

                  docker push ${BACKEND_IMAGE}:${IMAGE_TAG}
                  docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}

                  docker tag ${BACKEND_IMAGE}:${IMAGE_TAG} ${BACKEND_IMAGE}:latest
                  docker tag ${FRONTEND_IMAGE}:${IMAGE_TAG} ${FRONTEND_IMAGE}:latest

                  docker push ${BACKEND_IMAGE}:latest
                  docker push ${FRONTEND_IMAGE}:latest
                '''
            }
        }

/* =========================
   UPDATE HELM VALUES (GITOPS CD)
========================= */
stage('Update Helm Values (GitOps)') {
    steps {
        sh '''
          echo "Updating Helm values with new image tag..."

          sed -i "s/tag:.*/tag: ${IMAGE_TAG}/" helm/backend/values-dev.yaml
          sed -i "s/tag:.*/tag: ${IMAGE_TAG}/" helm/frontend/values-dev.yaml

          git config user.email "jenkins@ci.local"
          git config user.name "jenkins-ci"

          git add helm/backend/values-dev.yaml helm/frontend/values-dev.yaml
          git commit -m "chore(cd): deploy image ${IMAGE_TAG} to dev"

          git push origin develop
        '''
    }
}

    }

    /* =========================
       POST
    ========================= */
    post {
        always {
            echo "Pipeline finished"
        }
        success {
            echo "Deployment Successful 🚀"
        }
        failure {
            echo "Pipeline Failed ❌"
        }
    }
}
