import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HomelandingComponent } from './components/home/homelanding/homelanding.component';
import { OrderhistoryComponent } from './components/orders/orderhistory/orderhistory.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderslandingComponent } from './components/orders/orderslanding/orderslanding.component';
import { AddstockComponent } from './components/stocks/addstock/addstock.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { StockslandingComponent } from './components/stocks/stockslanding/stockslanding.component';
import { ViewstockComponent } from './components/stocks/viewstock/viewstock.component';



const routes: Routes = [
  { path: '', component: HomeComponent,
      children:[
       {path : '',component:HomelandingComponent},
      ]},
  {  path : 'stocks',component:StocksComponent,
       children:[
         {path:'',component:StockslandingComponent},
         {path:'addstock',component:AddstockComponent},
         {path:'all-stocks',component:ViewstockComponent},
       ]},
  {  
    path: 'orders',component:OrdersComponent,
       children:[
        {path:'',component:OrderslandingComponent},
        {path:'orderhistory',component:OrderhistoryComponent}
      ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
