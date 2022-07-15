import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';
import { ShareddataService } from 'src/app/services/shareddata.service';


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
    public sharedData: ShareddataService,
  ) { }

  ngOnInit(): void {
    this.customerId = localStorage.getItem("customerId");
    this.network.getInvoiceData(this.customerId);
    this.network.getProfileData(this.customerId);
  }

  get invoiceData() {
    return this.network.invData;
  }

  previewInvoice(invoiceDetail:any){
    this.sharedData.setInvoie(invoiceDetail);
    this.router.navigate(['/invpreview'])
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
    this.router.navigate(['/debit']);
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

  }

  navToPayment() {
    this.router.navigate(['/payment']);
  }

}
