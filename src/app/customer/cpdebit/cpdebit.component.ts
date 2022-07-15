import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';
import { StatesService } from 'src/app/services/states';

@Component({
  selector: 'app-cpdebit',
  templateUrl: './cpdebit.component.html',
  styleUrls: ['./cpdebit.component.css']
})
export class CpdebitComponent implements OnInit {

  searchKey:any;
  customerId:any;
  page:number=1;
  constructor(
    public router: Router,
    public network:NetworkService,
    public koart:StatesService
) { }

ngOnInit(): void {
  this.customerId = localStorage.getItem("customerId");
  this.network.getCreditDebitData(this.customerId);
}

get debitData(){
  return this.network.debData;
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
  this.router.navigate(['/credit'])
}

navToDebit() {

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
  this.router.navigate(['/payment']);
}
}
