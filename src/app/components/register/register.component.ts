import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup;
  isAuth:boolean;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService:LocalStorageService
    ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }
  register(){
    if (this.registerForm.valid) {
      let registerModel = Object.assign({},this.registerForm.value);
      this.authService.register(registerModel).subscribe(response=>{
        this.toastrService.success("Registration Successful");
        localStorage.setItem("tokenExp",response.data.expiration);
        localStorage.setItem("token",response.data.token);
      },responseError=>{
        this.toastrService.error(responseError.error,"Error");
      });
    }else{
      this.toastrService.error("Check The Fileds!","Empty Fields")
    }
  }

  isAuthFunc(){
    this.isAuth = this.localStorageService.isAuth();
    console.log(this.isAuth);
  }


}
