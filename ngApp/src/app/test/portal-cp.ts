import {Component} from "@angular/core";


@Component({
  selector: 'app-test',
  templateUrl: './portal-cp.html'
})


export class PortalCp {

  public  userName: string = 'adam'
  public email: string = 'x@x.com'
  public bool: boolean = false

  public list = ['A','B','C']


  public onClickEvt(){


    this.bool = true

  }


  public onchangeEvt(evt:Event){


    this.userName = (<HTMLInputElement>evt.target).value

  }


  public getColor():string{


    return this.bool?'green':'red'
  }
}
