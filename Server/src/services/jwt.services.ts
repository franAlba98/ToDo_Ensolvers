import jwt,{ Secret } from 'jsonwebtoken';
import { UserInterface } from "../interfaces/interfaces";

export function createToken(user: UserInterface) {
    const key: Secret = 'mySeed'
    return jwt.sign({
        user: user
    }, key, { expiresIn: 60 * 60 * 24 * 30 });
};