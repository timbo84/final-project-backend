import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { User } from "./user";

export class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>>{
    declare messageId: number;
    declare message: string;
    declare userId: number;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

export function MessageFactory(sequelize: Sequelize) {
    Message.init({
        messageId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
       userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
       },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    }, {
        freezeTableName: true,
        tableName: 'messages',
        sequelize
    });
    
}
export function AssociateUserMessage() {
    User.hasMany(Message, { foreignKey: 'userId' });
    Message.belongsTo(User, { foreignKey: 'userId' });
}