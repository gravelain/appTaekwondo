import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SecuService {

  security = 0;
  name!:any;
  

  constructor(private router : Router,
    private http : HttpClient) { }

    ngOnInit(): void {

      this.getPresenceUser();
    
    }
  

  getPresenceUser(){
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

    return this.security;
  }
}
