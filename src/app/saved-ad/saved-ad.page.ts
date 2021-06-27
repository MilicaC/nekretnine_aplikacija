import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
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


  constructor(private AdService: AddNewAdService, private router: Router, private nav: NavController) { }

ngOnInit(){}

  ionViewWillEnter(){
  

  this.nekSub2 = this.AdService.nekretninePrave2.subscribe((nekretninePrave)=>
      {
            this.nekretnine4 = nekretninePrave;
      }
       );


  // }

}

izbrisiNekS(nek: Nekretnina){
  //this.loadingCtrl.create({message: 'Deleting...'}).then(loadingEl => {
    //loadingEl.present();
    this.AdService.deleteNekrS(nek).subscribe(() => {
      //ovde ne prepoznaje id !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     // loadingEl.dismiss();
      this.router.navigateByUrl('/home');
    });
 // });
}






}

