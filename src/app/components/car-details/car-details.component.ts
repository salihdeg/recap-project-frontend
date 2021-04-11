import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImageDetail } from 'src/app/models/carImageDetail';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  car: Car;
  carDetail: CarDetail;
  carImages: CarImageDetail[];
  safeUrls: SafeUrl[];
  firstSafeUrl: SafeUrl;

  constructor(
    private carService: CarService,
    private cartService: CartService,
    private toastrService:ToastrService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetails(params['carId']);
        this.getCarImages(params['carId']);
      }
    });
  }

  addToCart(){
    if (this.car) {
      this.cartService.addToCart(this.car);
      this.toastrService.success(this.car.carDescription + " Added to your cart","Added to cart");
    }
    
  }
  getCarById(id:number){
    this.carService.getCarById(id).subscribe((response)=>{
      this.car = response.data;
    });
  }

  getCarDetails(carId: number) {
    this.carService.getCarDetailsById(carId).subscribe((response) => {
      this.carDetail = response.data;
      this.getCarById(carId);
    });
  }

  translateToTrusted() {
    for (let index = 0; index < this.carImages.length; index++) {
      if (index === 0) {
        if (this.carImages.length>1) {
          this.safeUrls = [this.carImages.length]; 
        }        
        this.firstSafeUrl = this.sanitizer.bypassSecurityTrustUrl(
          this.carImages[index].imagePath
        );
      }else{
        this.safeUrls[index-1] = this.sanitizer.bypassSecurityTrustUrl(
          this.carImages[index].imagePath
        );
      }
    }
  }

  getCarImages(carId: number) {
    this.carService.getCarImagesById(carId).subscribe((response) => {
      this.carImages = response.data;
      this.translateToTrusted();
    });
  }
}
