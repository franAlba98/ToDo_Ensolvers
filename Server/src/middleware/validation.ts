import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

export let verifyToken = (req: Request, res: Response, next: NextFunction) => {

    let token = req.get('token');
    console.log('middle');
    const seed: Secret = 'mySeed';
    if(typeof(token)==='string'){
        console.log('antes de verify');
        jwt.verify(token, seed , (err:any , decoded:any) => {
            if (err) {
                return res.status(401).json({
                    ok: false,
                    err: {
                        message: 'Token not valid'
                    }
                });
            } else {
                console.log(decoded)
                res.set("user", decoded.usuario);
                next();
            }
        });
    
    }
};