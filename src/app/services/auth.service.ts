import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:44314/api/';

  constructor(private httpClient:HttpClient, localStorageService:LocalStorageService) { }

  login(loginModel:LoginModel){
    let authUrl = this.apiUrl + "auth/login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(authUrl,loginModel);
  }
  register(registerModel:RegisterModel){
    let registerUrl = this.apiUrl + "auth/register" ;
    return this.httpClient.post<SingleResponseModel<TokenModel>>(registerUrl,registerModel);
  }

  isAuthenticadted(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }
}
