import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NFTObject, NFTService } from '../nft.service';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-nft-display',
  templateUrl: './nft-display.component.html',
})
export class NftDisplayComponent implements OnInit {

  constructor(
    public NFTser: NFTService, public web3Ser: Web3Service, private router: Router, private route: ActivatedRoute
  ) { }

  public viwOnlyUserNFTs = false;

  public userOnlyNFTs: NFTObject[] = []


  async ngOnInit(): Promise<void> {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false

    this.viwOnlyUserNFTs = this.route.snapshot.queryParams['userOnly']

    await this.NFTser.getNFTs()

    if (this.viwOnlyUserNFTs) {

      this.userOnlyNFTs = this.NFTser.getCurrentUserNFTs();

    }



  }

}
