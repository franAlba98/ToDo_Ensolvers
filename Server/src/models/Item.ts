import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/database";
import { ItemInterface } from "../interfaces/interfaces";

interface ItemCreationAttributes extends Optional<ItemInterface, "idItem"> { };

export default class Item extends Model<ItemInterface, ItemCreationAttributes> implements ItemInterface {
    public idItem!: number;
    public text!: string;
    public itemCompleted!: boolean;
    public idFolder!: number;
};

Item.init({
    idItem: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    itemCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    idFolder: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Item',
    timestamps: false,
    freezeTableName: true,
});