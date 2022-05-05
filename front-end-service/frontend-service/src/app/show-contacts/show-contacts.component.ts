import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { ActivatedRoute,Params } from '@angular/router';
@Component({
  selector: 'app-show-contacts',
  templateUrl: './show-contacts.component.html',
  styleUrls: ['./show-contacts.component.css']
})
export class ShowContactsComponent implements OnInit {

  @Input()
  contacts : any
  userId!: number  ;
  displayedColumns: string[] = ['userid', 'name', 'phone', 'delete'];
  constructor(private activatedRouter:ActivatedRoute, private profileService:ProfileService ) { }
  ngOnInit() {
    this.activatedRouter.parent?.params.subscribe({
      next: (params:Params) => {
        this.profileService.getProfile(params['id']).subscribe({
          next: (data) => {
            this.userId = data._id;
            this.contacts = data.contacts
          }
        })
      }
    })
  }
  deleteContact(contact:any) { 
   this.profileService.deleteContact(this.userId,contact._id)
   .subscribe((response: any) => {
     this.contacts = undefined
     this.ngOnInit();
   });
  }

}
