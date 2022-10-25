import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NFTObject, NFTService } from '../nft.service';

@Component({
  selector: 'app-nft-details',
  templateUrl: './nft-details.component.html',
})
export class NftDetailsComponent implements OnInit {


  public targetNFT:NFTObject | undefined

  constructor(private route: ActivatedRoute, private NFTser: NFTService) { }

  async ngOnInit(): Promise<void> {

    const NFTid:number = parseInt(this.route.snapshot.queryParams["nft_ID"])

       
    if(this.NFTser.NFTsList.length === 0){

      await this.NFTser.getNFTs()
    }

    this.targetNFT = this.NFTser.getNFTbyId(NFTid)


  }


  public async buyNFT(){


    this.NFTser.transferNFTtoUser(
      this.targetNFT?.NFTownerAddress,
      this.targetNFT
   

    )

  }

}
