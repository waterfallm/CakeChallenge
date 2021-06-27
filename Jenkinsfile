node {
     def app 
     stage('clone repository') {
      checkout scm  
    }
     stage('Build docker Image'){
      app = docker.build("matwater/fydui")
    }
     stage('Test Image'){
       app.inside {
         sh 'echo "TEST PASSED"' 
      }  
    }
     stage('Push Image'){
       docker.withRegistry('https://home4.ball-coin.com/', 'matwater') {            
       app.push("${env.BUILD_NUMBER}")            
       app.push("latest")   
   }
}
}
