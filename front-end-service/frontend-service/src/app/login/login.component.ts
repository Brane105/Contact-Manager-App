import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _builder:FormBuilder,private _service: ProfileService,private _router : Router) { }
  loginForm : FormGroup = this._builder.group({
    _id : ['',Validators.required], password : ['',Validators.required]
  })
  errorMessage : string | undefined = undefined

  ngOnInit(): void {
  }
  handleSubmit(){
    let id = this.loginForm.controls['_id'].value;
    let password = this.loginForm.controls['password'].value;
    this._service.login(id,password).subscribe({
      next:(data)=>{
        this._router.navigate(['success',data._id])
      },
      error:(err)=>{
        this.errorMessage = err.error.messsage
        alert("The User Id Doesnt Exist")
        this.loginForm.reset()
      }
    })
  }
  
}
