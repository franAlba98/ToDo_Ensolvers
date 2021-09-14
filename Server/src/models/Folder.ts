import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/database";
import { FolderInterface } from "../interfaces/interfaces";
import Item from "./Item";

interface FolderCreationAttributes extends Optional<FolderInterface, "idFolder">{};

export default class Folder extends Model<FolderInterface,FolderCreationAttributes> implements FolderInterface{
    public idFolder!: number;
    public name!: string;
    public folderCompleted!: boolean;
};

Folder.init({
    idFolder: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    folderCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Folder',
    timestamps: false,
    freezeTableName: true,
});
//Cardinality with Item
Folder.hasMany(Item,{foreignKey: 'idFolder', sourceKey: 'idFolder'});
Item.belongsTo(Folder,{foreignKey: 'idFolder'});