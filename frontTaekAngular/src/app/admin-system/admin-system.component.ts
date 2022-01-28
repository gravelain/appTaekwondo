import { SecuService } from './../services/secu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-system',
  templateUrl: './admin-system.component.html',
  styleUrls: ['./admin-system.component.css']
})
export class AdminSystemComponent implements OnInit {

  security=0
  
  constructor(private secu:SecuService) { }

  ngOnInit(): void {
   
    this.security=this.secu.getPresenceUser();

  }



}
