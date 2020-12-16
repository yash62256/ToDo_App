# todos-app-backend-api

Designed and Implemented a todo application(Backend APIs Only).
which support: 
1. The user is able to create/read/update/delete/set deadline for todos.
2. The user is able to search an existing todo by title/date/priority/state/deadline range.
3. The user is able to prioritize the todos.

Languages/Frameworks used: NodeJS, Postgresql.
Testing done on POSTMAN.



#Assumptions:

1. Priority of the todo item will be assigned by user.
2. Larger the integer, higher the priority.
3. By default priority will be 1.
4. Items can have same priority.
5. By default deadline will be 1 month+ date of creation of todo item.
6. Title of the todo item must be unique.
7. Port number used is 5500.



For Database Schema and Different route's description visit the link given below:

https://docs.google.com/document/d/1Jg7sM_hPTzoEaeL3cAXI4r9xYMaH8T1q-7lNqMymZ2s/edit?usp=sharing


Steps to run application:

1. Make sure you have Postgresql installed on your system.
2. Create a user, it's password and database, and enter them in files:

    i.  server.js and   
    ii. toDOItem.js (in models folder)
       (See comments)
3. Open terminal and Change directory to server.js's file's directory.
4. Uncomment 'line 54' from 'toDoItem.js' file (models folder), if running the application first time on your system.  
5. Type 'node server.js' and enter 
6. Comment back line 54 from 'toDOItem.js' file from models folder.
    (Otherwise it will replace the old table with a new one and all your data will get destroy)
7. Use Postman to test the application using 'localhost:5500/' and see file app.js
