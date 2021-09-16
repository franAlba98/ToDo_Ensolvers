import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from 'src/app/services/item.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  formItem: FormGroup;
  idItem: number = -1;
  idFolder: number = 0;
  itemName: string = '';
  newItemFlag: boolean = false;
  @Output() newItemEvent = new EventEmitter<number>();

  constructor(private menuService: MenuService,private itemService: ItemService,public activeModal: NgbActiveModal) {
    this.formItem = new FormGroup({
      'idItem': new FormControl(),
      'text': new FormControl(''),
      'itemCompleted': new FormControl(false),
      'itemName': new FormControl(''),
      'idFolder': new FormControl()
    });
  }

  ngOnInit(): void {
    if(this.idItem==0){
      this.formItem.value.idFolder=this.idFolder;
      this.formItem.value.itemName=this.itemName;
      this.newItemFlag=true;
      console.log('ngInit NEW ITEM: ',this.formItem.value);
    }else{
      this.itemService.getItem(this.idItem).subscribe((data: any) => {
        this.formItem.patchValue(data['data']);
        console.log('ngInit EDIT ITEM: ',this.formItem);
      });
    }
  }

  passBack() {this.activeModal.close(this.formItem.value.idFolder);}

  changeValues() {
    if(this.newItemFlag){
      this.formItem.value.idFolder=this.idFolder;
      this.formItem.value.itemName=this.itemName;
      this.itemService.newItem(this.formItem.value).subscribe((data: any) => {
        this.newItemFlag=false;
        this.passBack();
      });
    }else{
      this.itemService.editItem(this.idItem,this.formItem.value).subscribe((data: any) => {
        console.log(data);
        this.passBack();
      });
    }
    
  }
  
}
