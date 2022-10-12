import { Injectable } from '@angular/core';

import Web3 from 'web3';
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

  private web3js:Web3|undefined

  private contractAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"
  private contractABI:any
  public NFTMartContract:any

  public metaMaskUserAccount:any
 

  constructor( private winRef: WindowRef) {

    // initialize Web3.js using MetaMask as a provider by extracting  ethereum object from the window object
    // MetaMask extension will inject an object named ethereum into the window object 
    if (this.ethereumMetaMaskObj) {

      // Use MetaMask's as a provider
      this.web3js = new Web3(this.ethereumMetaMaskObj);
      
      console.log('MetaMask was found!');

      this.initMetaMaskUser()

        // this.initContract()

    } else {
      // Handle the case where the user doesn't have web3. Probably
      console.log('no metamask was found! please install extension')
 
    }

   }


   private async initMetaMaskUser(){

    const accounts = await this.ethereumMetaMaskObj.request({ method: 'eth_requestAccounts' });
    this.metaMaskUserAccount = accounts[0];
    console.log(this.metaMaskUserAccount);
    
    }

   private initContract(){

    //@ts-ignore
    this.NFTMartContract = this.web3js?.eth.Contract(contractABI,this.contractAddress)

   }




    
  }





