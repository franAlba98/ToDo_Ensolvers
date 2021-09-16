import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlServices } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemURL:string = `${urlServices}item`
  constructor(private httpClient: HttpClient) { }

  getItem(key$:number){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    return this.httpClient.get(this.itemURL+`/${key$}`,{headers});
  }

  editItem(key$:number,newItem:any){
    let headers = new HttpHeaders();
    const body = newItem;
    headers = headers.set('Content-Type','application/json');
    return this.httpClient.put(this.itemURL+`/${key$}`,body,{headers});
  }

  newItem(newItem:any){
    let headers = new HttpHeaders();
    const body = newItem;
    console.log('newItem: ', body);
    headers = headers.set('Content-Type','application/json');
    return this.httpClient.post(this.itemURL,body,{headers});
  }
}
