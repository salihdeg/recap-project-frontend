import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFrom: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService
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

      let loginModel = Object.assign({},this.loginFrom.value);

      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.success(response.message,"Success");
        localStorage.setItem("token",response.data.token);
      },responseError=>{
        this.toastrService.error(responseError.error,"Error");
      });

    }else{
      this.toastrService.error("Check The Fileds!","Empty Fields")
    }
  }
}
