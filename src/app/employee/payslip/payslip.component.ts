import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css']
})
export class PayslipComponent implements OnInit {

  searchKey: any;
  employeeId: any;

  page: number = 1;
  constructor(public router: Router, public network: NetworkService) { }

  ngOnInit(): void {
    this.employeeId = localStorage.getItem("employeeId");
    this.network.getPayslipData(this.employeeId);
  }

  get payslipData() {
    return this.network.paySlip;
  }

  printPayslip(seqObj: any) {
    this.network.getPayslipHTML(seqObj);
    console.log(seqObj);
    this.router.navigate(["/payslipprint"])
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

  }

  navToLeavereq() {
    this.router.navigate(['/leavereq'])
  }


  navToEmployeeDashboard() {
    this.router.navigate(['/epdashboard'])
  }



}
