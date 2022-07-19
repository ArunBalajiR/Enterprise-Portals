import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jspdf from 'jspdf';
import { NetworkService } from 'src/app/services/network.service';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { StatesService } from 'src/app/services/states';

@Component({
  selector: 'app-vpinvoicedownload',
  templateUrl: './vpinvoicedownload.component.html',
  styleUrls: ['./vpinvoicedownload.component.css']
})
export class VpinvoicedownloadComponent implements OnInit {


  searchKey: any;
  vendorId: any;
  today: any = new Date();


  page: number = 1;

  constructor(
    public router: Router,
    public network: NetworkService,
    public sharedData: ShareddataService,
    public koart: StatesService,

  ) { }

  ngOnInit(): void {
    this.vendorId=localStorage.getItem('vendorId');
    this.network.getVProfileData(this.vendorId);
  }

  get vendorProfile(){
    return this.network.vendorProfile;
  }

  get invoiceDetail() {
    return this.sharedData.invoieDetail;
  }



  generatePDF = () => {
    var data: any = document.getElementById('invoice');
    let now = new Date();
    const doc = new jspdf({ compress: true });
    doc.setDisplayMode(1);
    doc.html(data, {
      callback: function (doc) {
        for(let i=2;i<7;i++){
          doc.deletePage(2);
        }
        doc.save(`Vendor Invoice_${now.toLocaleDateString()}.pdf`);
      },
      x: 8,
      y: 2,
      html2canvas: { scale: 0.28 },
    });

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

  navToClosePayment() {
    this.router.navigate(['/vpaymentc']);
  }

  navToOpenPayment() {
    this.router.navigate(['/vpayment']);
  }



}
