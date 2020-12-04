# prerequisite
* golang > 1.14
* node > 14.5
* mysql > 8.0

start mysql with port 3306.
set mysql's user root's password to root.
create database `appointments` by run `create database appointments;` in mysql client.

# How to run
## Run server
```
cd server
go run main.go
```

## Run client
```
cd client
yarn
yarn start
```

# How to use
Access `http://localhost:3000/admin` in browser, and you will find all patient appointments in a table looks like this.
<img src="https://github.com/wfnuser/interview/blob/master/patient/server.png?raw=true">
Access `http://localhost:3000/` in browser, and you can register a patient appointment.
<img src="https://github.com/wfnuser/interview/blob/master/patient/client.png?raw=true">




