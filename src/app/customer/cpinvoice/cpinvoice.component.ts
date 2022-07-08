import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';


@Component({
  selector: 'app-cpinvoice',
  templateUrl: './cpinvoice.component.html',
  styleUrls: ['./cpinvoice.component.css']
})
export class CpinvoiceComponent implements OnInit {

  searchKey: any;
  customerId: any;
  page: number = 1;
  constructor(
    public router: Router,
    public network: NetworkService,
  ) { }

  ngOnInit(): void {
    this.customerId = localStorage.getItem("customerId");
    this.network.getInvoiceData(this.customerId);
  }

  get invoiceData() {
    return this.network.invData;
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

  navToInvoice() {
    this.router.navigate(['/invoice']);
  }

  navToPayment() {
    this.router.navigate(['/payment']);
  }

}
