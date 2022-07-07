import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareddataService } from '../../services/shareddata.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { StatesService } from '../../services/states';
@Component({
  selector: 'app-cpprofile',
  templateUrl: './cpprofile.component.html',
  styleUrls: ['./cpprofile.component.css']
})
export class CpprofileComponent implements OnInit {

  customerProfile: any;
  
  constructor(
    public router: Router,
    private http:HttpClient,
    public sharedData:ShareddataService,
    private states:StatesService
    
  ) { 

    this.customerProfile = {
      id: '000000000',
      fname: 'Loading..',
      lname: 'Loading..',
      city: '',
      region: '',
      postalcode: '',
      phone: '',
    };

  }

  customerId:any;
  
  ngOnInit(): void {
    this.customerId=localStorage.getItem('customerId');
    this.http.post("http://localhost:5000/profile",{id:this.customerId}).subscribe(
      response=>{
        var profileJson = JSON.parse(JSON.stringify(response));
        this.customerProfile.id = profileJson.data.PROFILE['KUNNR'];
        this.customerProfile.fname = profileJson.data.PROFILE['NAME1'];
        this.customerProfile.lname = profileJson.data.PROFILE['NAME2'];
        this.customerProfile.city = profileJson.data.PROFILE['ORT01'];
        this.customerProfile.region = profileJson.data.PROFILE['REGIO'] +" "+this.states.getRegion(profileJson.data.PROFILE['REGIO']);
        this.customerProfile.postalcode = profileJson.data.PROFILE['PSTLZ'];
        this.customerProfile.phone = profileJson.data.PROFILE['TELF1'];
        
      }

      
    )
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['/customer'])
     
  }

  navToCustomerDashboard(): void {
    this.router.navigate(['/customerdashboard']);
  }


}
