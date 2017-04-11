#!groovy

node('docker-concurrent') {
    checkout scm

    stage 'parameters'
    sh 'git rev-parse --short HEAD | tee version'
    env.VERSION = 'commit_' + readFile('version').trim()

    stage name: 'Build'
    docker.image('node:7.0').inside("-u 0:0") {
        sh 'npm install'
        sh 'npm run build'
    }
    
    if (env.BRANCH_NAME == "master") {
        stage name: 'Publish to S3'
        sh "aws --region eu-west-1 s3 sync --acl=public-read \"\$PWD\"/build/ s3://dev-apac.bambora.com/"
    } else if (env.BRANCH_NAME == "develop"){
        stage name: 'Publish to S3'
        sh "aws --region eu-west-1 s3 sync --acl=public-read \"\$PWD\"/dist/ s3://bambora-dev-apac-portal-test-eu-west-1/"
    }
}
