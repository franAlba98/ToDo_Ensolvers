import { Component, Input, OnInit } from '@angular/core';
import { ItemListService } from 'src/app/services/item-list.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @Input() idItem: number = 0;
  lista: any[] = [];
  constructor(private folderService: ItemListService) { }

  ngOnInit(): void {
    this.folderService.getAll().subscribe((data: any) => {
      this.lista = data['data'];
      console.log(data['data']);
    })
  }

}
