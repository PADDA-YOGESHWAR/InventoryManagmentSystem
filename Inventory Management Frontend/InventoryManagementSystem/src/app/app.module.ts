import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { HomelandingComponent } from './components/home/homelanding/homelanding.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderslandingComponent } from './components/orders/orderslanding/orderslanding.component';
import { StockslandingComponent } from './components/stocks/stockslanding/stockslanding.component';
import { AddstockComponent } from './components/stocks/addstock/addstock.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewstockComponent } from './components/stocks/viewstock/viewstock.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderhistoryComponent } from './components/orders/orderhistory/orderhistory.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StocksComponent,
    HomelandingComponent,
    OrdersComponent,
    OrderslandingComponent,
    StockslandingComponent,
    AddstockComponent,
    ViewstockComponent,
    OrderhistoryComponent,
  ],
  imports: [
    ReactiveFormsModule, 
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
