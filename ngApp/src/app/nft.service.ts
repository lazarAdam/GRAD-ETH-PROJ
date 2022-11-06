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


/**
 * This services includes all the function needed to make calls to the smart contract also stores the data comes back
 * form the smart contracts and have it available to all the components that uses this service.
 */
export class NFTService {


  public isNewUser: boolean = false // boolean that gets sets based if a user new or existing
  public NFTsList: NFTObject[] // hold the NFT list returned  from the smart contract

  public UserCreatedEvent: any // holds contract event data 
  public NFTCreatedEvent: any // holds  contract event data 

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

  /**
   * A function that sends a transaction to the smart contract for minting new NFT  
   * @param title 
   * @param cat 
   * @param value 
   * @param uri 
   * @param creatorName 
   */
  public async mintNewNFT(title: string, cat: string, value: string, uri: string, creatorName: string | undefined) {

    console.log('sending the request to the blockchain please wait....');


    let result = await this.web3Service.NFTMartContract.methods.createNewNFT(

      title,
      // converting eth to Wei since the smart contract expects wei
      this.web3Service.web3js?.utils.toWei(value, "ether"),  
      cat,
      uri,
      creatorName
      // sign and send the transaction using metamask
    ).send(
      { from: this.web3Service.metaMaskUserAccount }


       // react to the data returned form the smart contract 
    ).on("receipt", (data: any) => {

     
      console.log(data);

      // get and set the data from the emitted event NewNFTCreated
      this.NFTCreatedEvent = data.events.NewNFTCreated

      
    })

     // react to the error returned form the smart contract 
      .on("error", (error: any) => {

        console.log(error);

      })

  }
  /**
   *  function to get the user data from the smart contract
   * @param userAddress 
   * @returns an object containing  data about the target user 
   */

  public async getUserData(userAddress: string = this.web3Service.metaMaskUserAccount) {
    
    // getting the user data object from users mapping using account address as a key
    let result = await this.web3Service.NFTMartContract.methods.users(userAddress).call()


    return result


  }

  /**
   *  Function to request  the NFT array containing all the NFTs in the smart contract storage
   */
  public async getNFTs() {

    this.NFTsList = []

    await this.checkAndInitMetamaskAndContract()

    // get the nft array from the smart contract 
    let callRes = await this.web3Service.NFTMartContract.methods.getAllNFTs().call()

    // the raw returned object from the smart contract 
    let rawNFToBJ: any

    // loop over the raw object which contains an object for each NFT
    for (rawNFToBJ of callRes) {

      // get the address of the owner from the smart contract by calling getNFTownerAddress
      const ownerAddress = await this.getNFTownerAddress(rawNFToBJ["ID"])

      // get the user data 
      const ownerInfo = await this.getUserData(ownerAddress)


      // build an javascript object of type NFTObject which represent the owner and the NFT data in one object
      let NextNFT: NFTObject = {
        NFTid: parseInt(rawNFToBJ["ID"]),
        NFTName: rawNFToBJ["name"],
        NFTValue: this.web3Service.web3js?.utils.fromWei(rawNFToBJ["value"], "ether"),
        NFTCategory: rawNFToBJ["NftCategory"],
        NFTuRI: rawNFToBJ["artFileUrl"],
        NFTownerName: ownerInfo["userName"],
        NFTownerAddress: ownerAddress.toLowerCase()

      }

      // add the NFTObject  to the js array NFTsList
      this.NFTsList.push(NextNFT)

    }



  }

  /**
   * This function ruses the locally populated NFTsList to filter only the current user's  NFT's
   * @returns 
   */

  public getCurrentUserNFTs(): NFTObject[] {

    // get the current user address using metamask
    const currentUser: string = this.web3Service.metaMaskUserAccount

    let userNFTs: NFTObject[]

    // created a filtered list of the NFT objects that have an address that matches with the current user's address
    userNFTs = this.NFTsList.filter((nft: NFTObject) => {

      if (nft.NFTownerAddress === currentUser) {

        return true

      } else {
        return false
      }

    })

    return userNFTs

  }

  /**
   * function that returns an NFT object form the locally populated NFT list
   * This function is useful when a user view details about an NFT and after getNFTs() got called once before
   * @param NFTid 
   * @returns  NFTObject | undefined
   */

  public getNFTbyId(NFTid: number): NFTObject | undefined {


    return this.NFTsList.find(nft => nft.NFTid === NFTid)

  }

  /**
   * This function gets the NFT owner's address from the smart contract
   * @param NFTid 
   * @returns Promise<string>
   */

  private async getNFTownerAddress(NFTid: number): Promise<string> {


    let address: string = await this.web3Service.NFTMartContract.methods.NFTOwner(NFTid).call()



    return address

  }

  /**
   * This function performs the operations needed to transfer an NFT from one account to another
   * @param fromAddress 
   * @param NFT 
   */
  public async transferNFTtoUser(fromAddress: string | undefined, NFT: NFTObject | undefined) {

    //  calling transferFrom method from the smart contract
    let result = await this.web3Service.NFTMartContract.methods.transferFrom(

      fromAddress,// owner's address
      this.web3Service.metaMaskUserAccount,// buyer's address
      //@ts-ignore
      NFT.NFTid,

    ).send({
      from: this.web3Service.metaMaskUserAccount,
      //@ts-ignore
      // including the value of the NFT the user would like to buy
      value: this.web3Service.web3js?.utils.toWei(NFT.NFTValue.toString(), "ether")
    }).on("receipt", (data: any) => {


      console.log(data);


    })
      .on("error", (error: any) => {

        console.log(error);

      })

  }

  /**
   * 
   * @param userAddress 
   * @param NFTid 
   */
  // public async giftToUser(userAddress: string, NFTid: number|undefined) {

  //   let result = await this.web3Service.NFTMartContract.methods.approve(userAddress, NFTid).send(
  //     { from: this.web3Service.metaMaskUserAccount }
  //   )

  //   console.log(result);
    


  // }



}

