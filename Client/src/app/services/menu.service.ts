import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { folderI } from '../interfaces/folder';
import { ResLogin, urlServices, User, UserLogin } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  
  userURL:string = `${urlServices}user`;
  folderURL:string = `${urlServices}folder`
  itemURL:string = `${urlServices}item`

  user:User = {
    idUser:0,
    userName:''
  };
  token:string = '';

  constructor(private httpClient: HttpClient) { }

  getAll(){
    const token: any = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('token', token).set('Content-Type','application/json');
    return this.httpClient.get(this.folderURL,{headers});
  }

  getAllItems(key$:number){
    const token: any = localStorage.getItem('token');
    console.log('GETALLTIEM');
    let headers = new HttpHeaders();
    headers = headers.set('token', token).set('Content-Type','application/json');
    return this.httpClient.get(this.folderURL+`/${key$}/item`,{headers});
  }

  deleteItem(key$:number){
    const token: any = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('token', token).set('Content-Type','application/json');
    return this.httpClient.delete(this.itemURL+`/${key$}`,{headers});
  }

  deleteFolder(key$:number){
    const token: any = localStorage.getItem('token');
    console.log('DEl KEY: ', key$);
    let headers = new HttpHeaders();
    headers = headers.set('token', token).set('Content-Type','application/json');
    return this.httpClient.delete(this.folderURL+`/${key$}`,{headers});
  }

  newFolder(folder:any){
    const token: any = localStorage.getItem('token');
    const body: folderI = {
      name:folder.name,
      idUser: folder.idUser
    }
    let headers = new HttpHeaders();
    headers = headers.set('token', token).set('Content-Type','application/json');
    return this.httpClient.post(this.folderURL,body,{headers});
  }

  getFolder(key$:number){
    const token: any = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('token', token).set('Content-Type','application/json');
    return this.httpClient.get(this.folderURL+`/${key$}`,{headers});
  }

  editItemCheck(key$:number,newItem:any){
    const token: any = localStorage.getItem('token');
    let headers = new HttpHeaders();
    const body = newItem;
    console.log('body edit item',body);
    headers = headers.set('token', token).set('Content-Type','application/json');
    return this.httpClient.put(this.itemURL+`/${key$}`,body,{headers});
  }

  editFolder(key$:number,newFolder:any){
    const token: any = localStorage.getItem('token');
    let headers = new HttpHeaders();
    const body = newFolder;
    console.log('body edit folder',body);
    headers = headers.set('token', token).set('Content-Type','application/json');
    return this.httpClient.put(this.folderURL+`/${key$}`,body,{headers});
  }


  async saveToken(token:string, id:number, user:User){
    this.token=token;
    console.log('save token',token);
    localStorage.setItem('token',token);
    localStorage.setItem('id',id.toString());
    localStorage.setItem('usuario',JSON.stringify(user));
    await this.verifyToken(id);
  }

  loadToken(){
    const result = localStorage.getItem('token') || null;
    if(result){
      this.token = result;
    }else{
      this.token = '';
    }
    
  };

  verifyToken(id:number):Promise<boolean>{
    this.loadToken();
    if(this.token=''){
      return Promise.resolve(false);
    }
    return new Promise<boolean>(resolve=>{
      const url = this.userURL
      const token:string = this.token
      let headers = new HttpHeaders();
      console.log('antes: ');
      headers = headers.set('token', token).set('Content-Type','application/json');
       this.httpClient.get(url+`/${id}`,{headers}).subscribe((data: any)=>{
         console.log('DADATA: ',data);
        if(data['ok']){
          this.user = data['user'];
          resolve(true);
        }else{
          resolve(false);
        }
      })
    })
  };

  clearStorage(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
  }

  login(user:UserLogin){
    const url = this.userURL+"/login";
    let headers = new HttpHeaders();
    headers = headers.set('token', this.token).set('Content-Type','application/json')
    return new Promise<boolean>(resolve=>{
      console.log('DENTRO PROMISE',user);
      this.httpClient.post(url,user,{headers}).subscribe(async (res:any)=>{
        console.log("respuesta del login:", res);
        console.log("respuesta del ok:", res.ok);
        if(res.ok){
          console.log("Dentro del if: ")
          await this.saveToken(res.token,res.id,res.user);
          this.user= res.user;
          resolve(true)
        }else{
          this.token='';
          this.clearStorage();
          resolve(false)
        }
      })
    })
  
  };

  
}
