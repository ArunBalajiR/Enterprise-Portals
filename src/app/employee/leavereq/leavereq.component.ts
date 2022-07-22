import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-leavereq',
  templateUrl: './leavereq.component.html',
  styleUrls: ['./leavereq.component.css']
})
export class LeavereqComponent implements OnInit {

 searchKey: any;
  employeeId: any;

  page: number = 1;
  constructor(public router: Router, public network: NetworkService) { }

  ngOnInit(): void {
    this.employeeId = localStorage.getItem("employeeId");
    this.network.getLeaveRequest(this.employeeId);
  }

  get leavereqData() {
    return this.network.leavereq;
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
