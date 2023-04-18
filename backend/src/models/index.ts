import { Sequelize } from "sequelize";
import { MessageFactory, AssociateUserMessage } from "./message";
import { UserFactory } from "./user";

const dbName = 'nuggetdb';
const username = 'root';
const password = 'Password1!';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

UserFactory(sequelize);
MessageFactory(sequelize);
AssociateUserMessage();


export const db = sequelize;