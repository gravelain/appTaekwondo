import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router:Router, private http : HttpClient) { }

  ngOnInit(): void {
  }

  logout(){
    this.http.post('http://localhost:8000/api/logout/', {}, {withCredentials: true}).subscribe(
      ()=>{
        alert('Logout successfully');
        this.router.navigate(['/login']);
      },
      err =>{
        alert('problème subscriber');
      }
    )
  }
}
