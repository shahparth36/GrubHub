# GrubHub

## Project Link

This project is live on https://grubhub.herokuapp.com

## Local Setup

* Clone Project

```
  git clone https://github.com/shahparth36/GrubHub.git
```

* Install Common Dependencies

```
  cd /GrubHub && npm i
```

* Server Setup

  * Install Dependencies
    ```
      cd /GrubHub/server/ && npm i
    ```
    
  * Create .env file
    ```
       touch .env
    ```
      Paste these lines into .env file and insert values
    ```
      PORT = 5000

      ACCESS_TOKEN_SECRET='{"type": "", "key": "", "expiresInMinutes: ""}'
      REFRESH_TOKEN_SECRET='{"type": "", "key": "", "expiresInMinutes: ""}'

      MONGODB_URL = ''
    ```
* Client Setup

  * Install Dependencies
    ```
      cd /GrubHub/client/ && npm i
    ```
* Run Project

  In the root folder enter the command
  ```
    npm run dev
  ```

Yay! You can visit your local project on http://localhost:3000
