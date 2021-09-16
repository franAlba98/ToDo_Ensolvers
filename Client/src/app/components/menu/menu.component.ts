import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  show: boolean = true;
  showFolders: boolean = false;
  showItems: boolean = false;
  showSingleItem: boolean = false;
  currentFolder: number = 0;
  currentItem: number = 0;
  listFolder: any[] = [];
  listItems: any[] = [];
  currentItemObject: itemI ={
    idItem:0,
    text:'',
    itemCompleted:false,
    idFolder:0
  };
  showPop: boolean = false;


  constructor(private menuService: MenuService,private itemService: ItemService, private modalService: NgbModal) {

  }

  ngOnInit(): void {

  }



  toggle() {
    this.show = !this.show;
  }

  folders() {
    this.menuService.getAll().subscribe((data: any) => {
      this.listFolder = data['data'];
      this.showFolders = true;
      console.log(this.listFolder = data['data']);
    });

  }

  items(folder: number) {
    console.log('ID CURRENT FOLDER ', folder);
    this.currentFolder = folder;
    this.menuService.getAllItems(folder).subscribe((data: any) => {
      this.listItems = data['data'];
      this.showItems = true;
      console.log(this.listItems = data['data']);
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

  newItem() {
    this.currentItemObject.idFolder=this.currentFolder;
    this.currentItemObject.idItem=0;
    this.openModal();
  }

  openModal() {
    const activeModal = this.modalService.open(ItemComponent);
    console.log('activeModal.componentInstance.idItem',activeModal.componentInstance.idItem);
    activeModal.componentInstance.idItem = this.currentItemObject.idItem;
    activeModal.componentInstance.idFolder = this.currentItemObject.idFolder;
  }




}
