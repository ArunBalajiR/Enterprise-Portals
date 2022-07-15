import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { StatesService } from 'src/app/services/states';

@Component({
  selector: 'app-vpinvoice',
  templateUrl: './vpinvoice.component.html',
  styleUrls: ['./vpinvoice.component.css']
})
export class VpinvoiceComponent implements OnInit {

  searchKey: any;
  vendorId: any;
  page: number = 1;
  constructor(
    public router: Router,
    public network: NetworkService,
    public sharedData: ShareddataService,
    public status:StatesService
  ) { }

  ngOnInit(): void {
    this.vendorId = localStorage.getItem("vendorId");
    this.network.getVInvoiceData(this.vendorId);
    this.network.getVProfileData(this.vendorId);
  }

  get vinvoiceData() {
    return this.network.vinvData;
  }

  previewInvoice(invoiceDetail:any){
    this.sharedData.setInvoie(invoiceDetail);
    this.router.navigate(['/invpreview'])
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
