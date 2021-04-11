import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaim';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://localhost:44314/api/';
  claims:string[];
  constructor(private httpClient: HttpClient) {}

  getUserByMail(mail:string):Observable<SingleResponseModel<User>>{
    let getPath = this.apiUrl + "users/getbymail?email=" + mail;
    return this.httpClient.get<SingleResponseModel<User>>(getPath);
  }

  getClaims(user:User):Observable<ListResponseModel<OperationClaim>>{
    let userJson = JSON.stringify(user);
    let claimsPath = this.apiUrl + "users/getclaims";
    return this.httpClient.post<ListResponseModel<OperationClaim>>(claimsPath,user);
  }
  getClaimsByMail(email:string):Observable<ListResponseModel<OperationClaim>>{
    let url = this.apiUrl + "users/getclaimsbymail?email=" + email;
    return this.httpClient.get<ListResponseModel<OperationClaim>>(url);
  }
  isAdmin(operationClaims:OperationClaim[]){
    for (let i = 0; i < operationClaims.length; i++) {
      if(operationClaims[i].name === "admin"){
        return true;
      }
    }
    return false;
  }
}