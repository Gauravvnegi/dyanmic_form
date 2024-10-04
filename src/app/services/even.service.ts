import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvenService {

  constructor() { }

  array :number[] = [1,2,3,4,5];
  observer = from(this.array)
  
  observerName = new Observable((observer)=>{
  
  });

}
