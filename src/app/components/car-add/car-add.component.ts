import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  brands:Brand[];
  colors:Color[];
  carAddForm: FormGroup;
  selectedBrand: Brand;
  selectedColor: Color;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private carService: CarService,
    private colorService: ColorService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColors();
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response)=>{
      this.brands = response.data;
    });
  }
  getColors(){
    this.colorService.getColors().subscribe((response)=>{
      this.colors = response.data;
    });
  }

  selectColor(color:Color){
    this.selectedColor = color;
  }

  selectBrand(brand:Brand){
    this.selectedBrand = brand;
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      carDescription: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      isAvailable: [true, Validators.required],
    });
  }

  addCar(){
    if (this.carAddForm.valid) {
      let carModel:Car = Object.assign({},this.carAddForm.value);
      this.carService.addCar(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Successfuly Added");
      },responseError=>{
        if(responseError.error!=[]){
          this.toastrService.error(responseError.error.Message,"Error!");
        }
        else if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Validation Error");
          }
        }
      });
      
    }else{
      this.toastrService.error("Check All Fields","Table Is Not Valid!");
    }
    
  }
}
