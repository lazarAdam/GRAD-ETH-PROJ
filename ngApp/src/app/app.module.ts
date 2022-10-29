import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NftDisplayComponent } from './nft-display/nft-display.component';
import { NftDetailsComponent } from './nft-details/nft-details.component';
import { NftSellComponent } from './nft-sell/nft-sell.component';
import { NftBuyConfirmComponent } from './nft-buy/nft-buy.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NftDisplayComponent,
    NftDetailsComponent,
    NftSellComponent,
    NftBuyConfirmComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
