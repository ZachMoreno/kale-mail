# :seedling: kale-mail
SendGrid API server built atop Node & Express

## Setup

 1. create a sendgrid account
 2. generate & copy a new API key
 3. paste your API key within `config.js`

## Installation

    git clone git@github.com:ZachMoreno/kale-mail.git
    cd kale-mail
    npm install

## Start & Stop

    npm run start
    CTRL + C

## Email

### POST /api/v1/email

#### Request

 - req.body.to
 - req.body.from
 - req.body.subject
 - req.body.content

 #### Response

 feedback object
