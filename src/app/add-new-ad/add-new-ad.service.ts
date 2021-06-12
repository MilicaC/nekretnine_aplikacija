import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map,tap, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';


export class Nekretnina{


  constructor(public id: string, public Adresa: string, public Grad: string, public Drzava:string,
    public GodinaGradnje: number,public Kvadratura: number, public Cena:number, 
    public BrojTelefona: string, public Email:string, public BrojSpratova: number,
    public PovrsinaDvorista:number, public UrlSlike:string,public TypeOfSale: string,public TypeOfProperty: string,
    public CentralnoGrejanje:string, public ParkingMesto:boolean, public Uknjizen:boolean,
    public NamestenStan:boolean, public Opis: string, public UserID: string){}

  
}




@Injectable({
  providedIn: 'root'
})
export class AddNewAdService {
nek: Nekretnina[];

  VratiSveNekretnine() {
   
    return  this.http.get<{[key: string]:Nekretnina}>(`https://realestateapp-ddf22-default-rtdb.europe-west1.firebasedatabase.app/add-new-ad.json`)
    


  
  }
  

  constructor(private http:HttpClient, private authService: AuthService) { }




  
  AddNewAd(nek: Nekretnina)
     {
       let generatedId;
       let novaNekr: Nekretnina
       let fetchedUserId: string;
      return this.authService.userId.pipe(
        take(1), 
        switchMap(UserId => {
          fetchedUserId = UserId;
          return this.authService.token;

        }),
        take(1),
        switchMap((token)=> {
          novaNekr = new Nekretnina(nek.id, nek.Adresa, nek.Grad, nek.Drzava, nek.GodinaGradnje,
            nek.Kvadratura, nek.Cena, nek.BrojTelefona, nek.Email, nek.BrojSpratova, nek.PovrsinaDvorista, nek.UrlSlike,
            nek.TypeOfSale,nek.TypeOfProperty, nek.CentralnoGrejanje,nek.ParkingMesto,nek.Uknjizen,
            nek.NamestenStan, nek.Opis, fetchedUserId);
  
            return this.http.post<{name:string}>(`https://realestateapp-ddf22-default-rtdb.europe-west1.firebasedatabase.app/add-new-ad.json?auth=${token}`,novaNekr
            );

        }
        
      ));
     
     
      return this.http.post<{name:string}>(`https://realestateapp-ddf22-default-rtdb.europe-west1.firebasedatabase.app/add-new-ad.json`,
    nek);
  }
}
