import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import { e404Component } from './components/screens/errors/404/e404.component';


const routes: Routes = [
  { path: '', loadChildren: './components/screens/dashboard/dashboard.module#DashboardModule' },
  { path: 'jobs', loadChildren: './components/screens/jobs/jobs.module#JobsModule' },
  { path: 'fetchers', loadChildren: './components/screens/fetchers/fetchers.module#FetchersModule' },
  { path: 'schedule', loadChildren: './components/screens/schedule/schedule.module#ScheduleModule' },
  { path: 'customers', loadChildren: './components/screens/customers/customers.module#CustomersModule' },
  { path: 'reports', loadChildren: './components/screens/reports/reports.module#ReportsModule' },
  { path: 'merchants', loadChildren: './components/screens/merchants/merchants.module#MerchantsModule' },
  { path: 'invoices', loadChildren: './components/screens/invoices/invoices.module#InvoicesModule'},
  { path: 'settings', loadChildren: './components/screens/settings/settings.module#SettingsModule'},
  { path: 'messages', loadChildren: './components/screens/messages/messages.module#MessagesModule'},
  { path: 'inbox', loadChildren: './components/screens/inbox/inboxmodule.module#InboxemoduleModule'},
  { path: '**', component: e404Component }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }]
})
export class AppRoutingModule { }
