import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseURL = "http://localhost:3001/profile"
  constructor(private _http :HttpClient) { }

  //register profile
  public storeProfile(profile:any):Observable<any>{
    return this._http.post(this.baseURL,profile)
  }
  //login 
  public login(id: number, password:string): Observable<any> {
   let url = `${this.baseURL}/${id}/${password}`;
   return this._http.get(url);
  }
  // add contacts 
  public addContact(contact : any, userId: number) : Observable<any> {
  let url = `${this.baseURL}/${userId}/addContact`;
  return this._http.put(url, contact);
  }
  //show contacts
  public showContacts(id: number): Observable<any> {
    let url = `${this.baseURL}/${id}/acc/contacts`;
    return this._http.get(url);
   }
   //get profile
   public getProfile(id:number):Observable<any>{
     let url = `${this.baseURL}/${id}`;
     return this._http.get(url);
   }
   //update profile //"/profile/:id/phone/:num"
   public updateProfile(id:any,num:any,data:any): Observable<any> {
    let url = `${this.baseURL}/${id}/phone/${num}`;///profile/:id/phone/:num
    return this._http.put(url,data);
   }
   public deleteContact(userId: number, contactId: number) : Observable<any> {
   let url = `${this.baseURL}/${userId}/contacts/${contactId}`;///profile/:id/contacts/:contactId
    return this._http.delete(url);
  }
  public searchContact(userId:number , name: string):Observable<any>{
    let url =`${this.baseURL}/${userId}/contacts/${name}`;
    return this._http.get(url)
  }
  public deleteProfile(id:any):Observable<any>{
    return this._http.delete(this.baseURL+'/'+id)
  }
  public updatePassword(userId: number, password : any) : Observable<any> {
  const updateURL = `${this.baseURL}/${userId}/password/${password}`;
  return this._http.put(updateURL,{});///profile/:id/password/:pass
  }
  public updateDate(userId: number, dob : any) : Observable<any> {
  const updateURL = `${this.baseURL}/${userId}/dob/${dob}`;
  return this._http.put(updateURL,{});//"/profile/:id/dob/:dob",
  }
  public updateContact(id:any,contactId:number,num:any,data:any): Observable<any> {
    let url = `${this.baseURL}/${id}/contacts/${contactId}/phone/${num}`;
    return this._http.put(url,data);
   }
}//"/profile/:id/contacts/:contactId/phone/:num"
