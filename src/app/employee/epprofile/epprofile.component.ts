import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';


@Component({
  selector: 'app-epprofile',
  templateUrl: './epprofile.component.html',
  styleUrls: ['./epprofile.component.css']
})
export class EpprofileComponent implements OnInit {



  constructor(
    public router: Router,
    public network:NetworkService
  ) {}

  employeeId:any;

  ngOnInit(): void {
    this.employeeId=localStorage.getItem('employeeId');
    this.network.getEmpProfileData(this.employeeId);
  }

  get employeeProfile(){
    return this.network.empprofData;
  }


  logOut() {
    localStorage.clear();
    this.network.logoutClearCache();
    this.router.navigate(['/employee'])
  }
  navToProfile() {
  }

  navToPayslip(){
    this.router.navigate(['/payslip'])
  }

  navToLeavereq(){
    this.router.navigate(['/leavereq'])
  }


  navToEmployeeDashboard() {
    this.router.navigate(['/epdashboard'])
  }



}
