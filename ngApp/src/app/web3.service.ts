import { Injectable } from '@angular/core';
import { testABI} from "./abi/test-abi";
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
  // private contractAddress = "0x8224c74F71D032CbefC138cD33B5B1B40d050912" // testContract2
  private contractAddress = "0x3659F9997c3929d4c60211a83E99fdB5A0333f9E" // NewContract deployed to Goerli using Infura 

  private contractABI: any = testABI

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
    this.testContract = new this.web3js.eth.Contract(testABI, this.contractAddress)



    // register event handler

    // this.testContract.events.etherEvent()

    // .on("data",(evtData:any)=>this.ethEvtHandler(evtData))

    // .on("error",(error:any)=>console.log(error)
    // )



    console.log('getting data from the blockchain.....');

    let data = await this.testContract.methods.owner().call()

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





