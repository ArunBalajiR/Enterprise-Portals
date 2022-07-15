import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-cpprofile',
  templateUrl: './cpprofile.component.html',
  styleUrls: ['./cpprofile.component.css']
})
export class CpprofileComponent implements OnInit {



  constructor(
    public router: Router,
    public network:NetworkService
  ) {}

  customerId:any;

  ngOnInit(): void {
    this.customerId=localStorage.getItem('customerId');
    this.network.getProfileData(this.customerId);
  }

  get customerProfile(){
    return this.network.customerProfile;
  }


  logOut() {
    localStorage.clear();
    this.network.logoutClearCache();
    this.router.navigate(['/customer'])
  }
  navToProfile() {

  }

  navToCustomerDashboard() {
    this.router.navigate(['/customerdashboard'])
  }

  navToCredit() {
    this.router.navigate(['/credit'])
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
