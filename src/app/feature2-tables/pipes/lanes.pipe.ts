import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'lanesPipes'
})
export class LanesPipe implements PipeTransform {

  transform(value: any): number {
    if( Array.isArray(value)){
      value = value.length
    }
    return value ;
  }

}
