import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-cppayment',
  templateUrl: './cppayment.component.html',
  styleUrls: ['./cppayment.component.css']
})
export class CppaymentComponent implements OnInit {

  searchKey:any;
  customerId:any;
  page:number=1;
  constructor(
    public router: Router,
    public network:NetworkService,
) { }

ngOnInit(): void {
  this.customerId = localStorage.getItem("customerId");
  this.network.getPaymentAgingData(this.customerId);
}

get paymentData(){
  return this.network.payData;
}


logOut() {
  localStorage.clear();
  this.network.logoutClearCache();
  this.router.navigate(['/customer'])
}
navToProfile() {
  this.router.navigate(['/profile'])
}

navToCustomerDashboard() {
  this.router.navigate(['/customerdashboard'])
}

navToCredit() {
  this.router.navigate(['/credit']);
}

navToDebit() {
  this.router.navigate(['/debit'])
}

navToDelivery() {
  this.router.navigate(['/delivery'])
}

navToInquiry() {
  this.router.navigate(['/inquiry'])
}

navToSaleorder() {
  this.router.navigate(['/saleorder'])
}

navToInvoice(){
  this.router.navigate(['/invoice']);
}

navToPayment(){

}
}
