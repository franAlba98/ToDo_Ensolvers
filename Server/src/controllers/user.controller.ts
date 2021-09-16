import { Request, Response } from 'express';
import User from "../models/User";
import { encryptPassword, verifyPassword } from '../services/crypto.services';
import { createToken } from '../services/jwt.services';

export default class UserController {
    constructor () { }
    
    new = async (req: Request, res: Response) => {
        const { userName, legajo, password, email } = req.body;
        try {
            const user = await User.findOne({
                where: {
                    userName
                }
            });
            if (!user) {
                encryptPassword(password).then(async (encryption: { salt: string; hash: string; }) => {
                    const salt = encryption.salt
                    const hash = encryption.hash
                    await User.create({
                        userName,
                        salt,
                        hash
                    }).then(user => {
                        const token = createToken(user);
                        if (token) {
                            res.set('token', [token]);
                            res.json({
                                user,
                                err: false
                            });
                        };
                    });
                }).catch(err => {
                    console.error(err)
                    res.json({
                        error: err,
                        err: true
                    });
                });
            } else {
                res.json({
                    message: "User already exist",
                    err: true
                });
            };
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };

    login = async (req: Request, res: Response) => {
        const {userName, password} = req.body;
        let loginRes = {
            id: 0,
            ok: false,
            token: "",
            user: {}
        }
        try {
                console.log(userName);
                const newUsuario = await User.findOne({
                    where: {
                        userName
                    }
                });
                if (!newUsuario) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'Wrong (user) or password'
                        }
                    });
                }
                else {
                    console.log(newUsuario);
                    verifyPassword(password, newUsuario.salt).then(newHash => {
                        if (newHash == newUsuario.hash) {
                            const token = createToken(newUsuario);
                            if (token) {
                                res.set("token", [token]);
                                let simpleUser = {
                                    idUser: 0,
                                    userName: ""

                                }
                                simpleUser.idUser = newUsuario.idUser;
                                simpleUser.userName = newUsuario.userName;
                                loginRes.id = newUsuario.idUser;
                                loginRes.ok = true;
                                loginRes.token = token;
                                loginRes.user = simpleUser;
                                return res.json({
                                    "ok": loginRes.ok,
                                    "id": loginRes.id,
                                    "token": loginRes.token,
                                    "user": loginRes.user
                                })
                            }
                        } else {
                            return res.send({
                                ok: false,
                                err: {
                                    message: 'Wrong user or (password)'
                                }
                            });
                        }
                    }).catch(err => {
                        console.error(err);
                        res.json({
                            error: err,
                            err: true
                        });
                    })
                }

        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    }
}