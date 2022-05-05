import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalContacts : number | undefined;
  name: string | undefined;
  constructor(private activatedRoute: ActivatedRoute, private _service: ProfileService) { }

  ngOnInit(): void {
    this.activatedRoute.parent?.params.subscribe({
      next: (params:Params) => {
        this._service.getProfile(params['id']).subscribe({
          next: (data) => {
            this.name = data.name;
            this.totalContacts = data.contacts.length;
          }
        })
      }
    })
  }
}
