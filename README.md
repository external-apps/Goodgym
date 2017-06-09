# Goodgym

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

April 2017 - Prototype app consuming Yoti

An app for Goodgym which enables their trainers to create and share challenges with their runners. The runners are signed in on the runs with use of Yoti.

## Setup

1. Clone the repository by copy-pasting the following command into your terminal:

  ```
  git clone https://github.com/external-apps/Goodgym.git && cd Goodgym
  ```  
2. Install the required dependencies:

  ```
  npm install
  ```   

3. Build CSS:

  ```
  npm run watchCss
  ```

4. View website

   Run the server:
   ```
   npm run devStart
   ```
   Navigate to:
   ```
   http://localhost:3000
   ```  
5. Run tests

   ```
   npm test
   ```

## Tech Stack

### Languages:
Javascript  
Node  
Sass (node-sass)

### Framework:
Express

### Database:
MongoDB  
Database hosted on [MLab](https://mlab.com)

### Templating:
Handlebars (express-handlebars)

### Testing:
Chai  
Mocha  
Supertest

### Linting:
ESLint (js-standard-style)

### Dependencies:
body-parser  
cookie-parser  
env2  
express  
express-handlebars  
express-session  
mongoose  
nodemailer  
passport  
passport-local  
request  
yoti-node-sdk

### Environment variables:
NODE_ENV  
DB_USER  
DB_PASS  
DB_DATABASE  
APP_ID  
SCENARIO_ID  
CLIENT_SDK_ID  
API_KEY  
NM_USER  
NM_PASS  
SESSION_SECRET  
SECURITY_PEM  
