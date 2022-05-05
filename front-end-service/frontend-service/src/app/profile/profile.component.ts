import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile : undefined | any = undefined;
  constructor(private _activatedRoute: ActivatedRoute, private _service: ProfileService) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe({
      next : (params: Params) => {
        this._service.getProfile(params['id']).subscribe({
          next: (data) => this.profile = data,
          error: (err) => console.log(err)
        })
      }
    })
  }
}
