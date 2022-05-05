import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { ProfileService } from '../profile.service';
@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})
export class UpdateContactComponent implements OnInit {

  _id!:number;
  phone:number | undefined;
  userId!: number;
  message = "Contact Added";
  constructor(private router: Router, private activatedRouter : ActivatedRoute, private profileService: ProfileService) { }

  ngOnInit() {
    this.activatedRouter.parent?.params.subscribe({
      next: (params:Params) => {
        this.profileService.getProfile(params['id']).subscribe({
          next: (data) => {
            this.userId = data._id;
            this._id = data.contacts._id
          }
        })
      }
    })

  }
  updateContact(contactForm:any) {
    this.profileService.updateContact(this.userId,contactForm._id,contactForm.phone,contactForm)
    .subscribe((response : any) => {
      alert("updated contact")
      console.log(contactForm)
      console.log(this.userId)
    });//id:any,contactId:number,num:any,data:any
  }

}
