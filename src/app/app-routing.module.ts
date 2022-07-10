import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CpcreditComponent } from './customer/cpcredit/cpcredit.component';
import { CpdashboardComponent } from './customer/cpdashboard/cpdashboard.component';
import { CpdebitComponent } from './customer/cpdebit/cpdebit.component';
import { CpdeliveryComponent } from './customer/cpdelivery/cpdelivery.component';
import { CpinquiryComponent } from './customer/cpinquiry/cpinquiry.component';
import { CpinvoiceComponent } from './customer/cpinvoice/cpinvoice.component';
import { CpinvoicedownloadComponent } from './customer/cpinvoicedownload/cpinvoicedownload.component';
import { CploginComponent } from './customer/cplogin/cplogin.component';
import { CppaymentComponent } from './customer/cppayment/cppayment.component';
import { CpprofileComponent } from './customer/cpprofile/cpprofile.component';
import { CpsaleorderComponent } from './customer/cpsaleorder/cpsaleorder.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'customerdashboard',
    component: CpdashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customer',
    component: CploginComponent,
  },
  {
    path: 'profile',
    component: CpprofileComponent
  },
  {
    path: 'delivery',
    component: CpdeliveryComponent,

  },
  {
    path: 'inquiry',
    component: CpinquiryComponent,

  },
  {
    path: 'saleorder',
    component: CpsaleorderComponent,

  },
  {
    path: 'credit',
    component: CpcreditComponent,

  },
  {
    path: 'debit',
    component: CpdebitComponent
  },
  {
    path: 'invoice',
    component: CpinvoiceComponent
  },
  {
    path: 'invpreview',
    component: CpinvoicedownloadComponent
  },
  {
    path: 'payment',
    component: CppaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
