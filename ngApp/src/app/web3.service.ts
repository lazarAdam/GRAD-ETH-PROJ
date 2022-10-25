import { Injectable } from '@angular/core';
import { testABI } from "./abi/test-abi";
import Web3 from 'web3';
import { Contract } from "web3-eth-contract"
import { WindowRef } from './window-ref.service';

@Injectable({
  providedIn: 'root'
})



export class Web3Service {

  // assign the injected ethereum object from web3.js in the window using WindowRef service
  private ethereumMetaMaskObj = this.winRef.nativeWindow.ethereum
  // holds the instance of Web3
  public web3js: Web3 | undefined

  // private contractAddress = "0x3659F9997c3929d4c60211a83E99fdB5A0333f9E" // NewContract deployed to Goerli using Infura
  private NFTMartAddress = "0x8224c74F71D032CbefC138cD33B5B1B40d050912" // NFTMart address on local node by truffle
  private NFTMartContractABI: any = testABI

  public metaMaskUserAccount: any | undefined
  //@ts-ignore
  public NFTMartContract: Contract



  constructor(private winRef: WindowRef) { }


  public async initMetaMaskUser() {



    // initialize Web3.js using MetaMask as a provider by extracting  ethereum object from the window object
    // MetaMask extension will inject an object named ethereum into the window object 
    if (this.ethereumMetaMaskObj) {

      // Use MetaMask's as a provider
      this.web3js = new Web3(this.ethereumMetaMaskObj);

      console.log('MetaMask was found!');

      const accounts = await this.ethereumMetaMaskObj.request({ method: 'eth_requestAccounts' });

      this.metaMaskUserAccount = accounts[0];

      console.log(this.metaMaskUserAccount);

    } else {
      // Handle the case where the user doesn't have web3. Probably
      console.log('no metamask was found! please install extension')

    }


  }

  public async initContract() {




    //@ts-ignore
    this.NFTMartContract = new this.web3js.eth.Contract(this.NFTMartContractABI, this.NFTMartAddress)



    // register event handler

    // this.testContract.events.etherEvent()

    // .on("data",(evtData:any)=>this.ethEvtHandler(evtData))

    // .on("error",(error:any)=>console.log(error)
    // )

    console.log('getting data from the blockchain.....');

    let data = await this.NFTMartContract.methods.owner().call()

    console.log(data);
  }





}





