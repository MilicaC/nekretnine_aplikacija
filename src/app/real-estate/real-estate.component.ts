import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonRouterOutlet, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Nekretnina, Nekretnina2 } from '../add-new-ad/add-new-ad.model';
import { AddNewAdService } from '../add-new-ad/add-new-ad.service';
import { AuthService } from '../auth/auth.service';
import { ModalComponent } from '../profile/modal/modal.component';
import { RealEstateModalComponent } from './real-estate-modal/real-estate-modal.component';


@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.scss'],
})
export class RealEstateComponent implements OnInit {

 
  
  @Input() nekretnine: Nekretnina =  {Adresa:"adresa",Cena:20000,UrlSlike:'https://www.mentorrent.rs/sr/wp-content/uploads/2020/06/Dedinje-house-with-swimming-pool-for-rent-10.jpg' ,
                              Opis:'111', id:'',Grad: 'string',Drzava: 'string',GodinaGradnje: 1,Kvadratura: 1,BrojTelefona: 'string',
                              Email: 'string',BrojSpratova: 2, PovrsinaDvorista: 2, TypeOfSale:'string',TypeOfProperty:'string',
                              CentralnoGrejanje:'string',ParkingMesto:true,Uknjizen:true, NamestenStan:true,  userId:null}

  constructor(private route: ActivatedRoute,private navCtrl: NavController,private adService:AddNewAdService,private loadingCtrl: LoadingController,private http: HttpClient,private authService: AuthService, private AdService: AddNewAdService, private modalCtrl: ModalController, private routerOutlet: IonRouterOutlet) { }
   
  nizNekretnina: Nekretnina[];

  ngOnInit() {
    this.AdService.vratiSveNekretnine2().subscribe(nekrentineData=>
      {
     
        this.nizNekretnina = nekrentineData;

      });

  }

  sacuvaj(nekretnine:Nekretnina){


  }
/*  */

 

  change(Sacuvano){
    if(Sacuvano == true){
        console.log("ne treba");
    }else{
      console.log("treba");
    }
  }

  naPromenu(form: NgForm, nek:Nekretnina){
   /*  if(form.value.Sacuvano == true){
       console.log("treba dodati u sacuvane");
       this.AdService.dodajUSacuvane(nek.userId).subscribe(resData=>
        {console.log("Uspesno uneto");
      console.log(resData);
      
        
    });
     }else{
       console.log("treba izbaciti iz sacuvanih");
     }*/
    
  }


  async otvoriModalZaDetalje(nekret: Nekretnina){
    const modal = await this.modalCtrl.create({
      component: RealEstateModalComponent,
      componentProps: {ulica: nekret.Adresa, cena: nekret.Cena, godinagradnje:nekret.GodinaGradnje,
        brojtelefona:nekret.BrojTelefona, email:nekret.Email, sifra:nekret.id, grad: nekret.Grad,
        drzava: nekret.Drzava, povrsina: nekret.Kvadratura, centgrejanje:nekret.CentralnoGrejanje,
        parking:nekret.ParkingMesto, uknjizeno:nekret.Uknjizen, namestenstan:nekret.NamestenStan,
        vrstanekretnine:nekret.TypeOfProperty, nacinizdavanja: nekret.TypeOfSale, brojspratova: nekret.BrojSpratova,
        dvoriste:nekret.PovrsinaDvorista, slika:nekret.UrlSlike, opis:nekret.Opis
      }
    });
    await modal.present();

 

  }


  sacuvajBtn(nek: Nekretnina){
  
    if(this.daLiPostoji(nek,this.nizNekretnina)===false){

    this.adService.sacuvajMojuNekretninu(nek).subscribe(resData=>{
      console.log("uspesno uneto");
      this.nizNekretnina.push(nek);

    })
    }else{
      console.log("nije unet");
    }
  }





  daLiPostoji(nek2:Nekretnina,niz: Nekretnina[]):boolean{
    let id1:string;
    
    console.log(niz);

   for(const key in niz){
      

      if(nek2.Adresa === niz[key].Adresa && nek2.BrojTelefona === niz[key].BrojTelefona ) {

        console.log('userNekretnine= ',nek2.userId,'User iz niza',niz[key].userId )
        
        return true;
      }
   }


   return false;
   
  }
  


  izbaciBtn(nek: Nekretnina){
    this.adService.izbaciIzSacuvanih(nek).subscribe(() => {
      console.log("uspesno izbrisano");
      //console.log(resData);
    })
  }


  // this.AdService.AddNewAd(this.AddREForm.value).subscribe(resData=>
  //   {console.log("Uspesno uneto");
  // console.log(resData);
  // this.router.navigateByUrl('/home');



}