import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { folderI } from 'src/app/interfaces/folder';
import { User, UserLogin } from 'src/app/interfaces/interfaces';
import { itemI } from 'src/app/interfaces/item';
import { ItemService } from 'src/app/services/item.service';
import { MenuService } from 'src/app/services/menu.service';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  modalState: boolean = false;
  formFolder: FormGroup;
  show: boolean = true;
  showFolders: boolean = false;
  showItems: boolean = false;
  showSingleItem: boolean = false;
  currentUser: number = 1;
  currentFolder: number = 0;
  currentItem: number = 0;
  listFolder: any[] = [];
  listItems: any[] = [];
  currentItemObject: itemI = {
    idItem: 0,
    text: '',
    itemCompleted: false,
    itemName: '',
    idFolder: 0
  };
  currentFolderObject: folderI = {
    idFolder: 0,
    name: '',
    folderCompleted: false,
    idUser: 0
  };
  showPop: boolean = false;

  formUser:FormGroup;

  constructor(private menuService: MenuService, private itemService: ItemService, private modalService: NgbModal, private route: ActivatedRoute) {
    
    this.formUser = new FormGroup({
      'userName': new FormControl(''),
      'password': new FormControl(''),
    });
  
    
    this.formFolder = new FormGroup({
      'idFolder': new FormControl(),
      'name': new FormControl(''),
      'folderCompleted': new FormControl(false),
      'idUser': new FormControl(),
      'itemName': new FormControl()
    });
  }

  ngOnInit(): void {
    

  }



  toggle() {
    this.show = !this.show;
  }

  toggleCheckFolder(idFolder: number) {
    this.editFolder(idFolder);
  }

  toggleCheckItem(idItem: number) {
    this.editItemCheck(idItem);
  }

  folders() {
    this.menuService.getAll().subscribe((data: any) => {
      this.listFolder = data['data'];
      this.showFolders = true;
      console.log(this.listFolder = data['data']);
    });

  }

  items(folder: any) {
    console.log('ID CURRENT FOLDER ', folder);
    this.currentFolder = folder;
    this.menuService.getAllItems(folder).subscribe((data2: any) => {
      this.listItems = data2['data'];
      this.showItems = true;
      console.log(this.listItems = data2['data']);
    });
  }

  editItem(item: number) {
    console.log('ID CURRENT ITEM ', item);
    this.currentItem = item;
    this.itemService.getItem(item).subscribe((data: any) => {
      this.showSingleItem = true;
      this.currentItemObject = data['data'];
      this.openModal();
      console.log('DATA EDIT', data['data']);
    });
  }

  editItemCheck(item: number) {
    this.itemService.getItem(item).subscribe((data: any) => {
      this.currentItemObject = data['data'];
      this.currentItemObject.itemCompleted = !this.currentItemObject.itemCompleted;
      this.menuService.editItemCheck(item, this.currentItemObject).subscribe((data: any) => {
        this.currentItemObject = data['data'];
      });
    });
  }

  editFolder(folder: number) {
    console.log('ID CURRENT FOLDER ', folder);
    this.menuService.getFolder(folder).subscribe((data: any) => {
      this.currentFolderObject = data['data'];
      this.currentFolderObject.folderCompleted = !this.currentFolderObject.folderCompleted;
      this.menuService.editFolder(folder, this.currentFolderObject).subscribe((data: any) => {
        this.currentFolderObject = data['data'];
      });
    });
  }

  newItem() {
    if (this.formFolder.value.itemName != '') {
      this.currentItemObject.idFolder = this.currentFolder;
      this.currentItemObject.idItem = 0;
      this.currentItemObject.itemName = this.formFolder.value.itemName;
      this.openModal();
    }
  }

  deleteItem(item: number) {
    this.menuService.deleteItem(item).subscribe((data: any) => {
      console.log('DATA DELETE', data['data']);
    });
    this.items(this.currentFolder);
  }

  newFolder() {
    if (this.formFolder.value.name != '') {
      this.formFolder.value.idUser = this.currentUser;
      this.menuService.newFolder(this.formFolder.value).subscribe((data: any) => {
        console.log('DATA NEW FOLDER', data['data']);
        this.folders();
      });
    }
  }

  deleteFolder(folder: number) {
    this.menuService.deleteFolder(folder).subscribe((data: any) => {
      this.folders();
    });

  }

  openModal() {
    const activeModal = this.modalService.open(ItemComponent);
    console.log('activeModal currentItemObject', this.currentItemObject);
    activeModal.componentInstance.idItem = this.currentItemObject.idItem;
    activeModal.componentInstance.itemName = this.currentItemObject.itemName;
    activeModal.componentInstance.idFolder = this.currentItemObject.idFolder;

    activeModal.result.then((result) => {
      if (result) {
        this.menuService.getAllItems(this.currentItemObject.idFolder).subscribe((data2: any) => {
          this.listItems = data2['data'];
          this.showItems = true;
          console.log(this.listItems = data2['data']);
        });
        console.log('RESULTADOO T: ', result);
      }
    });
    activeModal.result.catch((result) => {
      if (result) {
        this.items(this.currentFolder);
        console.log('RESULTADOO C: ', result);
      }
    });

  }


  login(form:FormGroup){
    console.log('DENTRO LOGIN');
    if(form.invalid){
      console.log('DENTRO INVALID');
      return;
    };
    console.log('form.value: ',form.value);
    if(form.value.userName && form.value.password){
      console.log('form.value: ',form.value);
      const user:UserLogin={
        userName:form.value.userName,
        password:form.value.password
      };
      this.menuService.login(user).then(ok=>{
        if(ok){
          console.log('SUCCESS');
          this.toggle();
        }else{
          console.log('SUCCESSN '+'`T');
        }
      })
    };
  
  }

  logout(){
    this.menuService.clearStorage();
    this.toggle();
  }




}
