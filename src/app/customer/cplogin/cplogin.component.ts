import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShareddataService } from 'src/app/services/shareddata.service';

@Component({
  selector: 'app-cplogin',
  templateUrl: './cplogin.component.html',
  styleUrls: ['./cplogin.component.css']
})
export class CploginComponent implements OnInit {
  portalName: string = 'Customer Portal';
  portalSubtext: string = 'One stop solution for all your customer management services';
  bulletOne: string = 'Customer Profile and Dashboard';
  bulletTwo: string = 'Customer Financial Dashboard';
  bulletThree: string = 'Overall Sales Data';

  authUser: any;
  flag = true;
  private _loginUrl = "http://localhost:5000/login";
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
    return this.http.post(this._loginUrl, this.authUser).subscribe(
      response => {
        this.Data = JSON.parse(JSON.stringify(response));
        if (this.Data.success) {

          localStorage.setItem('customerId', this.authUser.userid);
          localStorage.setItem('customerName', this.Data.data['NAME']);
          console.log(this.Data.data['NAME']);
          this.router.navigate(['/customerdashboard']);
        }
        else {
          this.flag = false;
        }
      }
    )

  }

  ngOnInit(): void {}




}
