export interface ItemInterface{
    idItem?: number,
    text?: string,
    itemCompleted?: boolean,
    itemName?: string,
    idFolder?: number
}

export interface FolderInterface{
    idFolder?: number,
    name?: string,
    folderCompleted?: boolean,
    idUser?: number
}

export interface UserInterface{
    idUser?: number,
    userName?: string,
    hash?: string,
    salt?: string
}

export interface EncryptionInterface{
    hash:string,
    salt:string,
}
