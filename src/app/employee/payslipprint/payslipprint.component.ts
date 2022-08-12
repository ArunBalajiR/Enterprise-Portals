import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { StatesService } from 'src/app/services/states';
import jspdf from 'jspdf';

@Component({
  selector: 'app-payslipprint',
  templateUrl: './payslipprint.component.html',
  styleUrls: ['./payslipprint.component.css']
})
export class PayslipprintComponent implements OnInit {


  searchKey: any;
  employeeId: any;
  today: any = new Date();


  page: number = 1;

  constructor(
    public router: Router,
    public network: NetworkService,
    public sharedData: ShareddataService,
    public koart: StatesService,

  ) { }

  ngOnDestroy(): void{
    this.network.setpayslipHTM();
  }

  ngOnInit(): void {
    this.employeeId = localStorage.getItem("employeeId");
    this.network.getPayslipData(this.employeeId);

  }

  get payslipPreview(){
    return this.network.payslipHTMPreview;
  }


  get payslipHTML() {
    return this.network.payslipHTM;
  }


  // downloadPayslip(){
  //   let base64 = this.payslipHTML;
  //   console.log(base64)
  //   let now = new Date();
  //   this.downloadPDF(base64,`Payslip${now.toLocaleDateString()}.pdf`)
  // }

  downloadPayslip() {
    const linkSource = 'data:application/pdf;base64,' + this.payslipHTML;
    const downloadLink = document.createElement("a");
    const fileName = "sample.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  downloadPDF(base64: any,filename:string){
    const source = `data:application/pdf;base64,${base64}`;
    const link = document.createElement("a")
    link.href = source
    link.download = `${filename}.pdf`
    link.click
  }

  printPayslip = () => {
    var data: any = document.getElementById('invoice');
    let now = new Date();
    const doc = new jspdf({ compress: true });
    doc.setDisplayMode(1);
    doc.html(data, {
      callback: function (doc) {
        for (let i = 2; i < 7; i++) {
          doc.deletePage(2);
        }
        doc.save(`Payslip${now.toLocaleDateString()}.pdf`);
      },
      x: 8,
      y: 2,
      html2canvas: { scale: 0.2 },
    });

  }

  logOut() {
    localStorage.clear();
    this.network.logoutClearCache();
    this.router.navigate(['/employee'])
  }
  navToProfile() {
    this.router.navigate(['/epprofile'])
  }

  navToPayslip() {
    this.router.navigate(['/payslip'])
  }

  navToLeavereq() {
    this.router.navigate(['/leavereq'])
  }


  navToEmployeeDashboard() {
    this.router.navigate(['/epdashboard'])
  }



}
