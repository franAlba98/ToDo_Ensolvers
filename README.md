# ToDo_Ensolvers

To do list app for Ensolvers exercise

### Requirements 📋

* [nodeJS v14.17.6](https://nodejs.org/dist/v14.17.6/node-v14.17.6-x64.msi)
* [postgreSQL v12.8-1](https://get.enterprisedb.com/postgresql/postgresql-12.8-1-windows-x64.exe)
Both executables are for Windows-x64

```
npm install -g typescript
```

### Installation 🔧

Run the following commands

```
npm install
```
For deveplopment dependencies

```
npm install -D
```

_Once the libraries are installed, the next step is to set up the database. Please refer to the following README [README-BD.md](https://github.com/rizosAlba/ToDo_Ensolvers/tree/main/Server/src/database/README.md)_

_Lastly the file [index.ts](https://github.com/rizosAlba/ToDo_Ensolvers/tree/main/Server/src/index.ts) in **server.start()** the second argument must be deleted for the server IP to be **localhost** or (if prefered) it's possible to specify the desired port as a string_

## Running the proyect ⚡

_To run the project is necessary to run the following command:_
```
npm start
```
_If the program does not start because the folder /dist is missing then Typescript must compile the src/ folder. To do that just run the following command_
```
tsc
```
_This app uses a login system made with [JWT](https://jwt.io/). To log in the system you must use the following credentials:_
```
username: francisco
password: 12345
```
## Built with 🛠️

* [nodeJS](https://nodejs.org/es/docs/) - JS run enviroment.
* [typeScript](https://www.typescriptlang.org/docs) - JavaScript extension for strong typing.
* [postgreSQL](https://www.postgresql.org/docs/) - DB engine.
* [express](https://expressjs.com/es/starter/installing.html) - The web framework.
* [morgan](https://github.com/expressjs/morgan#readme) - HTTP request logger middleware for node.js.
* [sequelize](https://sequelize.org/master/) - The postgreSQL ORM.


## Developer ✒️

* **Francisco Alba** - [fralba98](https://github.com/rizosAlba)