import { Injectable } from '@angular/core';
import { OperationClaim } from '../models/operationClaim';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private user:User;
  private mail:string;
  private operationClaims:OperationClaim[];

  constructor(private userService:UserService) { }

  getToken(){
    return localStorage.getItem("token");
  }
  getTokenExpiration(){
    return localStorage.getItem("tokenExp");
  }
  setToken(token:string){
    localStorage.setItem("token",token);
  }
  setTokenExpiration(tokenExpiration:string){
    localStorage.setItem("tokenExp",tokenExpiration);
  }
  setUserMail(mail:string){
    localStorage.setItem("userMail",mail);
  }
  getUserMail(){
    return localStorage.getItem("userMail");
  }
  setAdmin(isAdmin:string){
    localStorage.setItem("isAdmin",isAdmin);
  }
  getAdmin(){
    return localStorage.getItem("isAdmin");
  }
  isAuth(){
    if (!localStorage.getItem("tokenExp")) {
      return false;
    }
    let expTime = localStorage.getItem("tokenExp");
    let nowTime = Math.floor((new Date).getTime() / 1000);
    let convertedExpiration =  Math.floor((new Date(expTime)).getTime() / 1000);
    if (nowTime>convertedExpiration) {
      this.logOut();
      return false;
    }else{
      return true;
    }
  }

  getUserWithMail(email:string) {
    this.userService.getUserByMail(email).subscribe(response=>{
      this.user = response.data;
    });
  }

  isAdmin(){
    let mail = this.getUserMail();
    if (!mail){
      return false;
    }else{
      this.userService.getClaimsByMail(mail).subscribe(response=>{
        let operationClaims:OperationClaim[] = response.data;
        let adminExist = operationClaims.find(claim=> claim.name === "admin");
        if (adminExist) {
          this.setAdmin("true");
          return true;
        }else{
          return false;
        }
      });
    }
    console.log(6);
    return false;
  }

  logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExp");
    localStorage.removeItem("userMail");
    localStorage.removeItem("isAdmin");
  }
  

}
