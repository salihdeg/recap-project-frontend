import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImageDetail } from 'src/app/models/carImageDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  currentCar:Car;
  emptyCar:Car;
  carDetails:CarDetail[];
  carImages:CarImageDetail[];
  safeUrls:SafeUrl[];
  dataLoaded = false;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      }else if(params['colorId']){
        this.getCarsByColor(params['colorId']);
      }
       else {
        this.getCars();
      }
      
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
      this.setAllImageUrls(this.cars);
    });
  }
  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
      this.setAllImageUrls(this.cars);
    });
  }
  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
      this.setAllImageUrls(this.cars);
    });
  }
  setCurretCar(car: Car){
    this.currentCar = car;
  }

  //Get an first image for thumbnail
  getCarImageById(carId:number){
    if(!this.safeUrls){
      this.safeUrls = [this.cars.length];
    }
    this.carService.getCarImagesById(carId).subscribe((response) => {
      this.safeUrls[carId] = (this.sanitizer.bypassSecurityTrustUrl(response.data[0].imagePath));
    });
  }

  setAllImageUrls(cars:Car[]){
    cars.forEach(c => {
      this.getCarImageById(c.id);
      console.log(this.safeUrls.length);
    });
  }
}
