import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShareddataService } from 'src/app/services/shareddata.service';


@Component({
  selector: 'app-eplogin',
  templateUrl: './eplogin.component.html',
  styleUrls: ['./eplogin.component.css']
})
export class EploginComponent implements OnInit {

  portalName: string = 'Employee Portal';
  portalSubtext: string = 'One stop solution for all your Employee management services';
  bulletOne: string = 'Empoloyee Profile and Dashboard';
  bulletTwo: string = 'Employee Payslip Details';
  bulletThree: string = 'Employee Leave Details';

  authUser: any;
  flag = true;
  private _loginUrl = "http://localhost:5000/emplogin";
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

          localStorage.setItem('employeeId', this.authUser.userid);
          localStorage.setItem('employeeName', this.Data.data['EMPNAME']);
          console.log(this.Data.data['EMPNAME']);
          this.router.navigate(['/epdashboard']);
        }
        else {
          this.flag = false;
        }
      }
    )

  }

  ngOnInit(): void {}


}
