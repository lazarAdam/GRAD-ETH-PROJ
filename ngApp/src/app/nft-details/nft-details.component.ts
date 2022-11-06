import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NFTObject, NFTService } from '../nft.service';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-nft-details',
  templateUrl: './nft-details.component.html',
})
export class NftDetailsComponent implements OnInit {


  public targetNFT: NFTObject | undefined
  // public isOwnedByCurrentUser = false

  public giftedUserAddress: string | undefined

  constructor(private route: ActivatedRoute, private NFTser: NFTService, private web3Service: Web3Service) { }


  /**
   *  This function will be called first when this component gets loaded even before the html template gets rendered
   *  therefore it makes a good function for initializing tasks
   */
  async ngOnInit(): Promise<void> {

    // get the NFT id in the url
    const NFTid: number = parseInt(this.route.snapshot.queryParams["nft_ID"])

    // check if NFT list was populated, if false call the NFT service to populate the list by calling the smart contract
    if (this.NFTser.NFTsList.length === 0) {

      await this.NFTser.getNFTs()

    }

    // get the NFT object after populating the NFT list
    this.targetNFT = this.NFTser.getNFTbyId(NFTid)

  }

  /**
   * Function is triggered after the user click the "buy now" button which will use 
   * the NFT service to process the transfer transaction
   */
  public async buyNFT() {

    this.NFTser.transferNFTtoUser(
      this.targetNFT?.NFTownerAddress,
      this.targetNFT
    )

  }

}
