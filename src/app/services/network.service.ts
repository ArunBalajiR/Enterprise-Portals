import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatesService } from '../services/states';
@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  customerProfile: any;


  private inquiryData:any;
  private inquiryJson:any;
  private inquiryCount:number=0;

  private saleorderData:any;
  private saleorderJson:any;
  private saleorderCount:number=0;

  private deliveryData:any;
  private deliveryJson:any;
  private deliveryCount:number=0;
  private deliveryArray:any=[];


  public isLoading:boolean = false;
  constructor(private http:HttpClient,private states:StatesService) { }

  //PROFILE
  getProfileData(customerId:any){
    if(!this.customerProfile){
      this.customerProfile = {
        id: '000000000',
        fname: 'Loading..',
        lname: 'Loading..',
        city: '',
        region: '',
        postalcode: '',
        phone: '',
      };

      this.http.post("http://localhost:5000/profile",{id:customerId}).subscribe(
      response=>{
        var profileJson = JSON.parse(JSON.stringify(response));
        this.customerProfile.id = profileJson.data.PROFILE['KUNNR'];
        this.customerProfile.fname = profileJson.data.PROFILE['NAME1'];
        this.customerProfile.lname = profileJson.data.PROFILE['NAME2'];
        this.customerProfile.city = profileJson.data.PROFILE['ORT01'];
        this.customerProfile.region = profileJson.data.PROFILE['REGIO'] +" "+this.states.getRegion(profileJson.data.PROFILE['REGIO']);
        this.customerProfile.postalcode = profileJson.data.PROFILE['PSTLZ'];
        this.customerProfile.phone = profileJson.data.PROFILE['TELF1'];

      },
      err => {
        console.log(err);
      }
    )

    }

  }

  get profData(){
    return this.customerProfile;
  }


  //INQUIRY

  getInquiryData(customerId:any){
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
