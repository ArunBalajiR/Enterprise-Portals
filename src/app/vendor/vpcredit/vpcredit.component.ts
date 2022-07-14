import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';
import { StatesService } from 'src/app/services/states';


@Component({
  selector: 'app-vpcredit',
  templateUrl: './vpcredit.component.html',
  styleUrls: ['./vpcredit.component.css']
})
export class VpcreditComponent implements OnInit {

  searchKey:any;
  vendorId:any;
  page:number=1;
  constructor(
    public router: Router,
    public network:NetworkService,
    public koart:StatesService
) { }

ngOnInit(): void {
  this.vendorId = localStorage.getItem("vendorId");
  this.network.getVCreditDebitData(this.vendorId);
}

get creditData(){
  return this.network.vcredData;
}

logOut() {
  localStorage.clear();
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

navToPayment() {
  this.router.navigate(['/vpayment']);
}

}
