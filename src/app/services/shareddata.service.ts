import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareddataService {
  message:any
  customerId:any;
  array:string[]=[];
  constructor() { }

  setMessage(data: any,custno:any){
    this.message=data;
    this.customerId=custno;
  }

  getMessage(){
    this.array[0]=this.message;
    this.array[1]=this.customerId;
    return this.array;
  }
}
