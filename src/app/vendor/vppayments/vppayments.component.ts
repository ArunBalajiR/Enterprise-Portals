import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-vppayments',
  templateUrl: './vppayments.component.html',
  styleUrls: ['./vppayments.component.css']
})
export class VppaymentsComponent implements OnInit {

  searchKey:any;
  vendorId:any;
  today:any;
  page:number=1;
  constructor(
    public router: Router,
    public network:NetworkService,
) { }

ngOnInit(): void {
  this.vendorId = localStorage.getItem("vendorId");
  this.network.getVPaymentAgingData(this.vendorId);
  this.today = new Date();
}



get vpaymentOData(){
  return this.network.vopenpayData;
}

get vpaymentCData(){
  return this.network.vclosedpayData;
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

navToClosePayment() {
  this.router.navigate(['/vpaymentc']);
}

navToOpenPayment(){
  
}


}
