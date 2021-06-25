import { Component, OnInit } from '@angular/core';
import { Nekretnina, Nekretnina2 } from '../add-new-ad/add-new-ad.model';
import { AddNewAdService } from '../add-new-ad/add-new-ad.service';

@Component({
  selector: 'app-saved-ad',
  templateUrl: './saved-ad.page.html',
  styleUrls: ['./saved-ad.page.scss'],
})
export class SavedAdPage implements OnInit {

  nek:Nekretnina2[]=[];
  nekPom:Nekretnina[]=[];
  nek2:Nekretnina[]=[];


  constructor(private AdService: AddNewAdService) { }

  ngOnInit() {
    this.AdService.nekretnine2.subscribe(nekrentineData=>
      {
        
        this.nek = nekrentineData;
      }
    );


  }

}
