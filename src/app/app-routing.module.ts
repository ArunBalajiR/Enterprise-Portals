import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CpdashboardComponent } from './customer/cpdashboard/cpdashboard.component';
import { CpdeliveryComponent } from './customer/cpdelivery/cpdelivery.component';
import { CpinquiryComponent } from './customer/cpinquiry/cpinquiry.component';
import { CploginComponent } from './customer/cplogin/cplogin.component';
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
    component: CploginComponent
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
    
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
