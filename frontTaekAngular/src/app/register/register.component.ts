import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!:FormGroup;

  constructor(private formBuilder:FormBuilder,
              private htpp:HttpClient,
              private router:Router) { }

  ngOnInit(): void {

    this.form=this.formBuilder.group({
      name:'',
      email:'',
      password:'',
      phone:''

    });
  }

  onSubmit():void{
    //console.log(this.form.getRawValue());
    alert('Saved successfully ! ')
    this.htpp.post('http://localhost:8000/api/register/', this.form.getRawValue())
    .subscribe(() =>this.router.navigate(['/register']))
  }

}
