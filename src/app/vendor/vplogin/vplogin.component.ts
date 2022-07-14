import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShareddataService } from 'src/app/services/shareddata.service';

@Component({
  selector: 'app-vplogin',
  templateUrl: './vplogin.component.html',
  styleUrls: ['./vplogin.component.css']
})
export class VploginComponent implements OnInit {
  portalName: string = 'Vendor Portal';
  portalSubtext: string = 'One stop solution for all your Vendor services';
  bulletOne: string = 'Vendor Profile and Dashboard';
  bulletTwo: string = 'Vendor Financial Sheet';
  bulletThree: string = 'Request for Quotation,PO,etc.,';

  authUser: any;
  flag = true;
  private _loginUrl = "http://localhost:5000/vendorlogin";
  Data: any;

  constructor(
    private http: HttpClient,
    public router: Router,
    public shareddata:ShareddataService
  )

  {
    this.authUser = {
      id: '',
      password: '',
    };

  }

  onSubmit(f: NgForm) {
    this.authUser.id = f.value.userid;
    this.authUser.password = f.value.password;
    console.log(this.authUser);
    return this.http.post(this._loginUrl, this.authUser).subscribe(
      response => {
        this.Data = JSON.parse(JSON.stringify(response));
        console.log(this.Data);
        // if (this.Data.success) {
          
          // localStorage.setItem('vendorId', this.authUser.userid);
          // localStorage.setItem('vendorName', this.Data.data['NAME']);
        //   console.log(this.Data.data['NAME']);
        //   this.router.navigate(['/vendordashboard']);
        // }
        // else {
        //   this.flag = false;
        // }
      }
    )

  }

  ngOnInit(): void {}




}
