import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface Nekretnina{
  id:string,
  Adresa: string,
  Grad: string,
  Drzava: string,
  GodinaGradnje: number,
  Kvadratura: number,
  Cena: number,
  BrojTelefona: string,
  Email: string,
  BrojSpratova: number,
  PovrsinaDvorista: number,
  UrlSlike: string,
  TypeOfSale:string,
  TypeOfProperty:string,
  CentralnoGrejanje:string,
  ParkingMesto:boolean,
  Uknjizen:boolean,
  NamestenStan:boolean,
  Opis:string
}

@Injectable({
  providedIn: 'root'
})
export class AddNewAdService {
  VratiSveNekretnine() {
   
    return  this.http.get<{[key: string]:Nekretnina}>(`https://realestateapp-ddf22-default-rtdb.europe-west1.firebasedatabase.app/add-new-ad.json`)
  
  }
  

  constructor(private http:HttpClient) { }



  
  AddNewAd(nek: Nekretnina)
     {
    
      return this.http.post<{name:string}>(`https://realestateapp-ddf22-default-rtdb.europe-west1.firebasedatabase.app/add-new-ad.json`,
    nek);
  }
}
