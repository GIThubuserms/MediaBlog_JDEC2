@Library('FirstLib')_
pipeline{
    agent {label "Agent_1"}
    
    environment  {
        DB_NAME= credentials('DB_NAME')
        REF_TOKEN= credentials('REF_TOKEN')
        MONGO_DB_URL= credentials('MONGO_DB_URL')
        EMAIL= credentials('EMAIL')
        PASS= credentials('PASS')
    }
    
    stages{
        stage('clone'){
            steps {
                echo "Cloning Start"
                clone("https://github.com/GIThubuserms/MediaBlog_JDEC2.git","master")
                echo "Cloning End"
            }
        }
        stage('creating_env'){
           steps {
        echo "Env Creation Start"
        sh """
          cat <<EOF > Backend/.env
DB_NAME='$DB_NAME'
REF_TOKEN='$REF_TOKEN'
MONGO_DB_URL='$MONGO_DB_URL'
EMAIL='$EMAIL'
PASS='$PASS'
EOF
        """
        echo "Env Creation End"
      }
        }
        stage('docker-compose-build'){
            steps{
              sh 'docker-compose up -d'
            }
        }
        stage("deploy") {
      steps {
        echo "Deploying"
        withCredentials([usernamePassword(
          credentialsId: "DockerHubCred",
          passwordVariable: "DockerHubpass",
          usernameVariable: "DockerHubuser"
        )]) {
          sh "docker login -u $DockerHubuser -p $DockerHubpass"
          sh "docker image tag mediablog_frontend:latest murtaza0318/mediablogfrontend:latest"
          sh "docker image tag mediablog_backend:latest murtaza0318/mediablogbackend:latest"
          sh "docker push murtaza0318/mediablogfrontend:latest"
          sh "docker push murtaza0318/mediablogbackend:latest"
          echo "Deployed"
        }
      }
    }
    }
    
}
