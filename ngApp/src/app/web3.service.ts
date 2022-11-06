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
  private NFTMartAddress = "0xE9c16cB5Aa700494E5b21BAE7DbdAD448077ff32" // NFTMart address on local node by truffle
  private NFTMartContractABI: any = testABI

  // holds the address of the current metamask user account
  public metaMaskUserAccount: any | undefined
  //@ts-ignore
  public NFTMartContract: Contract



  constructor(private winRef: WindowRef) { }

  /**
   * 
   * This function works as an initializer for the currently active Metamask account
   */
  public async initMetaMaskUser() {

    // initialize Web3.js using MetaMask as a provider by extracting  ethereum object from the window object
    // MetaMask extension will inject an object named ethereum into the window object 
    if (this.ethereumMetaMaskObj) {

      // Use MetaMask's as a provider
      this.web3js = new Web3(this.ethereumMetaMaskObj);

      console.log('MetaMask was found!');

      const accounts = await this.ethereumMetaMaskObj.request({ method: 'eth_requestAccounts' });
      // set the current active account
      this.metaMaskUserAccount = accounts[0];

      console.log(this.metaMaskUserAccount);

    } else {
      // Handle the case where the user doesn't have web3. Probably
      console.log('no metamask was found! please install extension')

    }


  }

  /**
   * Function that initializes the smart contract by passing it to web3.js along with its ABI
   */
  public async initContract() {


    //@ts-ignore
    this.NFTMartContract = new this.web3js.eth.Contract(this.NFTMartContractABI, this.NFTMartAddress)


    console.log('getting data from the blockchain.....');

    let data = await this.NFTMartContract.methods.owner().call()

    console.log(data);
  }





}





