import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AddNewAdService, Nekretnina } from '../add-new-ad/add-new-ad.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  nek:Nekretnina[]=[];
  nekPom:Nekretnina[]=[];

 

    
 

  constructor(private AdService: AddNewAdService,private http: HttpClient,public actionSheetController: ActionSheetController) { }
  

   async presentActionSheet() {
      const actionSheet = await this.actionSheetController.create({
        header: 'Albums',
        cssClass: 'my-custom-class',
        buttons: [{
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Delete clicked');
          }
        }, {
          text: 'Share',
          icon: 'share',
          handler: () => {
            console.log('Share clicked');
          }
        }, {
          text: 'Play (open modal)',
          icon: 'caret-forward-circle',
          handler: () => {
            console.log('Play clicked');
          }
        }, {
          text: 'Favorite',
          icon: 'heart',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
  
      const { role } = await actionSheet.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    }
  
  







  _ionChange(event){
    
    console.log(event.detail.value);
    
    const val=event.target.value;
    if(val && val.trim()!=''){
      this.nek=this.nekPom.filter((item:any)=>{
        return ((item.Adresa.toLowerCase().indexOf(val.toLowerCase())>-1)||
        (item.Grad.toLowerCase().indexOf(val.toLowerCase())>-1));
      })
    }
    
   if(val.trim()==='' ){
      this.nek=this.nekPom;
   }

  }
  ngOnInit() {
    this.AdService.VratiSveNekretnine().subscribe(nekrentineData=>
      {
  
            
    for(const key in nekrentineData){
       if(nekrentineData.hasOwnProperty(key)){
         this.nek.push({
          id:key,
          Adresa:nekrentineData[key].Adresa,
          Grad: nekrentineData[key].Grad,
          Drzava: nekrentineData[key].Drzava,
          GodinaGradnje: nekrentineData[key].GodinaGradnje,
          Kvadratura: nekrentineData[key].Kvadratura,
          Cena: nekrentineData[key].Cena,
          BrojTelefona: nekrentineData[key].BrojTelefona,
          Email: nekrentineData[key].Email,
          BrojSpratova: nekrentineData[key].BrojSpratova,
          PovrsinaDvorista: nekrentineData[key].PovrsinaDvorista,
          UrlSlike: nekrentineData[key].UrlSlike,
          TypeOfSale:nekrentineData[key].TypeOfSale,
          TypeOfProperty:nekrentineData[key].TypeOfProperty,
          CentralnoGrejanje:nekrentineData[key].CentralnoGrejanje,
          ParkingMesto:nekrentineData[key].ParkingMesto,
          Uknjizen:nekrentineData[key].Uknjizen,
          NamestenStan:nekrentineData[key].NamestenStan,
          Opis:nekrentineData[key].Opis,
          UserID:nekrentineData[key].UserID
          
         });
       }


    }
   
      this.nekPom=this.nek;
    }
    
    );

}
}
