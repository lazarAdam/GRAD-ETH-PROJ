import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NFTObject, NFTService } from '../nft.service';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-nft-display',
  templateUrl: './nft-display.component.html',
})
export class NftDisplayComponent implements OnInit {

  constructor(
    public NFTser: NFTService, public web3Ser: Web3Service, private router: Router, private route: ActivatedRoute
  ) { }
  
  // flag 
  public viwOnlyUserNFTs = false;
  
  // array to store filtered current user NFTs 
  public userOnlyNFTs: NFTObject[] = []

  


  /**
   *  This function will be called first when this component gets loaded even before the html template gets rendered
   *  therefore it makes a good function for doing initializing work
   */
  async ngOnInit(): Promise<void> {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false

    this.viwOnlyUserNFTs = this.route.snapshot.queryParams['userOnly']

    // Use the NFT service to get all the NFT list from the smart contract
    await this.NFTser.getNFTs()

    // if this flag is set to true, only the current user's NFTs are displayed 
    if (this.viwOnlyUserNFTs) {

      this.userOnlyNFTs = this.NFTser.getCurrentUserNFTs();

    }



  }

}
