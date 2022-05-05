import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params} from '@angular/router';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  profile : any;
  constructor(private activatedRoute: ActivatedRoute, private _service:ProfileService,private _router: Router) { }
  
  ngOnInit() {
    this.activatedRoute.parent?.params.subscribe({
      next: (params:Params) => {
        this._service.getProfile(params['id']).subscribe({
          next: (data) => {
            this.profile = data
          }
        })
      }
    })
  }
  confirmDelete() {
    this._service.deleteProfile(this.profile._id).subscribe((data)=>{
     this.profile=data
     alert("You Account Has Been Deleted")
     this._router.navigate(['/login'])
    })
  }
}
