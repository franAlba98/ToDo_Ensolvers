import { Component, OnInit } from '@angular/core';
import { FolderListService } from 'src/app/services/folder-list.service';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.css']
})
export class FolderListComponent implements OnInit {

  lista:any[]=[];
  folder: any;
  constructor(private folderService: FolderListService) { }

  ngOnInit(): void {
    this.folderService.getAll().subscribe((data:any)=>{
      this.lista=data['data'];
      this.folder=data['data'];
      console.log(this.folder[0].folderCompleted);
    })
  }

}
