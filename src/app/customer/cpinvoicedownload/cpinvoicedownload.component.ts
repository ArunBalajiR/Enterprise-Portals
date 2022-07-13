import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { StatesService } from 'src/app/services/states';
import jspdf from 'jspdf';


@Component({
  selector: 'app-cpinvoicedownload',
  templateUrl: './cpinvoicedownload.component.html',
  styleUrls: ['./cpinvoicedownload.component.css']
})
export class CpinvoicedownloadComponent implements OnInit {

  searchKey: any;
  customerId: any;
  today: any = new Date();


  page: number = 1;

  constructor(
    public router: Router,
    public network: NetworkService,
    public sharedData: ShareddataService,
    public koart: StatesService,

  ) { }

  ngOnInit(): void {
    this.customerId = localStorage.getItem("customerId");
    this.network.getProfileData(this.customerId);

  }

  get customerProfile() {
    return this.network.customerProfile;
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
        doc.save(`Invoice${now.toLocaleDateString()}.pdf`);
      },
      x: 8,
      y: 2,
      html2canvas: { scale: 0.28 },
    });

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
    this.router.navigate(['/invoice'])
  }

  navToPayment() {
    this.router.navigate(['/payment']);
  }


}
