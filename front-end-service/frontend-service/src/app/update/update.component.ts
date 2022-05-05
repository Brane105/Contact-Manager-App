import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute,Params, Router} from '@angular/router';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private _service:ProfileService,private activatedRouter:ActivatedRoute,private _router:Router) { }
  data:any | undefined=undefined
  users:any | undefined=undefined
  userId!:number
  errorMessage: any
  num=new FormControl('');
  pass = new FormControl('');
  dob = new FormControl('');
  ngOnInit(): void {
    this.activatedRouter.parent?.params.subscribe({
      next: (params:Params) => {
        this._service.getProfile(params['id']).subscribe({
          next: (data) => {
            this.userId = data._id;
          }
        })
      }
    })
  }
  handleUpdate(){
    let phone=this.num.value;
    let password = this.pass.value;
    let dob = this.dob.value
    this._service.updateProfile(this.userId,phone,this.data).subscribe((data)=>{
      this.users=data
    })
    this._service.updateDate(this.userId,dob).subscribe((data)=>{
      this.users=data
    })
    this._service.updatePassword(this.userId,password).subscribe((data)=>{
      this.users=data
      this._router.navigate(["/login"])
    })
    alert("Successfully Updated")
}
  
}
