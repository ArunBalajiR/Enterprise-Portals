import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { CploginComponent } from './customer/cplogin/cplogin.component';
import { CpdashboardComponent } from './customer/cpdashboard/cpdashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CpprofileComponent } from './customer/cpprofile/cpprofile.component';
import { StyleDirective } from 'src/app/services/style.directive';
import { CpdeliveryComponent } from './customer/cpdelivery/cpdelivery.component';
import {  Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { CpinquiryComponent } from './customer/cpinquiry/cpinquiry.component';
import { CpsaleorderComponent } from './customer/cpsaleorder/cpsaleorder.component';
import { CpcreditComponent } from './customer/cpcredit/cpcredit.component';
import { CpdebitComponent } from './customer/cpdebit/cpdebit.component';
import { CppaymentComponent } from './customer/cppayment/cppayment.component';
import { CpinvoiceComponent } from './customer/cpinvoice/cpinvoice.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    CploginComponent,
    CpdashboardComponent,
    FooterComponent,
    HeaderComponent,
    CpprofileComponent,
    StyleDirective,
    CpdeliveryComponent,
    CpinquiryComponent,
    CpsaleorderComponent,
    CpcreditComponent,
    CpdebitComponent,
    CppaymentComponent,
    CpinvoiceComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    OrderModule,
    Ng2SearchPipeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
