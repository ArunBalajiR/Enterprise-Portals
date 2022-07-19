import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class ShareddataService {
  constructor(
    public network: NetworkService,
    ) { }

  invoieDetail:any;
  goodsReceiptDocNo:any;
  goodsReceiptFullData:any;
  goodsReceiptFilteredData:any;

  setInvoie(data: any){
    this.invoieDetail = data;
  }

  getInvoie(){
    return this.invoieDetail;
    console.log(this.invoieDetail);
  }

  setGrNum(data: any){
    this.goodsReceiptDocNo = data;
    this.goodsReceiptFullData = this.network.grItemData;
    this.goodsReceiptFilteredData = this.goodsReceiptFullData.filter((x:any)=>x.MAT_DOC === this.goodsReceiptDocNo);
  }

  get getGrItems(){
    return this.goodsReceiptFilteredData;
  }

}
