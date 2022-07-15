import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';
@Component({
  selector: 'app-vpprofile',
  templateUrl: './vpprofile.component.html',
  styleUrls: ['./vpprofile.component.css']
})
export class VpprofileComponent implements OnInit {



  constructor(
    public router: Router,
    public network:NetworkService
  ) {}

  vendorId:any;

  ngOnInit(): void {
    this.vendorId=localStorage.getItem('vendorId');
    this.network.getVProfileData(this.vendorId);
  }

  get vendorProfile(){
    return this.network.vendorProfile;
  }

  logOut() {
    localStorage.clear();
    this.network.logoutClearCache();
    this.router.navigate(['/vendor'])
  }
  navToVendorProfile() {

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
    this.router.navigate(['/po'])
  }

  navToGoodsReceipt() {
    this.router.navigate(['/goodsreceipt'])
  }

  navToInvoice(){
    this.router.navigate(['/vinvoice']);
  }

  navToPayment(){
    this.router.navigate(['/vpayment']);
  }

}
