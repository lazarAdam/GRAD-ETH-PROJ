import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Web3Service } from './web3.service';


export interface NFTObject {

  NFTid: number
  NFTName: string
  NFTCategory: string
  NFTValue: string | undefined
  NFTuRI: string
  NFTownerName: string
  NFTownerAddress: string
}

@Injectable({
  providedIn: 'root'
})

export class NFTService {


  public isNewUser: boolean = false
  public NFTsList: NFTObject[]

  public UserCreatedEvent: any
  public NFTCreatedEvent: any

  array: NFTObject[] = []

  constructor(private web3Service: Web3Service, private router: Router) {

    this.NFTsList = []


  }

  /**
   * 
   * check if metaMaskUserAccount is defined if so that means initMetamaskAndContract() has been 
   * called before. Hence, no need to call initMetaMaskUser initContract again since the web3Service
   * will have a single instance during the lifecycle of the application. metaMaskUserAccount and NFTMartContract`
   * will be defined even when different  components that are using NFTsertive get reloaded.
   */
  public async checkAndInitMetamaskAndContract() {

    if (!this.web3Service.metaMaskUserAccount) {

      await this.web3Service.initMetaMaskUser()

      await this.web3Service.initContract()

    }
  }


  public async mintNewNFT(title: string, cat: string, value: string, uri: string, creatorName: string | undefined) {

    console.log('sending the request to the blockchain please wait....');


    let result = await this.web3Service.NFTMartContract.methods.createNewNFT(

      title,
      this.web3Service.web3js?.utils.toWei(value, "ether"),
      cat,
      uri,
      creatorName

    ).send(
      { from: this.web3Service.metaMaskUserAccount, gas: "1000000" }

    ).on("receipt", (data: any) => {


      console.log(data);


      this.NFTCreatedEvent = data.events.NewNFTCreated

      console.log(this.NFTCreatedEvent);





    })
      .on("error", (error: any) => {

        console.log(error);

      })






  }

  public async getUserData(userAddress: string = this.web3Service.metaMaskUserAccount) {

    let result = await this.web3Service.NFTMartContract.methods.users(userAddress).call()


    return result


  }


  public async getNFTs() {

    this.NFTsList = []

    await this.checkAndInitMetamaskAndContract()

    let callRes = await this.web3Service.NFTMartContract.methods.getAllNFTs().call()

    let rawNFToBJ: any

    for (rawNFToBJ of callRes) {

      const ownerAddress = await this.getNFTownerAddress(rawNFToBJ["ID"])

      const ownerInfo = await this.getUserData(ownerAddress)



      let NextNFT: NFTObject = {
        NFTid: parseInt(rawNFToBJ["ID"]),
        NFTName: rawNFToBJ["name"],
        NFTValue: this.web3Service.web3js?.utils.fromWei(rawNFToBJ["value"], "ether"),
        NFTCategory: rawNFToBJ["NftCategory"],
        NFTuRI: rawNFToBJ["artFileUrl"],
        NFTownerName: ownerInfo["userName"],
        NFTownerAddress: ownerAddress.toLowerCase()

      }

      this.NFTsList.push(NextNFT)

    }



  }

  public getCurrentUserNFTs(): NFTObject[] {

    const currentUser: string = this.web3Service.metaMaskUserAccount

    let userNFTs: NFTObject[]


    userNFTs = this.NFTsList.filter((nft: NFTObject) => {

      if (nft.NFTownerAddress === currentUser) {

        return true

      } else {
        return false
      }

    })

    return userNFTs

  }

  public getNFTbyId(NFTid: number): NFTObject | undefined {




    return this.NFTsList.find(nft => nft.NFTid === NFTid)

  }

  private async getNFTownerAddress(NFTid: number): Promise<string> {


    let address: string = await this.web3Service.NFTMartContract.methods.NFTOwner(NFTid).call()



    return address

  }


  public async transferNFTtoUser(fromAddress: string | undefined, NFT: NFTObject | undefined) {


    let result = await this.web3Service.NFTMartContract.methods.transferFrom(

      fromAddress,
      this.web3Service.metaMaskUserAccount,
      //@ts-ignore
      NFT.NFTid,

    ).send({
      from: this.web3Service.metaMaskUserAccount,
      //@ts-ignore
      value: this.web3Service.web3js?.utils.toWei(NFT.NFTValue.toString(), "ether")
    }).on("receipt", (data: any) => {


      console.log(data);


    })
      .on("error", (error: any) => {

        console.log(error);

      })

  }

  public async giftToUser(userAddress: string, NFTid: number|undefined) {

    let result = await this.web3Service.NFTMartContract.methods.approve(userAddress, NFTid).send(
      { from: this.web3Service.metaMaskUserAccount }
    )

    console.log(result);
    


  }



}

