import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Nekretnina, Nekretnina2 } from '../add-new-ad/add-new-ad.model';
import { AddNewAdService } from '../add-new-ad/add-new-ad.service';

@Component({
  selector: 'app-saved-ad',
  templateUrl: './saved-ad.page.html',
  styleUrls: ['./saved-ad.page.scss'],
})
export class SavedAdPage implements OnInit {

  nek:Nekretnina[]=[];
  nekPom:Nekretnina[]=[];
  nek2:Nekretnina[]=[];

  nekretnine4: Nekretnina[];
  private nekSub2: Subscription;


  constructor(private AdService: AddNewAdService) { }

ngOnInit(){}

  ionViewWillEnter(){
  

  this.nekSub2 = this.AdService.nekretninePrave2.subscribe((nekretninePrave)=>
      {
            this.nekretnine4 = nekretninePrave;
      }
       );


  // }

}

}

