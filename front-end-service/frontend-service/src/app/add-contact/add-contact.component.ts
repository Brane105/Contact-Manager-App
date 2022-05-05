import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';
import { Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  _id:number | undefined;
  name:string | undefined;
  phone:number | undefined;
  userId!: number  ;
  message = "Contact Added";
  constructor(private router: Router, private activatedRouter : ActivatedRoute, private profileService: ProfileService) { }

  ngOnInit() {
    this.activatedRouter.parent?.params.subscribe({
      next: (params:Params) => {
        this.profileService.getProfile(params['id']).subscribe({
          next: (data) => {
            this.userId = data._id;
          }
        })
      }
    })

  }
  addContact(contactForm:any) {
    this.profileService.addContact(contactForm, this.userId)
    .subscribe((response : any) => {
      alert("added contact")
      console.log(contactForm)
      console.log(this.userId)
    });
  }
}
