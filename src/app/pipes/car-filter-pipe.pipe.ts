import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/carDetail';

@Pipe({
  name: 'carFilterPipe',
})
export class CarFilterPipePipe implements PipeTransform {
  transform(value: CarDetail[], carFilterText: string): CarDetail[] {
    carFilterText = carFilterText ? carFilterText.toLocaleLowerCase() : '';

    return carFilterText
      ? value.filter(
          (p: CarDetail) =>
            p.carDescription.toLocaleLowerCase().indexOf(carFilterText) !== -1
        )
      : value;
  }
}
