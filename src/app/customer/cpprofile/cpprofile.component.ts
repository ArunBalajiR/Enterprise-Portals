import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareddataService } from '../../services/shareddata.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-cpprofile',
  templateUrl: './cpprofile.component.html',
  styleUrls: ['./cpprofile.component.css']
})
export class CpprofileComponent implements OnInit {



  constructor(
    public router: Router,
    public sharedData:ShareddataService,
    public network:NetworkService
  ) {}

  customerId:any;

  ngOnInit(): void {
    this.customerId=localStorage.getItem('customerId');
    this.network.getProfileData(this.customerId);
  }

  get customerProfile(){
    return this.network.customerProfile;
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['/customer'])

  }

  navToCustomerDashboard(): void {
    this.router.navigate(['/customerdashboard']);
  }


}
