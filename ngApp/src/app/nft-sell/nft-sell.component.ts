import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NFTService } from '../nft.service';
import { Web3Service } from '../web3.service';
//@ts-ignore
// import  *  from 'bootstrap'

@Component({
  selector: 'app-nft-sell',
  templateUrl: './nft-sell.component.html',
})
export class NftSellComponent implements OnInit {


  // inputs 
  public inpNFTtitle: string | undefined
  public inpNFTCat: string | undefined
  public inpNFTvalue: string | undefined
  public inpNFTuri: string | undefined
  public creatorNameInp: string | undefined

  //flag
  public isNFTMinted: boolean = false

  // holds the current user's name
  public UserName: string | undefined

  constructor(public NFTser: NFTService, public web3Ser: Web3Service) { }



  /**
   *  This function will be called first when this component gets loaded even before the html template gets rendered
   *  therefore it makes a good function for initializing metamask and the smart contract
   */
  async ngOnInit(): Promise<void> {

    //  refer to this method for details 
    await this.NFTser.checkAndInitMetamaskAndContract()

    // try to populate the username if a user with current metamask exist in the smart contract
    let answer = await this.NFTser.getUserData()

    if(answer["userName"]){

      this.UserName = answer["userName"]
    }
  }

  /**
   * This is a component level function that users the NFT service to mint a new NFT
   */
  public async createNFT() {


      // check if user inputs are not empty
    if (this.inpNFTCat && this.inpNFTtitle && this.inpNFTvalue && this.inpNFTuri) {
      
      try {

        if(this.UserName){

          this.creatorNameInp = this.UserName
        }


        // call the NFT service function mintNewNFT with all the user inputs
        await this.NFTser.mintNewNFT(
          this.inpNFTtitle,
          this.inpNFTCat,
          this.inpNFTvalue,
          this.inpNFTuri,
          this.creatorNameInp
        )

        console.log("New nft created");
        
          // flag used to determine if an NFT was successfully minted
          // it's used to notify the user
        this.isNFTMinted = true

      } catch (error: any) {

        console.log(error.message);
      }



    } else {

      // throw error missing input data

    }


  }


  // reset the flag to false after the user closes the NFT creation modal
  public NFTmintedStatusReset(){

      this.isNFTMinted= false

  }

}



//////////////////////////////////////////NOT USED CODE IGNORE///////////////////////////////////////////////////////////



  // private modal: bootstrap.Modal | undefined

  //@ts-ignore
  // @ViewChild('x', { static: false }) set content(content: ElementRef) {

  //   if (content) {

  //     this.modal = content
  //   }


  // }