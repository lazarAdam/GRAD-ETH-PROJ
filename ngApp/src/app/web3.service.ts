import { Injectable } from '@angular/core';
import { testABI} from "./abi/test-abi";
import { testABI2} from "./abi/test-abi-2";
import Web3 from 'web3';
import { Contract } from "web3-eth-contract"

import { WindowRef } from './window-ref.service';



declare global {
  interface Window {
    x: any;
  }
}

@Injectable({
  providedIn: 'root'
})



export class Web3Service {

  private ethereumMetaMaskObj = this.winRef.nativeWindow.ethereum

  private web3js: Web3 | undefined


  // private contractAddress = "0x2C1d007186a98c4d93916f64ee15094B4FfF09f4" // testContract
  private contractAddress = "0x62c107928c4ba250c92b0422ec23b7911b6d615c" // testContract2
  private contractABI: any = testABI
  private contractABI2: any = testABI2
  // public NFTMartContract:Contract

  //@ts-ignore
  private testContract: Contract

  public metaMaskUserAccount: any


  constructor(private winRef: WindowRef) {

    // initialize Web3.js using MetaMask as a provider by extracting  ethereum object from the window object
    // MetaMask extension will inject an object named ethereum into the window object 
    if (this.ethereumMetaMaskObj) {

      // Use MetaMask's as a provider
      this.web3js = new Web3(this.ethereumMetaMaskObj);

      console.log('MetaMask was found!');

      this.initMetaMaskUser().then(()=>{

        this.initContract()
      })



    } else {
      // Handle the case where the user doesn't have web3. Probably
      console.log('no metamask was found! please install extension')

    }

  }


  private async initMetaMaskUser() {

    const accounts = await this.ethereumMetaMaskObj.request({ method: 'eth_requestAccounts' });

    this.metaMaskUserAccount = accounts[0];

    console.log(this.metaMaskUserAccount);

  }

  private async initContract() {

    //@ts-ignore
    this.testContract = new this.web3js.eth.Contract(testABI2, this.contractAddress)



    // register event handler

    this.testContract.events.etherEvent()

    .on("data",(evtData:any)=>this.ethEvtHandler(evtData))

    .on("error",(error:any)=>console.log(error)
    )



    console.log('getting data from the blockchain.....');

    let data = await this.testContract.methods.list(0).call()
    // let data = await this.testContract.methods.returnStruct().call()

    console.log(data);


    // await this.SendTransaction()


  }


  public async SendTransaction() {


   
    console.log('sending data to the blockchain.....');

    await this.testContract.methods.addToArray().send({ from: this.metaMaskUserAccount })

      .on("receipt", (data: any) => {


        console.log(data);


      })
      .on("error", (error: any) => {

        console.log(error);

      })
  }




  private async ethEvtHandler(data:any){


    console.log(data.returnValues);
    


  }



}





