import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NFTObject, NFTService } from '../nft.service';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-nft-details',
  templateUrl: './nft-details.component.html',
})
export class NftDetailsComponent implements OnInit {


  public targetNFT:NFTObject | undefined
  // public isOwnedByCurrentUser = false

  public giftedUserAddress : string | undefined

  constructor(private route: ActivatedRoute, private NFTser: NFTService, private web3Service:Web3Service) { }

  async ngOnInit(): Promise<void> {

    const NFTid:number = parseInt(this.route.snapshot.queryParams["nft_ID"])

       
    if(this.NFTser.NFTsList.length === 0){

      await this.NFTser.getNFTs()
    }

    this.targetNFT = this.NFTser.getNFTbyId(NFTid)


    // if (this.targetNFT?.NFTownerAddress === this.web3Service.metaMaskUserAccount){

    //   this.isOwnedByCurrentUser = true



    // }

  }


  public async buyNFT(){


    this.NFTser.transferNFTtoUser(
      this.targetNFT?.NFTownerAddress,
      this.targetNFT
   

    )

  }

  // public async GiftToUser(){

  //   if(this.giftedUserAddress){


  //     await this.NFTser.giftToUser(this.giftedUserAddress,this.targetNFT?.NFTid)
  //   }

  // }

}
