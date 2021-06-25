import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-real-estate-modal',
  templateUrl: './real-estate-modal.component.html',
  styleUrls: ['./real-estate-modal.component.scss'],
})
export class RealEstateModalComponent implements OnInit {
  @Input() ulica: string;
  @Input() cena: number;
  @Input() godinagradnje: number;
  @Input() brojtelefona: string;
  @Input() email:string;
  @Input() sifra:string;
  @Input() grad:string;
  @Input() drzava:string;
  @Input() povrsina:number;
  @Input() centgrejanje:string;
  @Input() parking:boolean;
  @Input() uknjizeno:boolean;
  @Input() namestenstan:boolean;
  @Input() vrstanekretnine:string;
  @Input() nacinizdavanja:string;
  @Input() brojspratova: number;
  @Input() dvoriste:number;
  @Input() slika: string;
  @Input() opis:string;
  
 

/*
 componentProps: {ulica: nekret.Adresa, cena: nekret.Cena, godinagradnje:nekret.GodinaGradnje,
        brojtelefona:nekret.BrojTelefona, email:nekret.Email, sifra:nekret.id, grad: nekret.Grad,
        drzava: nekret.Drzava, povrsina: nekret.Kvadratura, centgrejanje:nekret.CentralnoGrejanje,
        parking:nekret.ParkingMesto, uknjizeno:nekret.Uknjizen, namestenstan:nekret.NamestenStan,
        vrstanekretnine:nekret.TypeOfProperty, nacinizdavanja: nekret.TypeOfSale, brojspratova: nekret.BrojSpratova,
        dvoriste:nekret.PovrsinaDvorista, slika:nekret.UrlSlike, opis:nekret.Opis
      }


*/



  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}




dismissModal(){
  this.modalCtrl.dismiss();
}

}