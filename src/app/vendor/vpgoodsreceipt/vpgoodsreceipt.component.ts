import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';
import { ShareddataService } from 'src/app/services/shareddata.service';


@Component({
  selector: 'app-vpgoodsreceipt',
  templateUrl: './vpgoodsreceipt.component.html',
  styleUrls: ['./vpgoodsreceipt.component.css']
})
export class VpgoodsreceiptComponent implements OnInit {

  searchKey: any;
  vendorId: any;

  page: number = 1;
  constructor(
    public router: Router,
    public network: NetworkService,
    public sharedData : ShareddataService
    ) { }

  ngOnInit(): void {
    this.vendorId = localStorage.getItem("vendorId");
    this.network.getGoodsReceiptData(this.vendorId);
  }

  get goodsReceiptData() {
    return this.network.grHeaderData;
  }


  toGoods(goodsDocNum:any){
    this.sharedData.setGrNum(goodsDocNum);
    this.router.navigate(['/vgoodsitems']);
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
    this.router.navigate(['/quotation'])
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
