import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NftBuyComponent } from './nft-buy/nft-buy.component';
import { NftDetailsComponent } from './nft-details/nft-details.component';
import { NftDisplayComponent } from './nft-display/nft-display.component';
import { NftSellComponent } from './nft-sell/nft-sell.component';

const routes: Routes = [
  {path:'nft-display',component:NftDisplayComponent},
  {path:'nft-sell',component:NftSellComponent},
  {path:'nft-buy',component:NftBuyComponent},
  {path:'nft-details',component:NftDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
