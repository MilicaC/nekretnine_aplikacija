import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {IonList, IonRouterOutlet, LoadingController, ModalController, NavController} from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import {switchMap, take, tap} from 'rxjs/operators';
import { Nekretnina, Nekretnina2 } from '../add-new-ad/add-new-ad.model';
import { AddNewAdService } from '../add-new-ad/add-new-ad.service';
import { AuthService } from '../auth/auth.service';
import {ModalComponent} from './modal/modal.component';
import { ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private _nek = new BehaviorSubject<Nekretnina[]>([]);
  nekretnina: Nekretnina;
  isLoading = false;

  private _nek2 = new BehaviorSubject<Nekretnina2[]>([]);
  nekretnina2: Nekretnina2;

   nek:Nekretnina[]=[];

  @ViewChild('lista') lista: IonList;


  // Simple Variables
  imageURL='assets/stan_plaza.jpg';
  estateName='Atraktivan stan kod Plaze';
  estatePrice='87';
  // Object literar
  advertisement1= {
    imageURL:'assets/stan_plaza.jpg',
    estateName:'Atraktivan stan kod Plaze',
    estatePrice:87
  };
  //array
  loopCounter = [1,2,3,4,5];

  //Array of objects
  advertisementsList = [
    {imageURL:'assets/stan_plaza.jpg',
      estateName:'Novogradnja na Vracaru',
      estatePrice:'87,000 €', id: 1

    },
    {imageURL:'assets/stan_2.jpg',
      estateName:'Atraktivan stan kod Plaze',
      estatePrice:'94,000 €', id: 2},
    {imageURL:'assets/stan_3.jpg',
      estateName:'Stan na Cvetkovoj pijaci',
      estatePrice:'67,000 €',id: 3}
  ];
  fromModal: any;

  constructor(private route: ActivatedRoute,private navCtrl: NavController,private adService:AddNewAdService,private loadingCtrl: LoadingController,private http: HttpClient,private authService: AuthService, private AdService: AddNewAdService, private modalCtrl: ModalController, private routerOutlet: IonRouterOutlet) { }

  get nekretnine() {
    return this._nek.asObservable();
  }


  ngOnInit() {
      this.AdService.nekretnine.subscribe(nekretnineData=>
      {
        this.nek = nekretnineData;
      }
      
      );
   /*   this.route.paramMap.subscribe(paramMap => {
        if (!paramMap.has('quoteId')) {
          // ako koristimo router, nece biti dobra back animacija,
          // iako svakako i on koristi angular router, samo podesava da se vidi dobra animacija
          this.navCtrl.navigateBack('/home');
          return;
        }
  
        this.isLoading = true;
  
        this.adService
          .getNekretnina(paramMap.get('quoteId'))
          .subscribe((nekretnina) => {
            this.nekretnina= this.nekretnina;
            this.isLoading = false;
          });
      });
*/
   
  
 


  

  }




 /* openModal() {
    this.modalCtrl
      .create({
        component: ModalComponent,
        componentProps: {title: 'Add quote'}
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      }).then((resultData) => {
      if (resultData.role === 'confirm') {
        console.log(resultData);

        //let {author, text} = resultData.data.quoteData;

        this.addService.addQuote(resultData.data.quoteData.author, resultData.data.quoteData.text).subscribe((quotes) => {
          // this.quotes = quotes;
        });@Input() adresa: string;
  @Input() cena: number;
  @Input() godinagradnje: number;
  @Input() brojtelefona: string;
  @Input() email:string;
  @Input() sifra:string;
      }
    });
  }*/

   otvoriModal(nekret: Nekretnina){
    this.modalCtrl
      .create({
        component: ModalComponent,
        componentProps: {cena: nekret.Cena, brojtelefona: nekret.BrojTelefona, email: nekret.Email},
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })

/*
   id,
        Adresa,
        Grad,
        Drzava,
        GodinaGradnje, Kvadratura, Cena, BrojTelefona, Email,
        BrojSpratova, PovrsinaDvorista, UrlSlike, TypeOfSale, TypeOfProperty,
        CentralnoGrejanje, ParkingMesto, Uknjizen, NamestenStan, Opis,
        userId
*/
      .then((resultData) => {
        if (resultData.role === 'confirm') {
          this.loadingCtrl
            .create({message: 'Editing...'})
            .then((loadingEl) => {
              loadingEl.present();
              this.adService
                .editNekretnina(
                  nekret.id,nekret.Adresa,nekret.Grad,nekret.Drzava,nekret.GodinaGradnje,nekret.Kvadratura,
                  resultData.data.nekretninaData.Cena,
                  resultData.data.nekretninaData.BrojTelefona,resultData.data.nekretninaData.Email,
                  nekret.BrojSpratova,nekret.PovrsinaDvorista,nekret.UrlSlike,nekret.TypeOfSale,
                  nekret.TypeOfProperty, nekret.CentralnoGrejanje,
                  nekret.ParkingMesto, nekret.Uknjizen, nekret.NamestenStan, nekret.Opis,
                  nekret.userId
                )
                .subscribe((nekretnine) => {
                     nekret.Cena= resultData.data.nekretninaData.Cena;
                  nekret.BrojTelefona = resultData.data.nekretninaData.BrojTelefona;
                  nekret.Email = resultData.data.nekretninaData.Email;

                  loadingEl.dismiss();
                });
            });
        }
      });
  }





 
  onDeleteNekr(idd: string) {
      this.loadingCtrl.create({message: 'Deleting...'}).then(loadingEl => {
      loadingEl.present();
      this.adService.deleteNekr(idd).subscribe(() => {
        //ovde ne prepoznaje id !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        loadingEl.dismiss();
       // this.navCtrl.navigateBack('/profile');
      });
    });
  }


  
 /* onEdit(){
     this.modalCtrl
      .create({
        component: ModalComponent,
        componentProps: {title: 'Edit quote', cena: this.nekretnina.Cena},
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((resultData) => {
        if (resultData.role === 'confirm') {
          this.loadingCtrl
            .create({message: 'Editing...'})
            .then((loadingEl) => {
              loadingEl.present();
              this.adService
                .editNekretnina(
                  this.nekretnina.id,
                  resultData.data.nekretnineData.cena,
                /*  resultData.data.quoteData.text,
                  this.nekretnina.imageUrl,
                  this.nekretnina.userId*/
             /*   )
                .subscribe((nekretnine) => {
                  this.nekretnina.Cena = resultData.data.nekretnineData.Cena;
              //    this.nekretnina.author = resultData.data.quoteData.author;
                  loadingEl.dismiss();
                });
            });
        }
      });
  }*/

  }


