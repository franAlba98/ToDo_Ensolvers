export interface ItemInterface{
    idItem: number,
    text: string,
    itemCompleted: boolean,
    idFolder: number
}

export interface FolderInterface{
    idFolder: number,
    name: string,
    folderCompleted: boolean
}
