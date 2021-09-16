import crypto from 'crypto';
import { EncryptionInterface } from '../interfaces/interfaces';

export function encryptPassword(password: string):Promise<EncryptionInterface>{
    let promise = new Promise<EncryptionInterface>((resolve, reject) => {
        const salt: string = crypto.randomBytes(128).toString("base64");
        crypto.pbkdf2(password, salt, 100, 64, 'sha512', async (err, derivedKey) => {
            const encryption: EncryptionInterface = {
                hash: derivedKey.toString('hex'),
                salt,
            }
            resolve(encryption);
            if (err) {
                reject(err)
            };
        });
    });
    return promise;
};

export function verifyPassword(password:string, salt:string):Promise<string>{
    let promise = new Promise<string>((resolve, reject)=>{
        crypto.pbkdf2(password, salt, 100, 64, 'sha512', (err, derivedKey) => {
            const newHash:string = derivedKey.toString('hex');
            resolve(newHash);
            if (err){
                reject(err);
            };
        });
    });
    return promise;
}