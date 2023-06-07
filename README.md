# Twitch like chat

For this project, i wanted to use some clean architecture principles to abstract away all the business logic in the `src/domains` folder. All this logic will not be aware of the front end framework we will use which will be stored in the `src/infrastructure` folder.

Steps : 

1 - project setup : set global architecture of the project
2 - create interfaces and use-cases for the socket, user and message in `src/domains`