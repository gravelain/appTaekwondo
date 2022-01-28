import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  security = 0;
  name!:any;
  
  constructor(private router : Router,
              private http : HttpClient) { }

  ngOnInit(): void {

    
    this.http.get('http://localhost:8000/api/user/', {withCredentials: true}).subscribe(
      (res : any)=>{
        this.security=1;
        this.name = res.name;
      },
      err => {
        this.security=0;
        alert('Acces Denied');
        this.router.navigate(['/login']);
      }
    );

  }

 




}
