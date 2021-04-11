import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { OperationClaim } from 'src/app/models/operationClaim';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFrom: FormGroup;
  currentUser:User;
  operationClaims:OperationClaim[];
  isAdmin:boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private localStorageService:LocalStorageService,
    private toastrService: ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginFrom = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginFrom.valid) {

      let loginModel:LoginModel = Object.assign({},this.loginFrom.value);

      this.authService.login(loginModel).subscribe(response=>{
        this.router.navigate([""]);
        this.toastrService.success(response.message,"Success");
        this.localStorageService.getUserWithMail(loginModel.email);
        this.localStorageService.setUserMail(loginModel.email);
        this.localStorageService.setToken(response.data.token);
        this.localStorageService.setTokenExpiration(response.data.expiration);
        this.isAdminFunc();
      },responseError=>{
        this.toastrService.error(responseError.error,"Error");
      });

    }else{
      this.toastrService.error("Check The Fileds!","Empty Fields")
    }
  }
  isAdminFunc(){
    this.isAdmin = this.localStorageService.isAdmin();
  }
}
