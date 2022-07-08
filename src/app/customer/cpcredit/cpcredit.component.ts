import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';
import { StatesService } from 'src/app/services/states';

@Component({
  selector: 'app-cpcredit',
  templateUrl: './cpcredit.component.html',
  styleUrls: ['./cpcredit.component.css']
})
export class CpcreditComponent implements OnInit {
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

get creditData(){
  return this.network.credData;
}


logOut() {
  localStorage.clear();
  this.router.navigate(['/customer'])
}
navToProfile() {
  this.router.navigate(['/profile'])
}

navToCustomerDashboard() {
  this.router.navigate(['/customerdashboard'])
}

navToCredit() {

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
  this.router.navigate(['/payment']);
}
}
