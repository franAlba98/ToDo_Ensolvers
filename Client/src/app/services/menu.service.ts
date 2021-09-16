import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlServices } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  
  folderURL:string = `${urlServices}folder`
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

  
}
