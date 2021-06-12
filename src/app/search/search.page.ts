import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AddNewAdService, Nekretnina } from '../add-new-ad/add-new-ad.service';
import { ModalController } from '@ionic/angular';

import { FilterModalComponent } from './filter-modal/filter-modal.component';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  nek:Nekretnina[]=[];
  nekPom:Nekretnina[]=[];
  nek2:Nekretnina[]=[];
  

    
 

  constructor(private AdService: AddNewAdService,private http: HttpClient, public ModalCtrl:ModalController) { }
  



  async  OtvoriFilter(){
    const modal = await this.ModalCtrl.create({
      component: FilterModalComponent,
      cssClass: 'my-custom-class'
    });
     await modal.present();
     
    return modal.onDidDismiss().then((resData)=>{ 
     
      if(resData.role==='cancel'){
        this.AdService.VratiSveNekretnine().subscribe(nekrentineData=>
          {console.log(nekrentineData);
          console.log('ucitano');
         const nekretnine:Nekretnina[]=[];
                
        for(const key in nekrentineData){
           if(nekrentineData.hasOwnProperty(key)){
             nekretnine.push({
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
        this.nekPom=nekretnine;
        this.nek=nekretnine;
        }
       
        );
  
    
          this.nekPom=this.nek;
        return resData;
      }
      if(resData.role==='confirm'){
        if(resData.data.CenaOd==="")
        resData.data.CenaOd=0;
        
        if(resData.data.CenaDo===""){
          resData.data.CenaDo=999999999;
        }
        if(resData.data.KvadraturaDo==="")
        resData.data.KvadraturaDo=999999999;
        if(resData.data.KvadraturaOd==="")
        resData.data.KvadraturaOd=0;

        if(resData.data.Namesten==="")
        resData.data.Namesten=true;
        if(resData.data.Uknjizen==="")
        resData.data.Uknjizen=true;
        if(resData.data.ParkingMesto==="")
        resData.data.ParkingMesto=true;
        if(resData.data.CentralnoGrejanje==="")
        resData.data.CentralnoGrejanje=true;

        
        if(resData.data.IznajmljivanjeNaDanCheck==="")
        resData.data.IznajmljivanjeNaDanCheck=true;
        if(resData.data.IznajmljivanjeNaMesecCheck==="")
        resData.data.IznajmljivanjeNaMesecCheck=true;
        if(resData.data.ProdajaCheck==="")
        resData.data.ProdajaCheck=true;


        if(resData.data.StanCheck==="")
        resData.data.StanCheck=true;
        if(resData.data.KucaCheck==="")
        resData.data.KucaCheck=true;
        
      console.log(resData);

   
        this.AdService.VratiSveNekretnine().subscribe(nekrentineData=>
          {
                
            
        for(const key in nekrentineData){
          
           if(nekrentineData.hasOwnProperty(key)){
             if(nekrentineData[key].Cena>=resData.data.CenaOd && nekrentineData[key].Cena<=resData.data.CenaDo &&
              nekrentineData[key].Kvadratura>=resData.data.KvadraturaOd &&nekrentineData[key].Kvadratura<=resData.data.KvadraturaDo  ){


              if((nekrentineData[key].TypeOfProperty==="House" && resData.data.KucaCheck===true) || 
              (nekrentineData[key].TypeOfProperty==="Apartment" && resData.data.StanCheck===true))
              { 
                if((nekrentineData[key].TypeOfSale==="Sale" && resData.data.ProdajaCheck===true)||
                (nekrentineData[key].TypeOfSale==="Issuance per month" && resData.data.IznajmljivanjeNaMesecCheck===true) ||
                (nekrentineData[key].TypeOfSale==="Issuance per day" && resData.data.IznajmljivanjeNaDanCheck===true)){
                {
             this.nek2.push({
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
        }
        }
      }
        }
       
         
          this.nek=[];
          this.nek=this.nek2;
          this.nekPom=this.nek;
          this.nek2=[];
        }
        
        );
    
    
    
    
      }
     
    
    })
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
