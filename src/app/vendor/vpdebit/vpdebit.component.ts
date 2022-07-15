import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';
import { StatesService } from 'src/app/services/states';


@Component({
  selector: 'app-vpdebit',
  templateUrl: './vpdebit.component.html',
  styleUrls: ['./vpdebit.component.css']
})
export class VpdebitComponent implements OnInit {

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

get debitData(){
  return this.network.vdebData;
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

navToOpenPayment() {
  this.router.navigate(['/vpayment']);
}


}
