import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { folderI } from '../interfaces/folder';
import { urlServices } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  
  folderURL:string = `${urlServices}folder`
  itemURL:string = `${urlServices}item`
  constructor(private httpClient: HttpClient) { }

  getAll(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    return this.httpClient.get(this.folderURL,{headers});
  }

  getAllItems(key$:number){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    return this.httpClient.get(this.folderURL+`/${key$}/item`,{headers});
  }

  deleteItem(key$:number){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    return this.httpClient.delete(this.itemURL+`/${key$}`,{headers});
  }

  deleteFolder(key$:number){
    console.log('DEl KEY: ', key$);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    return this.httpClient.delete(this.folderURL+`/${key$}`,{headers});
  }

  newFolder(folder:any){
    const body: folderI = {
      name:folder.name,
      idUser: folder.idUser
    }
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    return this.httpClient.post(this.folderURL,body,{headers});
  }

  getFolder(key$:number){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    return this.httpClient.get(this.folderURL+`/${key$}`,{headers});
  }

  editItemCheck(key$:number,newItem:any){
    let headers = new HttpHeaders();
    const body = newItem;
    console.log('body edit item',body);
    headers = headers.set('Content-Type','application/json');
    return this.httpClient.put(this.itemURL+`/${key$}`,body,{headers});
  }

  editFolder(key$:number,newFolder:any){
    let headers = new HttpHeaders();
    const body = newFolder;
    console.log('body edit folder',body);
    headers = headers.set('Content-Type','application/json');
    return this.httpClient.put(this.folderURL+`/${key$}`,body,{headers});
  }

  
}
