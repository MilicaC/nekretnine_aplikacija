import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel } from '@angular/forms';
import { Router} from '@angular/router';
import { AddNewAdService, Nekretnina } from './add-new-ad.service';
import { ToastController} from '@ionic/angular'




@Component({
  selector: 'app-add-new-ad',
  templateUrl: './add-new-ad.page.html',
  styleUrls: ['./add-new-ad.page.scss'],
})
export class AddNewAdPage implements OnInit {
  AddREForm:FormGroup;
  constructor(private AdService:AddNewAdService ,private http: HttpClient,public toastCtrl: ToastController,private router:Router) { }
  nek:Nekretnina;
  
  
  
  ngOnInit() {
    this.AddREForm= new FormGroup({
    
   
      Adresa: new  FormControl(null),
      Grad: new FormControl(null),
      Drzava: new FormControl(null),
      GodinaGradnje: new FormControl(null),
      Kvadratura: new FormControl(null),
      Cena: new  FormControl(null),
      BrojTelefona: new FormControl(null),
      Email: new FormControl(null),
      BrojSpratova: new FormControl(1),
      PovrsinaDvorista: new FormControl(null),
      UrlSlike: new FormControl(null),
      CentralnoGrejanje:new FormControl(false),
      ParkingMesto:new FormControl(false),
      Uknjizeno:new FormControl(false),
      SredjenStan:new FormControl(false),
      TypeOfSale:new FormControl("Sale"),
      TypeOfProperty:new FormControl("House"),
      Opis:new FormControl(null),
      UserID: new FormControl(null) //

    })
  }




  async addNewAd(){

     if(this.AddREForm.get('Adresa').valid && this.AddREForm.get('Grad').valid && this.AddREForm.get('Drzava').valid )
     {
        if(this.AddREForm.get('Kvadratura').valid ){
          if(this.AddREForm.get('Cena').valid ){
            if(this.AddREForm.get('BrojTelefona').valid){
            if(this.AddREForm.value.UrlSlike==null || this.AddREForm.get('UrlSlike').invalid){
              this.AddREForm.value.UrlSlike="https://icon-library.com/images/house-icon-free/house-icon-free-18.jpg";
            }
            
    this.AdService.AddNewAd(this.AddREForm.value).subscribe(resData=>
      {console.log("Uspesno uneto");
    console.log(resData);
    this.router.navigateByUrl('/home');
      
  });

            }
            else{
              const toast= this.toastCtrl.create({
                message:"Nije unet broj telefona",
                duration:3000,
                color: 'danger'
              });
              (await toast).present();


              return;
            }
          }
          else{  const toast= this.toastCtrl.create({
            message:"Nije uneta cena",
            duration:3000,
            color: 'danger'
          });
          (await toast).present();
            return;
          }
        }
        else{  const toast= this.toastCtrl.create({
          message:"Nije uneta kvadratura",
          duration:3000,
          color: 'danger'
        });
        (await toast).present();
          return;
        };

    }
    else{  const toast= this.toastCtrl.create({
      message:"Nisu lepo uneti podaci o adresi",
      duration:3000,
      color: 'danger'
    });
    (await toast).present();
 
   
 
}
  }
}
