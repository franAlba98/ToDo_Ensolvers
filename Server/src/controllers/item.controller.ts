import { Request, Response } from 'express';
import Item from "../models/Item";

export default class ParametrosController {
    constructor() { }
    //Create an Parametros
    new = async (req: Request, res: Response) => {
        const { text, itemName, idFolder } = req.body;
        try {
            const newItem = await Item.create({
                text,
                itemCompleted: false,
                itemName: itemName,
                idFolder: idFolder
            });
            if (newItem) {
                return res.json({
                    message: 'The Item has been created',
                    data: newItem
                });
            };
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };

    getAll = async (req: Request, res: Response) => {
        try {
            const items = await Item.findAll();
            return res.json({
                data: items
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };

    getOne = async (req: Request, res: Response) => {
        const { idItem } = req.params;
        try {
            const item = await Item.findOne({
                where: { idItem }
            });
            if (item) {
                return res.json({
                    data: item
                });
            };

        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };

    change = async (req: Request, res: Response) => {
        const { idItem } = req.params;
        const { text, itemCompleted } = req.body;
        try {
            await Item.update({
                text,
                itemCompleted
            }, {
                where: {
                    idItem
                },
            });
            const item = await Item.findOne({
                where: {
                    idItem
                }
            });
            return res.json({
                message: 'The item has been changed',
                data: item
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const { idItem } = req.params;
            const deleteRowCount = await Item.destroy({
                where: {
                    idItem
                }
            });
            return res.json({
                message: 'The Item has been deleted',
                count: deleteRowCount
            });

        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };

}