import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  formItem: FormGroup;
  idItem: number = -1;
  idFolder: number = 0;
  newItemFlag: boolean = false;
  message: string = "Hola Mundo!";

  constructor(private itemService: ItemService,public activeModal: NgbActiveModal) {
    this.formItem = new FormGroup({
      'idItem': new FormControl(),
      'text': new FormControl(''),
      'itemCompleted': new FormControl(false),
      'idFolder': new FormControl()
    });
  }

  ngOnInit(): void {
    if(this.idItem==0){
      this.formItem.value.idFolder=this.idFolder;
      this.newItemFlag=true;
      console.log('ngInit NEW ITEM: ',this.formItem.value);
    }else{
      this.itemService.getItem(this.idItem).subscribe((data: any) => {
        this.formItem.patchValue(data['data']);
        console.log('ngInit EDIT ITEM: ',this.formItem);
      });
    }
    
  }

  changeValues() {
    console.log('CHANGE VALUES');
    if(this.newItemFlag){
      console.log('CHANGE VALUES NEW');
      this.formItem.value.idFolder=this.idFolder;
      this.itemService.newItem(this.formItem.value).subscribe((data: any) => {
        console.log(data);
      });
    }else{
      console.log('CHANGE VALUES EDIT');
      this.itemService.editItem(this.idItem,this.formItem.value).subscribe((data: any) => {
        console.log(data);
      });
    }
    
  }
  
}
