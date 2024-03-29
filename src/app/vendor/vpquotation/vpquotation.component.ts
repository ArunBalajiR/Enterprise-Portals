import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';
import { ShareddataService } from 'src/app/services/shareddata.service';

@Component({
  selector: 'app-vpquotation',
  templateUrl: './vpquotation.component.html',
  styleUrls: ['./vpquotation.component.css']
})
export class VpquotationComponent implements OnInit {

  searchKey: any;
  vendorId: any;
  object:any=Object;

  page: number = 1;

  constructor(
    public router: Router,
    public network: NetworkService,
    public sharedData: ShareddataService
  ) { }

  ngOnInit(): void {
    this.vendorId = localStorage.getItem("vendorId");
    this.network.getQuotationData(this.vendorId);
  }

  get quotationData() {
    return this.network.quotData;
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

  gotoRFC(poNumber: any) {
    this.sharedData.setQPoNum(poNumber);
    this.router.navigate(['/quotationitems']);
  }

  navToQuotation() {
    this.router.navigate(['/quotation']);
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
