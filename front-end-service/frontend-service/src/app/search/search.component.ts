import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { ProfileService } from '../profile.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
searchedContacts: any;
name : any
errorMessage : any;
constructor(private activatedRoute:ActivatedRoute, private profileService:ProfileService ) { }
ngOnInit() {
  this.activatedRoute.parent?.params.subscribe({
    next: (params:Params) => {
      this.profileService.getProfile(params['id']).subscribe({
        next: (data) => {
          this.searchedContacts = data.contacts
          this.name = data.contacts.name
        }
      })
    }
  })
}

search(name : string) {
  if(name.trim().length != 0) {
    this.activatedRoute.parent?.paramMap.subscribe((map:any) => {
      this.profileService.searchContact(map.params.id,name)
      .subscribe(
        success => {
          this.errorMessage = undefined; 
          this.searchedContacts = success;
        }, 
        err => {
          this.errorMessage = err.error.message; 
          this.searchedContacts = []
        }
        );
    });
  } 
  else {
    this.ngOnInit();
  }
}
} 