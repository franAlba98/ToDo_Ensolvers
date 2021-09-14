import { Request, Response } from 'express';
import Item from "../models/Item";

export default class ParametrosController {
    constructor() { }
    //Create an Parametros
    new = async (req: Request, res: Response) => {
        const { idItem, text } = req.body;
        try {
            const newItem = await Item.create({
                idItem,
                text,
                itemCompleted: false,
                idFolder: 1
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
}