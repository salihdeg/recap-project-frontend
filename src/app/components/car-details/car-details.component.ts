import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImageDetail } from 'src/app/models/carImageDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  carDetail:CarDetail;
  carImages:CarImageDetail[];
  safeUrls:SafeUrl[];

  constructor(private carService:CarService, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetails(params['carId']);
        this.getCarImages(params['carId']);
      }
    });
  }

  getCarDetails(carId:number){
    this.carService.getCarDetails(carId).subscribe((response) => {
      this.carDetail = response.data;
    });
  }

  translateToTrusted(){
    this.safeUrls = [this.carImages.length];
    for (let index = 0; index < this.carImages.length; index++) {
      this.safeUrls[index] = this.sanitizer.bypassSecurityTrustUrl(this.carImages[index].imagePath);
    }
  }

  getCarImages(carId:number){
    this.carService.getCarImagesById(carId).subscribe((response) => {
      this.carImages = response.data;
      this.translateToTrusted();
    });
  }

}
