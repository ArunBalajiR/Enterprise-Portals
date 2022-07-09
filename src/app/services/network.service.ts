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

  private creditData:any;
  private debitData:any;
  private creditDebitJson:any;

  private paymentData:any;
  private paymentJson:any;
  private paymentGeneralLedger:any=[];

  private invoiceData:any;
  private invoiceLength:any;
  private invoiceJson:any;
  private invoiceGeneralLedger:any=[];



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
        this.customerProfile.region = profileJson.data.PROFILE['REGIO'];
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



  //CREDIT AND DEBIT MEMO
  getCreditDebitData(customerId:any){
    if(!this.creditData || !this.debitData){

    this.http.post("http://localhost:5000/creditdebitmemo",{id:customerId}).subscribe(
      response =>{
        this.isLoading = true;
        console.log(response);
        this.creditDebitJson = JSON.parse(JSON.stringify(response));
        this.creditData = this.creditDebitJson.data.CREDITDATA.item;
        this.debitData = this.creditDebitJson.data.DEBITDATA.item;
      },
      err => {
        console.log(err);
      }
    )
    }
  }

  get credData() {
    return this.creditData;
  }

  get debData(){
    return this.debitData;
  }

  //PAYMENT AGING
  getPaymentAgingData(customerId:any){
    if(!this.paymentData){

    this.http.post("http://localhost:5000/invoice",{id:customerId}).subscribe(
      response =>{
        this.isLoading = true;
        console.log(response);
        this.paymentJson = JSON.parse(JSON.stringify(response));
        this.paymentData = this.paymentJson.data.INV_DET.item;
        let k=0;
        for (let i = 0; i < this.paymentData.length; i++) {
          if (this.paymentData[i].KOART === 'S') {
            this.paymentGeneralLedger[k++] = this.paymentData[i];
          }
        }

        for (let i = 0; i < this.paymentGeneralLedger.length; i++) {
          if (this.paymentGeneralLedger[i].MANDT === 100) {
            var due_date = new Date(this.paymentGeneralLedger[i].MADAT);
            let curr_date = new Date();
            var time = curr_date.getTime() - due_date.getTime();
            var day = time / (1000 * 3600 * 24);
            if (Math.floor(day) > 0) {
              this.paymentGeneralLedger[i].MANDT = Math.floor(day);
            }
          }
        }

      },
      err => {
        console.log(err);
      }
    )
    }
  }

  get payData() {
    return this.paymentGeneralLedger;
  }


  //INVOICE
  getInvoiceData(customerId:any){
    if(!this.invoiceData){
    this.http.post("http://localhost:5000/invoice",{id:customerId}).subscribe(
      response =>{
        this.isLoading = true;
        console.log(response);
        this.invoiceJson = JSON.parse(JSON.stringify(response));
        this.invoiceData = this.invoiceJson.data.INV_DET.item;
        let k=0;
        for (let i = 0; i < this.invoiceData.length; i++) {
          if (this.invoiceData[i].KOART === 'S') {
            this.invoiceGeneralLedger[k++] = this.invoiceData[i];
          }
        }
        console.log(this.invoiceGeneralLedger);
      },
      err => {
        console.log(err);
      }
    )
    }
  }

  get invData() {
    return this.invoiceGeneralLedger;
  }




}
