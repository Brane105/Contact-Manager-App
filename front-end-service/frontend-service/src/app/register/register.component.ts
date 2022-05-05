import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service:ProfileService,private _builder:FormBuilder,private _router : Router) { }

  profileForm : FormGroup = this._builder.group({
    _id : ['',Validators.required],
    name :['',Validators.required],
    dob :['',Validators.required],
    phone : ['',Validators.required],
    password :['',Validators.required]
  })
  errorMessage : any | undefined = undefined
  ngOnInit(): void {
  }
  handleSubmit(){
    this.service.storeProfile(this.profileForm.value).subscribe({
      next:(data) =>{
        alert(data.insertedId+"Stored Successfully")
        this._router.navigate(["login"])
       },
      error:(err) => {
        this.errorMessage = err.error.messsage
        this.profileForm.reset()
      }
    })
  }

}
