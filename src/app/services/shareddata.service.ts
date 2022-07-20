import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class ShareddataService {
  pONo: any;
  poFullData: any;
  poFilteredData: any;
  qpoNo: any;
  qtFullData: any;
  qtFilteredData: any;
  constructor(
    public network: NetworkService,
  ) { }

  invoieDetail: any;
  goodsReceiptDocNo: any;
  goodsReceiptFullData: any;
  goodsReceiptFilteredData: any;

  setInvoie(data: any) {
    this.invoieDetail = data;
  }

  getInvoie() {
    return this.invoieDetail;
    console.log(this.invoieDetail);
  }

  setGrNum(data: any) {
    this.goodsReceiptDocNo = data;
    this.goodsReceiptFullData = this.network.grItemData;
    this.goodsReceiptFilteredData = this.goodsReceiptFullData.filter((x: any) => x.MAT_DOC === this.goodsReceiptDocNo);
  }

  get getGrItems() {
    return this.goodsReceiptFilteredData;
  }

  setPoNum(data: any) {
    this.pONo = data;
    this.poFullData = this.network.poItem;
    this.poFilteredData = this.poFullData.filter((x: any) => x.PO_NUMBER === this.pONo);
  }

  get getPoItems() {
    return this.poFilteredData;
  }

  setQPoNum(data: any) {
    this.qpoNo = data;
    this.qtFullData = this.network.quotDataItems;
    this.qtFilteredData = this.qtFullData.filter((x: any) => x.PO_NUMBER === this.qpoNo)
  }

  get getQtItems() {
    return this.qtFilteredData;
  }

}
