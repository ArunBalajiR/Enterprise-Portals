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
import { VpcreditComponent } from './vendor/vpcredit/vpcredit.component';
import { VpdashboardComponent } from './vendor/vpdashboard/vpdashboard.component';
import { VpdebitComponent } from './vendor/vpdebit/vpdebit.component';
import { VpgoodsreceiptComponent } from './vendor/vpgoodsreceipt/vpgoodsreceipt.component';
import { VpinvoiceComponent } from './vendor/vpinvoice/vpinvoice.component';
import { VpinvoicedownloadComponent } from './vendor/vpinvoicedownload/vpinvoicedownload.component';
import { VploginComponent } from './vendor/vplogin/vplogin.component';
import { VppaymentsComponent } from './vendor/vppayments/vppayments.component';
import { VpprofileComponent } from './vendor/vpprofile/vpprofile.component';
import { VppurorderComponent } from './vendor/vppurorder/vppurorder.component';
import { VpquotationComponent } from './vendor/vpquotation/vpquotation.component';

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
  },
  {
    path: 'vendor',
    component: VploginComponent
  },
  {
    path: 'vendordashboard',
    component: VpdashboardComponent
  },
  {
    path: 'vprofile',
    component: VpprofileComponent
  },
  {
    path: 'quotation',
    component: VpquotationComponent,

  },
  {
    path: 'po',
    component: VppurorderComponent,

  },
  {
    path: 'goodsreceipt',
    component: VpgoodsreceiptComponent,

  },
  {
    path: 'vinvoice',
    component: VpinvoiceComponent,

  },
  {
    path: 'vdebit',
    component: VpdebitComponent
  },
  {
    path: 'vcredit',
    component: VpcreditComponent
  },
  {
    path: 'vinvpreview',
    component: VpinvoicedownloadComponent
  },
  {
    path: 'vpayment',
    component: VppaymentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
