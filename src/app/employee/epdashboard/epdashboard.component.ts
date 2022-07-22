import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NetworkService } from 'src/app/services/network.service';
@Component({
  selector: 'app-epdashboard',
  templateUrl: './epdashboard.component.html',
  styleUrls: ['./epdashboard.component.css']
})
export class EpdashboardComponent implements OnInit {

  employeeName: any;
  employeeId: any;

  constructor(
    private http: HttpClient,
    public router: Router,
    private network: NetworkService

    ) { }

  ngOnInit(): void {

    this.employeeName = localStorage.getItem('employeeName');
    this.employeeId = localStorage.getItem('employeeId');
    this.network.getLeaveRequest(this.employeeId);
    this.network.getPayslipData(this.employeeId);
    this.network.getEmpProfileData(this.employeeId);

  }


  get paySlipCount(){
    return this.network.paysCount;
  }

  get leaveReqCount(){
    return this.network.leaveCount;
  }

  // get inquiryCount(){
  //   return this.network.inqCount;
  // }



  logOut() {
    localStorage.clear();
    this.network.logoutClearCache();
    this.router.navigate(['/employee'])
  }
  navToProfile() {
    this.router.navigate(['/epprofile'])
  }

  navToEmployeeDashboard() {

  }

  navToPayslip(){
    this.router.navigate(['/payslip'])
  }

  navToLeavereq(){
    this.router.navigate(['/leavereq'])
  }




}
