import { Request, Response } from 'express';
import Folder from "../models/Folder";
import Item from '../models/Item';

export default class FolderController {
    constructor() { }
    //Create an Parametros
    new = async (req: Request, res: Response) => {
        const { name } = req.body;
        try {
            const newFolder = await Folder.create({
                name,
                folderCompleted: false
            });
            if (newFolder) {
                return res.json({
                    message: 'The Folder has been created',
                    data: newFolder
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
            const folders = await Folder.findAll();
            return res.json({
                data: folders
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };

    getOne = async (req: Request, res: Response) => {
        const { idFolder } = req.params;
        try {
            const folder = await Folder.findOne({
                where: { idFolder }
            });
            if(folder){
                return res.json({
                    data: folder
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
        const { idFolder } = req.params;
        const { name, folderCompleted } = req.body;
        try {
            await Folder.update({
                name,
                folderCompleted
            }, {
                where: {
                    idFolder
                },
            });
            const folder = await Folder.findOne({
                where: {
                    idFolder
                }
            });
            return res.json({
                message: 'The Folder has been changed',
                data: folder
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
            const { idFolder } = req.params;
            const itemDeleteRowCount = await Item.destroy({
                where: {
                    idFolder:idFolder
                }
            })
            const folderDeleteRowCount = await Folder.destroy({
                where: {
                    idFolder
                }
            });
            return res.json({
                message: 'The Folder has been deleted',
                itemCount: itemDeleteRowCount,
                folderCount: folderDeleteRowCount
            });

        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };

}