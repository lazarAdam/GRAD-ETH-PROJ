import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root'
})
export class NFTService {

  constructor(private web3Service: Web3Service) {


    
   }




   public async BuyNFT (){

    return this.web3Service.NFTMartContract.methods.NFTList.call()

   }


   public async getNFTs (){

    

   }


   public async checkForUserAccount (){



  }
}
