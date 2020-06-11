import "reflect-metadata";
import {createConnection} from "typeorm";

createConnection().then(async connection => {
    console.log(connection);
    connection.close();
}).catch(error => console.log(error));
