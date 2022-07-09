import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareddataService {
  invoieDetail:any;

  setInvoie(data: any){
    this.invoieDetail = data;
  }

  getInvoie(){
    return this.invoieDetail;
    console.log(this.invoieDetail);
  }
}
