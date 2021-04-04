import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { CarImageDetail } from '../models/carImageDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
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
  getCarById(id:number):Observable<SingleResponseModel<Car>>{
    let byIdPath = this.apiUrl + "cars/getbyid?id=" + id;
    return this.httpClient.get<SingleResponseModel<Car>>(byIdPath);
  }

  getCarsByBrand(brandId:number): Observable<ListResponseModel<CarDetail>>{
    let byBrandPath = this.apiUrl + "cars/getcardetailsbybrandid?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(byBrandPath);
  }
  getCarsByColor(colorId:number): Observable<ListResponseModel<CarDetail>>{
    let byColorPath = this.apiUrl + "cars/getcardetailsbycolorid?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(byColorPath);
  }
  getCarDetails():Observable<ListResponseModel<CarDetail>>{
    let carDetails = this.apiUrl + "cars/getcardetails";
    return this.httpClient.get<ListResponseModel<CarDetail>>(carDetails);
  }
  getCarDetailsById(carId:number):Observable<SingleResponseModel<CarDetail>>{
    let carDetails = this.apiUrl + "cars/getcardetailsbyid?carId="+carId;
    return this.httpClient.get<SingleResponseModel<CarDetail>>(carDetails);
  }

  getCarImagesById(carId:number):Observable<ListResponseModel<CarImageDetail>>{
    let carImagesPath = this.apiUrl + "cars/getcarimagesbyid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<CarImageDetail>>(carImagesPath);
  }
  addCar(car:Car):Observable<ResponseModel>{
    let addCarUrl = this.apiUrl + "cars/add";
    return this.httpClient.post<ResponseModel>(addCarUrl,car);
  }

}
