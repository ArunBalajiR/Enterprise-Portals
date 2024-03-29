import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';
import { ShareddataService } from 'src/app/services/shareddata.service';

@Component({
  selector: 'app-vpquotitem',
  templateUrl: './vpquotitem.component.html',
  styleUrls: ['./vpquotitem.component.css']
})
export class VpquotitemComponent implements OnInit {

  searchKey: any;
  vendorId: any;

  page: number = 1;
  constructor(
    public router: Router,
    public network: NetworkService,
    public sharedData:ShareddataService

    ) { }

  ngOnInit(): void {
    this.vendorId = localStorage.getItem("vendorId");
    this.network.getPurchaseOrderData(this.vendorId);
  }

  
  get qtData() {
    return this.sharedData.getQtItems;
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
