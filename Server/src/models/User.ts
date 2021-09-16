import {DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/database';
import {UserInterface} from '../interfaces/interfaces'
//El creation Attributes es primordia para que ande el .create en los controladores
interface UserCreationAttributes extends Optional<UserInterface, "idUser">{};
export default class User extends Model<UserInterface,UserCreationAttributes> implements UserInterface{
    public idUser!: number;
    public userName!: string;
    public hash!: string;
    public salt!: string;
};

User.init({
    idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'User',
    timestamps: false,
    freezeTableName: true,
});

module.exports = User;