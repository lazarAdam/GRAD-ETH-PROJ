import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NFTService } from '../nft.service';
import { Web3Service } from '../web3.service';
//@ts-ignore
// import  *  from 'bootstrap'

@Component({
  selector: 'app-nft-sell',
  templateUrl: './nft-sell.component.html',
})
export class NftSellComponent implements OnInit, AfterViewInit {



  public inpNFTtitle: string | undefined
  public inpNFTCat: string | undefined
  public inpNFTvalue: string | undefined
  public inpNFTuri: string | undefined

  public creatorNameInp: string | undefined



  // private modal: bootstrap.Modal | undefined

  //@ts-ignore
  // @ViewChild('x', { static: false }) set content(content: ElementRef) {

  //   if (content) {

  //     this.modal = content
  //   }


  // }


  constructor(public NFTser: NFTService, public web3Ser: Web3Service) { }

  async ngOnInit(): Promise<void> {

    await this.NFTser.checkAndInitMetamaskAndContract()
  }


  ngAfterViewInit(): void {

  }

  public async createNFT() {



    if (this.inpNFTCat && this.inpNFTtitle && this.inpNFTvalue && this.inpNFTuri) {



      try {

        await this.NFTser.mintNewNFT(
          this.inpNFTtitle,
          this.inpNFTCat,
          this.inpNFTvalue,
          this.inpNFTuri,
          this.creatorNameInp
        )

        console.log("New nft created");

      } catch (error: any) {


        console.log(error.message);


      }



    } else {

      // throw error missing input data

    }



  }

}
