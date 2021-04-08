import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:44314/api/';

  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel){
    let authUrl = this.apiUrl + "auth/login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(authUrl,loginModel);
  }

  isAuthenticadted(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }
}
