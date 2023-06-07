# Twitch like chat

For this project, i wanted to use some clean architecture principles to abstract away all the business logic in the `src/domains` folder. All this logic will not be aware of the front end framework we will use which will be stored in the `src/infrastructure` folder.

Steps : 

1. project setup : set global architecture of the project
2. create interfaces and use-cases for the socket, user and message in `src/domains`
3. create MessageFeed and TextArea components
4. create react context to abstract sending and receiving messages and pass the logic to both MessageFeed and TextArea
5. Add styling to the project with tailwind css


### Project setup:  

```shell
  yarn install
  // or
  npm install
```