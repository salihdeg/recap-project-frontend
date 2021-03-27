import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { CarImageDetail } from '../models/carImageDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44314/api/';

  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let getAllPath = this.apiUrl + "cars/getall";
    return this.httpClient.get<ListResponseModel<Car>>(getAllPath);
  }

  getCarsByBrand(brandId:number): Observable<ListResponseModel<Car>>{
    let byBrandPath = this.apiUrl + "cars/getcarsbybrandid?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(byBrandPath);
  }
  getCarsByColor(colorId:number): Observable<ListResponseModel<Car>>{
    let byColorPath = this.apiUrl + "cars/getcarsbycolordid?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(byColorPath);
  }
  getCarDetails(carId:number):Observable<SingleResponseModel<CarDetail>>{
    let carDetails = this.apiUrl + "cars/getcardetailsbyid?carId="+carId;
    return this.httpClient.get<SingleResponseModel<CarDetail>>(carDetails);
  }

  getCarImagesById(carId:number):Observable<ListResponseModel<CarImageDetail>>{
    let carImagesPath = this.apiUrl + "cars/getcarimagesbyid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<CarImageDetail>>(carImagesPath);
  }

}
