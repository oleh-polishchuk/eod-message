# eod-message
App to generate &amp; send EOD (end-of-the-day) message into Slack

## NPM

To login into NPM registry: 

    npm login
    
To publish new version:

    npm version patch
    npm publish

## Google Cloud

To login in gcloud

    gcloud auth login
    
To change current project

    gcloud config set project eod-slack-message
    
To deploy project

    gcloud app deploy app.yaml -q

