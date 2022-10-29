import { Component, OnInit } from '@angular/core';
import { NFTService } from '../nft.service';

@Component({
  selector: 'app-nft-buy',
  templateUrl: './nft-buy.component.html',
})
export class NftBuyConfirmComponent implements OnInit {

  constructor(public NFTser:NFTService) { }

  ngOnInit(): void {

    console.log("YAYA");
    
    console.log(this.NFTser.NFTCreatedEvent);
    
  }

}
