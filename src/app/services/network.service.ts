import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatesService } from '../services/states';
@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  customerProfile: any;
  vendorProfile: any;


  private inquiryData: any;
  private inquiryJson: any;
  private inquiryCount: number = 0;

  private saleorderData: any;
  private saleorderJson: any;
  private saleorderCount: number = 0;

  private deliveryData: any;
  private deliveryJson: any;
  private deliveryCount: number = 0;
  private deliveryArray: any = [];

  private creditData: any;
  private debitData: any;
  private creditDebitJson: any;

  private paymentData: any;
  private paymentJson: any;
  private paymentGeneralLedger: any = [];

  private invoiceData: any;
  private invoiceLength: any;
  private invoiceJson: any;
  private invoiceGeneralLedger: any = [];

  private quotationData: any;
  private quotationJson: any;
  private quotationCount: number = 0;
  private quotationArray: any = [];
  private quotationFItems: any = [];
  quotationItems: any;

  private purchaseorderData: any;
  private purchaseorderJson: any;
  private purchaseorderCount: number = 0;
  private purchaseorderArray: any = [];
  private purchaseorderItems: any;
  private purchaseorderItemArray: any = [];

  private goodsreceiptData: any;
  private goodsreceiptItems: any;
  private goodsreceiptJson: any;
  private goodsreceiptCount: number = 0;
  private goodsreceiptArray: any = [];

  private vcreditData: any;
  private vdebitData: any;
  private vcreditDebitJson: any;

  private vpaymentData: any;
  private vpaymentJson: any;
  private vopenPayments: any;
  private vclosedpayments: any;
  private paymentVendor: any = [];

  private vinvoiceData: any;
  private vinvoiceLength: any;
  private vinvoiceJson: any;
  private vinvoiceGeneralLedger: any = [];





  public isLoading: boolean = false;
  public isObject: boolean = false;

  constructor(private http: HttpClient, private states: StatesService) { }

  //Customer PROFILE
  getProfileData(customerId: any) {
    if (!this.customerProfile) {
      this.customerProfile = {
        id: '000000000',
        fname: 'Loading..',
        lname: 'Loading..',
        city: '',
        region: '',
        postalcode: '',
        phone: '',
      };

      this.http.post("http://localhost:5000/profile", { id: customerId }).subscribe(
        response => {
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

  get profData() {
    return this.customerProfile;
  }


  //INQUIRY

  getInquiryData(customerId: any) {
    if (!this.inquiryData) {

      this.http.post("http://localhost:5000/inquirylist", { id: customerId }).subscribe(
        response => {
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
  getSaleorderData(customerId: any) {
    if (!this.saleorderData) {

      this.http.post("http://localhost:5000/saleorder", { id: customerId }).subscribe(
        response => {
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

  get saleCount() {
    return this.saleorderCount;
  }



  //DELIVERY
  getDeliveryData(customerId: any) {
    if (!this.deliveryData) {

      this.http.post("http://localhost:5000/deliverylist", { id: customerId }).subscribe(
        response => {
          this.isLoading = true;
          console.log(response);
          this.deliveryJson = JSON.parse(JSON.stringify(response));
          this.deliveryData = this.deliveryJson.data.DELIVERYDATA.item;
          this.deliveryCount = (this.deliveryData.length) - 1;
          for (let i = 1; i < this.deliveryData.length; i++) {
            this.deliveryArray[i - 1] = this.deliveryData[i]
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

  get delCount() {
    return this.deliveryCount;
  }



  //CREDIT AND DEBIT MEMO
  getCreditDebitData(customerId: any) {
    if (!this.creditData || !this.debitData) {

      this.http.post("http://localhost:5000/creditdebitmemo", { id: customerId }).subscribe(
        response => {
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

  get debData() {
    return this.debitData;
  }

  //PAYMENT AGING
  getPaymentAgingData(customerId: any) {
    if (!this.paymentData) {

      this.http.post("http://localhost:5000/invoice", { id: customerId }).subscribe(
        response => {
          this.isLoading = true;
          console.log(response);
          this.paymentJson = JSON.parse(JSON.stringify(response));
          this.paymentData = this.paymentJson.data.INV_DET.item;
          let k = 0;
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
  getInvoiceData(customerId: any) {
    if (!this.invoiceData) {
      this.http.post("http://localhost:5000/invoice", { id: customerId }).subscribe(
        response => {
          this.isLoading = true;
          console.log(response);
          this.invoiceJson = JSON.parse(JSON.stringify(response));
          this.invoiceData = this.invoiceJson.data.INV_DET.item;
          let k = 0;
          for (let i = 0; i < this.invoiceData.length; i++) {
            if (this.invoiceData[i].KOART === 'S') {
              this.invoiceGeneralLedger[k++] = this.invoiceData[i];
            }
          }
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

  //Vendor PROFILE
  getVProfileData(vendorId: any) {
    if (!this.vendorProfile) {
      this.vendorProfile = {
        id: 'Loading..',
        fname: 'Loading..',
        lname: 'Loading..',
        street: '',
        city: '',
        country: '',
        region: '',
        postalcode: '',
        phone: '',
      };

      this.http.post("http://localhost:5000/vendorprofile", { id: vendorId }).subscribe(
        response => {
          var vprofileJson = JSON.parse(JSON.stringify(response));
          this.vendorProfile.id = vprofileJson.data.PROFILE['VENDOR'];
          this.vendorProfile.fname = vprofileJson.data.PROFILE['NAME'];
          this.vendorProfile.lname = vprofileJson.data.PROFILE['NAME_2'];
          this.vendorProfile.street = vprofileJson.data.PROFILE['STREET'];
          this.vendorProfile.city = vprofileJson.data.PROFILE['CITY'];
          this.vendorProfile.country = vprofileJson.data.PROFILE['COUNTRY'];
          this.vendorProfile.region = vprofileJson.data.PROFILE['REGION'];
          this.vendorProfile.postalcode = vprofileJson.data.PROFILE['POSTL_CODE'];
          this.vendorProfile.phone = vprofileJson.data.PROFILE['TELEPHONE'];

        },
        err => {
          console.log(err);
        }
      )

    }

  }

  get vprofData() {
    return this.vendorProfile;
  }


  //QUOTATION

  getQuotationData(vendorId: any) {
    if (!this.quotationData) {

      this.http.post("http://localhost:5000/vendorrfq", { id: vendorId }).subscribe(
        response => {
          this.isLoading = true;
          console.log(response);
          this.quotationJson = JSON.parse(JSON.stringify(response));
          this.isObject = (typeof this.quotationJson.data.RFQ_HEAD) === "object";
          if (!this.isObject) {
            this.quotationData = this.quotationJson.data.RFQ_HEAD.item;
            this.quotationItems = this.quotationJson.data.RFQ_VALUES.item;
            let k = 0;
            for (let i = 1; i < this.quotationData.length; i++) {
              this.quotationArray[k++] = this.quotationData[i];
            }
            this.quotationCount = (this.quotationArray.length);
            let r = 0;
            for (let j = 1; j < this.quotationItems.length; j++) {
              this.quotationFItems[r++] = this.quotationItems[j];
            }
          }

        },
        err => {
          console.log(err);
        }
      )
    }
  }

  get quotData() {
    return this.quotationArray;
  }

  get quotDataItems() {
    return this.quotationFItems;
  }

  get quotCount() {
    return this.quotationCount;
  }

  // PURCHSE ORDER
  getPurchaseOrderData(vendorId: any) {
    if (!this.purchaseorderData) {
      this.http.post("http://localhost:5000/vendorpo", { id: vendorId }).subscribe(
        response => {
          this.isLoading = true;
          console.log(response);
          this.purchaseorderJson = JSON.parse(JSON.stringify(response));
          this.purchaseorderData = this.purchaseorderJson.data.HEADERDATA.item;
          this.purchaseorderItems = this.purchaseorderJson.data.ITEMDATA.item;
          let k = 0;
          for (let i = 1; i < this.purchaseorderData.length; i++) {
            this.purchaseorderArray[k++] = this.purchaseorderData[i];
          }
          let j = 0;
          for (let n = 1; n < this.purchaseorderItems.length; n++) {
            this.purchaseorderItemArray[j++] = this.purchaseorderItems[n];
          }
          this.purchaseorderCount = (this.purchaseorderArray.length);

        },
        err => {
          console.log(err);
        }
      )
    }
  }

  get poData() {
    return this.purchaseorderArray;
  }

  get poItem() {
    return this.purchaseorderItems;
  }

  get poCount() {
    return this.purchaseorderCount;
  }

  // GOODS RECEIPT
  getGoodsReceiptData(vendorId: any) {
    if (!this.goodsreceiptData) {
      this.http.post("http://localhost:5000/vendorgoodsreceipt", { id: vendorId }).subscribe(
        response => {
          this.isLoading = true;
          console.log(response);
          this.goodsreceiptJson = JSON.parse(JSON.stringify(response));
          this.goodsreceiptData = this.goodsreceiptJson.data.GOODSHEAD.item;
          this.goodsreceiptItems = this.goodsreceiptJson.data.GOODSVALUE.item;
          this.goodsreceiptCount = (this.goodsreceiptData.length);
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  get grHeaderData() {
    return this.goodsreceiptData;
  }

  get grItemData() {
    return this.goodsreceiptItems;
  }

  get grCount() {
    return this.goodsreceiptCount;
  }


  //VENDOR CREDIT AND DEBIT MEMO
  getVCreditDebitData(vendorId: any) {
    if (!this.creditData || !this.debitData) {

      this.http.post("http://localhost:5000/vendorcreditdebit", { id: vendorId }).subscribe(
        response => {
          this.isLoading = true;
          console.log(response);
          this.vcreditDebitJson = JSON.parse(JSON.stringify(response));
          this.vcreditData = this.vcreditDebitJson.data.CREDITDATA.item;
          this.vdebitData = this.vcreditDebitJson.data.DEBITDATA.item;
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  get vcredData() {
    return this.vcreditData;
  }

  get vdebData() {
    return this.vdebitData;
  }

  // VENDOR PAYMENTS
  getVPaymentAgingData(vendorId: any) {
    if (!this.vopenPayments || !this.vclosedpayments) {

      this.http.post("http://localhost:5000/vendorpayment", { id: vendorId }).subscribe(
        response => {
          this.isLoading = true;
          console.log(response);
          this.vpaymentJson = JSON.parse(JSON.stringify(response));
          this.vopenPayments = this.vpaymentJson.data.T_OPEN.item;
          this.vclosedpayments = this.vpaymentJson.data.T_CLOSE.item;

          //AGING FOR OPEN PAYMENTS
          for (let i = 0; i < this.vopenPayments.length; i++) {
            if (this.vopenPayments[i].TAX_CODE === "V1") {
              var due_date = new Date(this.vopenPayments[i].DOC_DATE);
              let curr_date = new Date();
              var time = curr_date.getTime() - due_date.getTime();
              var day = time / (1000 * 3600 * 24);
              if (Math.floor(day) > 0) {
                this.vopenPayments[i].TAX_CODE = Math.floor(day);
              }
            }
          }

          //AGING FOR Closed PAYMENTS
          for (let i = 0; i < this.vclosedpayments.length; i++) {
            if (this.vclosedpayments[i].REGION === "") {
              var due_date = new Date(this.vclosedpayments[i].DOC_DATE);
              let curr_date = new Date();
              var time = curr_date.getTime() - due_date.getTime();
              var day = time / (1000 * 3600 * 24);
              if (Math.floor(day) > 0) {
                this.vclosedpayments[i].REGION = Math.floor(day);
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

  get vopenpayData() {
    return this.vopenPayments;
  }

  get vclosedpayData() {
    return this.vclosedpayments;
  }

  //INVOICE
  getVInvoiceData(vendorId: any) {
    if (!this.invoiceData) {
      this.http.post("http://localhost:5000/vendorinvoicelist", { id: vendorId }).subscribe(
        response => {
          this.isLoading = true;
          this.vinvoiceJson = JSON.parse(JSON.stringify(response));
          console.log(this.vinvoiceJson.data.INVOICE);
          this.vinvoiceData = this.vinvoiceJson.data.INVOICE.item;
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  get vinvData() {
    return this.vinvoiceData;
  }

  get isEmpty() {
    return this.isObject;
  }

  setEmpty() {
    this.isObject = true;
  }

  logoutClearCache() {
    // //customer
    // this.inquiryData = null;
    // this.inquiryCount = 0;
    // this.saleorderData = null;
    // this.saleorderCount = 0;
    // this.deliveryData = null;
    // this.deliveryCount = 0;
    // this.creditData = null;
    // this.debitData = null;
    // this.paymentData = null;
    // this.invoiceData = null;
    // //vendor
    // this.quotationData = null;
    // this.purchaseorderData = null;
    // this.goodsreceiptData = null;
    // this.quotationCount = 0;
    // this.purchaseorderCount = 0;
    // this.goodsreceiptCount = 0;
    // this.vcreditData = null;
    // this.vdebitData = null;
    // this.vpaymentData = null;
    // this.quotationArray = null;
    // this.quotationFItems = null;
    // this.purchaseorderArray = null;
    // this.purchaseorderItems = null;
    // this.goodsreceiptData = null;
    // this.goodsreceiptItems = null;
  }


}

