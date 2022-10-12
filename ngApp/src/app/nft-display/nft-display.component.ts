import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-nft-display',
  templateUrl: './nft-display.component.html',
})
export class NftDisplayComponent implements OnInit {

  constructor( private appService:Web3Service) { }

  ngOnInit(): void {

   
  }

}
