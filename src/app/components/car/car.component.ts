import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImageDetail } from 'src/app/models/carImageDetail';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars:Car[];
  carDetails:CarDetail[];
  carImages:CarImageDetail[];
  safeUrls:SafeUrl[];

  currentCar:Car;
  emptyCar:Car;

  filterText:"";
  
  dataLoaded = false;

  constructor(
    private carService: CarService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private toastrService:ToastrService,
    private userService:UserService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
        this.getCars();
      }else if(params['colorId']){
        this.getCarsByColor(params['colorId']);
        this.getCars();
      }
       else {
        this.getCarDetails();
        this.getCars();
      }
      
    });
  }
  getCars(){
    this.carService.getCars().subscribe((response)=>{
      this.cars = response.data;
    });
  }

  getCarDetails(){
    this.carService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
      this.setAllImageUrlsToCarDetails(this.carDetails);
    });
  }
  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
      this.setAllImageUrlsToCarDetails(this.carDetails);
    });
  }
  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
      this.setAllImageUrlsToCarDetails(this.carDetails);
    });
  }
  setCurretCar(car: Car){
    this.currentCar = car;
  }

  //Get an first image for thumbnail
  getCarImageById(carId:number){
    if(!this.safeUrls){
      this.safeUrls = [this.carDetails.length];
    }
    this.carService.getCarImagesById(carId).subscribe((response) => {
      this.safeUrls[carId] = (this.sanitizer.bypassSecurityTrustUrl(response.data[0].imagePath));
    });
  }

  setAllImageUrlsToCarDetails(cars:CarDetail[]){
    cars.forEach(c => {
      this.getCarImageById(c.carId);
    });
  }

  addToCart(car:CarDetail){
    let newCar = this.cars.find(c=>c.id===car.carId);
    this.cartService.addToCart(newCar);
    this.toastrService.success(car.carDescription + " Added to your cart","Added to cart");
  }

}
