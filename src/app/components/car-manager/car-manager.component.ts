import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormGroup,FormBuilder,FormControl,Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-manager',
  templateUrl: './car-manager.component.html',
  styleUrls: ['./car-manager.component.css'],
})
export class CarManagerComponent implements OnInit {
  
  currentCar:Car;
  currentCarDetail:CarDetail;
  carToDelete:Car;
  emptyCar: Car;
  carDate:string;
  
  dataLoaded:boolean = false;

  cars: Car[];
  colors: Color[];
  brands: Brand[];

  carUpdateForm: FormGroup;

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.start();
  }

  start(){
    this.createCarUpdateForm();
    this.getAllCars();
    this.getAllColors();
    this.getAllBrands();
  }

  getAllCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }
  getAllBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    });
  }
  getAllColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    });
  }
  deleteCar(car:Car){
    if (car) {
      this.carService.deleteCar(car).subscribe(response=>{
        this.toastrService.success(response.message,"Deleted");
        this.carToDelete = this.emptyCar;
        this.getAllCars();
      },errorResponse=>{
        this.toastrService.error(errorResponse.error.Message);
      });
    }else{
      this.toastrService.error("Car Not Found");
    }
  }
  updateCar(car:Car){
    if (car && this.carUpdateForm.valid) {
      this.carService.updateCar(car).subscribe(response=>{
        this.toastrService.success(response.message);
        window.location.reload(); //reload page
      },errorResponse=>{
        if(errorResponse.error!=[]){
          this.toastrService.error(errorResponse.error.Message,"Error!");
        }
        else if(errorResponse.error.Errors.length>0){
          for (let i = 0; i < errorResponse.error.Errors.length; i++) {
            this.toastrService.error(errorResponse.error.Errors[i].ErrorMessage,"Validation Error");
          }
        }
      });
    }
  }
  setCarToDelete(car:Car){
    this.carToDelete = car;
  }
  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      carDescription: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      isAvailable: [true, Validators.required],
      id:['',Validators.required]
    });
  }
  setCurrentCar(car:Car){
    this.carService.getCarDetailsById(car.id).subscribe(response=>{
      this.currentCar = car;
      this.currentCarDetail = response.data;
      this.dataLoaded = true;
      this.setFirstValueOfForm();
    });
  }
  setFirstValueOfForm(){
    if (this.currentCar) {
      this.carUpdateForm.controls['id'].setValue(this.currentCar.id);
      this.carUpdateForm.controls['carDescription'].setValue(this.currentCar.carDescription);
      this.carUpdateForm.controls['dailyPrice'].setValue(this.currentCar.dailyPrice);
      this.carUpdateForm.controls['brandId'].setValue(this.currentCar.brandId);
      this.carUpdateForm.controls['colorId'].setValue(this.currentCar.colorId);
      let newDate = this.currentCar.modelYear.toString().slice(0,10);
      this.carUpdateForm.controls['modelYear'].setValue(newDate);
      this.carUpdateForm.controls['isAvailable'].setValue(this.currentCar.isAvailable);
    }
  }
}
