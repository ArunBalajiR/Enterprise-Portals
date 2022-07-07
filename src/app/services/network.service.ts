import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private inquiryData:any;
  private inquiryJson:any;
  private inquiryCount:any;

  private saleorderData:any;
  private saleorderJson:any;
  private saleorderCount:any;

  private deliveryData:any;
  private deliveryJson:any;
  private deliveryCount:any;
  private deliveryArray:any=[];


  public isLoading:boolean = false;
  constructor(private http:HttpClient) { }

  //INQUIRY

  getInquiryData(customerId:any){
    console.log(customerId);
    if(!this.inquiryData){

    this.http.post("http://localhost:5000/inquirylist",{id:customerId}).subscribe(
      response =>{
        this.isLoading = true;
        console.log(response);
        this.inquiryJson = JSON.parse(JSON.stringify(response));
        this.inquiryData = this.inquiryJson.data.INQUIRYLIST.item;
        this.inquiryCount = (this.inquiryData.length);
      },
      err => {
        console.log(err);
      }
    )
    }
  }

  get inqData() {
    return this.inquiryData;
  }

  get inqCount() {
    return this.inquiryCount;
  }

  //SALEORDER
  getSaleorderData(customerId:any){
    if(!this.saleorderData){

    this.http.post("http://localhost:5000/saleorder",{id:customerId}).subscribe(
      response =>{
        this.isLoading = true;
        console.log(response);
        this.saleorderJson = JSON.parse(JSON.stringify(response));
        this.saleorderData = this.saleorderJson.data.SALEORDERS.item;
        this.saleorderCount = this.saleorderData.length;
      },
      err => {
        console.log(err);
      }
    )
    }
  }

  get saleData() {
    return this.saleorderData;
  }

  get saleCount(){
    return this.saleorderCount;
  }



  //DELIVERY
  getDeliveryData(customerId:any){
    if(!this.deliveryData){

    this.http.post("http://localhost:5000/deliverylist",{id:customerId}).subscribe(
      response =>{
        this.isLoading = true;
        console.log(response);
        this.deliveryJson = JSON.parse(JSON.stringify(response));
        this.deliveryData = this.deliveryJson.data.DELIVERYDATA.item;
        this.deliveryCount = (this.deliveryData.length)-1;
        for(let i=1;i<this.deliveryData.length;i++){
          this.deliveryArray[i-1]=this.deliveryData[i]
        }

      },
      err => {
        console.log(err);
      }
    )
    }
  }

  get delData() {
    return this.deliveryArray;
  }

  get delCount(){
    return this.deliveryCount;
  }



}
