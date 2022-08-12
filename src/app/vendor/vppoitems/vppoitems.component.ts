import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';
import { ShareddataService } from 'src/app/services/shareddata.service';

@Component({
  selector: 'app-vppoitems',
  templateUrl: './vppoitems.component.html',
  styleUrls: ['./vppoitems.component.css']
})
export class VppoitemsComponent implements OnInit {

  searchKey: any;
  vendorId: any;
  myjson:any=JSON;
  

  page: number = 1;
  constructor(

    public router: Router,
    public network: NetworkService,
    public sharedData: ShareddataService
  ) { }



  ngOnInit(): void {
    this.vendorId = localStorage.getItem('vendorId');
    // this.network.getVProfileData(this.vendorId);
    // this.network.getGoodsReceiptData(this.vendorId);
  }

  get poData() {
    return this.sharedData.getPoItems;
  }


  logOut() {
    localStorage.clear();
    this.network.logoutClearCache();
    this.router.navigate(['/vendor'])
  }
  navToVendorProfile() {
    this.router.navigate(['/vprofile'])
  }

  navToVendorDashboard() {
    this.router.navigate(['/vendordashboard'])
  }

  navToCredit() {
    this.router.navigate(['/vcredit'])
  }

  navToDebit() {
    this.router.navigate(['/vdebit'])
  }

  navToQuotation() {
    this.router.navigate(['/quotation'])
  }


  navToPurchaseOrder() {
    this.router.navigate(['/po'])
  }

  navToGoodsReceipt() {
    this.router.navigate(['/goodsreceipt'])
  }

  navToInvoice() {
    this.router.navigate(['/vinvoice']);
  }

  navToPayment() {
    this.router.navigate(['/vpayment']);
  }


}
