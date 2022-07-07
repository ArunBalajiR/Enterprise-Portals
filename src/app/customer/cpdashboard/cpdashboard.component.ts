import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-cpdashboard',
  templateUrl: './cpdashboard.component.html',
  styleUrls: ['./cpdashboard.component.css']
})
export class CpdashboardComponent implements OnInit {
  customerName: any;
  customerId: any;
  deliveryCount: any = 0;
  saleorderCount: any = 0;
  inquiryCount: any = 0;
  constructor(
    private http: HttpClient,
    public router: Router,
    private sharedData: ShareddataService

    ) { }

  ngOnInit(): void {

    this.customerName = localStorage.getItem('customerName');
    this.customerId = localStorage.getItem('customerId');
    this.deliveryCount = localStorage.getItem("deliveryCount");
    this.inquiryCount = localStorage.getItem("inquiryCount");
    this.saleorderCount = localStorage.getItem("saleorderCount");


    this.setSaleorderCount();
    this.setInquiryCount();
    this.setDeliveryCount()

  }




  setDeliveryCount(): void {
    if (!this.deliveryCount) {
      this.http.post("http://localhost:5000/deliverylist", { id: this.customerId }).subscribe(
        response => {
          var deliveryJson = JSON.parse(JSON.stringify(response));
          console.log(deliveryJson);
          this.deliveryCount = (deliveryJson.data.DELIVERYDATA.item.length) - 1;
          localStorage.setItem('deliveryCount', this.deliveryCount);
        }
      )
    }
  }

  setSaleorderCount(): void {
    if (!this.saleorderCount) {
      this.http.post("http://localhost:5000/saleorder", { id: this.customerId }).subscribe(
        response => {
          var saleorderJson = JSON.parse(JSON.stringify(response));
          console.log(saleorderJson);
          this.saleorderCount = saleorderJson.data.SALEORDERS.item.length;
          localStorage.setItem('saleorderCount', this.saleorderCount);
        }
      )
    }
  }

  setInquiryCount(): void {
    if (!this.inquiryCount) {
      this.http.post("http://localhost:5000/inquirylist", { id: this.customerId }).subscribe(
        response => {
          var inquiryJson = JSON.parse(JSON.stringify(response));
          console.log(inquiryJson);
          this.inquiryCount = inquiryJson.data.INQUIRYLIST.item.length;
          localStorage.setItem('inquiryCount', this.inquiryCount);
        }
      )
    }
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/customer'])
  }
  navToProfile() {
    this.router.navigate(['/profile'])
  }

  navToDelivery() {
    this.router.navigate(['/delivery'])
  }

  navToInquiry() {
    this.router.navigate(['/inquiry'])
  }

  navToSaleorder() {
    this.router.navigate(['/saleorder'])
  }

}
