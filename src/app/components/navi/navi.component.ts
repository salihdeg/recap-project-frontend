import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OperationClaim } from 'src/app/models/operationClaim';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  isAuth:boolean;
  isAdmin:boolean;
  constructor(private localStorageService:LocalStorageService,private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.isAuthFunc();
    this.isAdminFunc();
  }
  logOut(){
    this.localStorageService.logOut();
    window.location.reload();
  }
  isAuthFunc(){
    this.isAuth = this.localStorageService.isAuth();
  }

  isAdminFunc(){
    let adminExist = this.localStorageService.getAdmin();
    if (adminExist === "true") {
      this.isAdmin = true;
      return true;
    }else{
      this.isAdmin = false;
      return false;
    }
  }
}
