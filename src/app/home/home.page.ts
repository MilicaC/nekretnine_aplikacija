import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Nekretnina, Nekretnina2 } from '../add-new-ad/add-new-ad.model';
import { AddNewAdService} from '../add-new-ad/add-new-ad.service';






@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  nekretnine:Nekretnina[]
  nekretnine2:Nekretnina2[]


  constructor(private AdService: AddNewAdService,private http: HttpClient) { }

  reloadCurrentPage() {
    window.location.reload();
   } 
  ngOnInit() {
      

  }
// i ovuda je nesto cackala u 5.6
ionViewWillEnter(){
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
        userId:nekrentineData[key].userId //
        
       });
     }


  }
  this.nekretnine=nekretnine;
 
  }
 
 );
}

sacuvajBtn(nekret: Nekretnina){
  console.log(nekret);
  console.log("nkjdsd");
   

}


}
