import { HttpClient } from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map,tap, switchMap} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Nekretnina, Nekretnina2 } from './add-new-ad.model';




interface NekretninaData {
  Adresa: string;
  Grad: string;
   Drzava: string;
  GodinaGradnje: number;
  Kvadratura:number;
  Cena:number;
  BrojTelefona:string;
  Email:string;
  BrojSpratova:number;
  PovrsinaDvorista:number;
  UrlSlike:string;
  TypeOfSale:string;
  TypeOfProperty:string;
  CentralnoGrejanje:string;
  ParkingMesto:boolean;
  Uknjizen:boolean;
  NamestenStan:boolean;
  Opis:string;
  userId: string;


}
      
  


@Injectable({
  providedIn: 'root'
})
export class AddNewAdService {



  




private _nek = new BehaviorSubject<Nekretnina[]>([]);
private _nek2 = new BehaviorSubject<Nekretnina2[]>([]);



  VratiSveNekretnine() {
   
    return  this.http.get<{[key: string]:NekretninaData}>(`https://realestateapp-ddf22-default-rtdb.europe-west1.firebasedatabase.app/add-new-ad.json`)
    
       .pipe(
      map((NekretninasData) => {
        const nek: Nekretnina[] = [];
        for(const key in NekretninasData){
          if(NekretninasData.hasOwnProperty(key)){
               nek.push(new Nekretnina(key,
             NekretninasData[key].Adresa,
             NekretninasData[key].Grad,
             NekretninasData[key].Drzava,
             NekretninasData[key].GodinaGradnje,
             NekretninasData[key].Kvadratura,
             NekretninasData[key].Cena,
             NekretninasData[key].BrojTelefona,
              NekretninasData[key].Email,
              NekretninasData[key].BrojSpratova,
             NekretninasData[key].PovrsinaDvorista,
              NekretninasData[key].UrlSlike,
             NekretninasData[key].TypeOfSale,
             NekretninasData[key].TypeOfProperty,
             NekretninasData[key].CentralnoGrejanje,
             NekretninasData[key].ParkingMesto,
             NekretninasData[key].Uknjizen,
             NekretninasData[key].NamestenStan,
             NekretninasData[key].Opis,
             NekretninasData[key].userId));
             
            //});
          }
        }
        return nek;
      }),
      tap(nek => {
        this._nek.next(nek);
      })
    );


  
  }
  

  constructor(private http:HttpClient, private authService: AuthService) { }

  get nekretnine() {
     return this._nek.asObservable();
  }

 izbaciIzSacuvanih(nek: Nekretnina){
   console.log("Uslo u izbaci iz sacuvanih");
  return this.authService.userId.pipe(
    take(1),
    switchMap((userId) => {
      return this.http.delete(
        `https://realestateapp-ddf22-default-rtdb.europe-west1.firebasedatabase.app/save-ad/${nek.id}`
      );
    }),
    switchMap(() => {
      return this.nekretnine;
    }),
    take(1),
    tap((nekretnine) => {
      this._nek.next(nekretnine.filter((q) => q.id !== nek.id));
    })
  );
 }


  sacuvajMojuNekretninu(nek: Nekretnina) {
    console.log("ulazi u metodu");
    console.log(nek);
    let generatedId;
  let novaNekr: Nekretnina;
  let fetchedUserId: string;
  console.log("ispred prvog return-a");
  return this.authService.userId.pipe(
    take(1),
    switchMap(userId => {
      fetchedUserId = userId;
      console.log(userId);
      novaNekr = new Nekretnina(
        null, nek.Adresa, nek.Grad, nek.Drzava, nek.GodinaGradnje,
            nek.Kvadratura, nek.Cena, nek.BrojTelefona, nek.Email, nek.BrojSpratova, nek.PovrsinaDvorista, nek.UrlSlike,
            nek.TypeOfSale,nek.TypeOfProperty, nek.CentralnoGrejanje,nek.ParkingMesto,nek.Uknjizen,
            nek.NamestenStan, nek.Opis, fetchedUserId
            //mozda je ovde bila greska sve vreme sto nisam imala nek.
      );
      console.log(novaNekr);
      return this.http.post<{ name: string }>(
        `https://realestateapp-ddf22-default-rtdb.europe-west1.firebasedatabase.app/save-ad.json`, novaNekr);
    }),
    take(1),
    switchMap((resData) => {
      generatedId = resData.name;
      return this.nekretnine;
    }),
    take(1),
    tap((nekretnine) => {
      novaNekr.id = generatedId;
      this._nek.next(nekretnine.concat(novaNekr));
    })
  );



}


  get nekretninePrave(){
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
         fetchedUserId = userId;
        return this.http
          .get<{ [key: string]: NekretninaData }>(
            `https://realestateapp-ddf22-default-rtdb.europe-west1.firebasedatabase.app/add-new-ad.json`
          );
      }),
      map((nekrentineData: any) => {
        const nekretninee: Nekretnina[] = [];
        for (const key in nekrentineData ) {
          if (nekrentineData.hasOwnProperty(key) && (nekrentineData[key].userId === fetchedUserId) ) {
            //ovde je bila greska jer je na mesto imgUrl setovan userId
            nekretninee.push(new Nekretnina(key,
              nekrentineData[key].Adresa,
              nekrentineData[key].Grad,
              nekrentineData[key].Drzava,
              nekrentineData[key].GodinaGradnje,
              nekrentineData[key].Kvadratura,
               nekrentineData[key].Cena,
              nekrentineData[key].BrojTelefona,
              nekrentineData[key].Email,
              nekrentineData[key].BrojSpratova,
              nekrentineData[key].PovrsinaDvorista,
              nekrentineData[key].UrlSlike,
              nekrentineData[key].TypeOfSale,
              nekrentineData[key].TypeOfProperty,
              nekrentineData[key].CentralnoGrejanje,
              nekrentineData[key].ParkingMesto,
              nekrentineData[key].Uknjizen,
              nekrentineData[key].NamestenStan,
              nekrentineData[key].Opis,
              nekrentineData[key].userId)
            );
          }
        }
        
        console.log(nekretninee);

        return nekretninee;
      }),
      tap(nekretninee => {
        this._nek.next(nekretninee);
      })
    );
  }


  get nekretninePrave2(){
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
         fetchedUserId = userId;
        return this.http
          .get<{ [key: string]: NekretninaData }>(
            `https://realestateapp-ddf22-default-rtdb.europe-west1.firebasedatabase.app/save-ad.json`
          );
      }),
      map((nekrentineData: any) => {
        const nekretninee: Nekretnina[] = [];
        for (const key in nekrentineData ) {
          if (nekrentineData.hasOwnProperty(key) && (nekrentineData[key].userId === fetchedUserId) ) {
            //ovde je bila greska jer je na mesto imgUrl setovan userId
            nekretninee.push(new Nekretnina(key,
              nekrentineData[key].Adresa,
              nekrentineData[key].Grad,
              nekrentineData[key].Drzava,
              nekrentineData[key].GodinaGradnje,
              nekrentineData[key].Kvadratura,
               nekrentineData[key].Cena,
              nekrentineData[key].BrojTelefona,
              nekrentineData[key].Email,
              nekrentineData[key].BrojSpratova,
              nekrentineData[key].PovrsinaDvorista,
              nekrentineData[key].UrlSlike,
              nekrentineData[key].TypeOfSale,
              nekrentineData[key].TypeOfProperty,
              nekrentineData[key].CentralnoGrejanje,
              nekrentineData[key].ParkingMesto,
              nekrentineData[key].Uknjizen,
              nekrentineData[key].NamestenStan,
              nekrentineData[key].Opis,
              nekrentineData[key].userId)
            );
          }
        }
        
        console.log(nekretninee);

        return nekretninee;
      }),
      tap(nekretninee => {
        this._nek.next(nekretninee);
      })
    );
  }




get nekretnine2(){
  return this._nek2.asObservable();
}



  
  AddNewAd(nek: Nekretnina)
     {
      
  
  let generatedId;
  let novaNekr: Nekretnina;
  let fetchedUserId: string;

  return this.authService.userId.pipe(
    take(1),
    switchMap(userId => {
      fetchedUserId = userId;
      console.log(userId);
      novaNekr = new Nekretnina(
        null, nek.Adresa, nek.Grad, nek.Drzava, nek.GodinaGradnje,
            nek.Kvadratura, nek.Cena, nek.BrojTelefona, nek.Email, nek.BrojSpratova, nek.PovrsinaDvorista, nek.UrlSlike,
            nek.TypeOfSale,nek.TypeOfProperty, nek.CentralnoGrejanje,nek.ParkingMesto,nek.Uknjizen,
            nek.NamestenStan, nek.Opis, fetchedUserId
            //mozda je ovde bila greska sve vreme sto nisam imala nek.
      );
      console.log(novaNekr);
      return this.http.post<{ name: string }>(
        `https://realestateapp-ddf22-default-rtdb.europe-west1.firebasedatabase.app/add-new-ad.json`, novaNekr);
    }),
    take(1),
    switchMap((resData) => {
      generatedId = resData.name;
      return this.nekretnine;
    }),
    take(1),
    tap((nekretnine) => {
      novaNekr.id = generatedId;
      this._nek.next(nekretnine.concat(novaNekr));
    })
  );


      }

      getNekretnina(id: string) {
        return this.authService.token.pipe(
          take(1),
          switchMap((token) => {
            return this.http.get<NekretninaData>(
              `https://realestateapp-ddf22-default-rtdb.europe-west1.firebasedatabase.app/add-new-ad${id}.json?auth=${token}`
            );
          }),
          map((resData: NekretninaData) => {
            return new Nekretnina(
              id,
              resData.Adresa,
              resData.Grad,
              resData.Drzava,resData.GodinaGradnje, resData.Kvadratura,resData.Cena,
              resData.BrojTelefona, resData.Email, resData.BrojSpratova,resData.PovrsinaDvorista,
              resData.UrlSlike,resData.TypeOfSale, resData.TypeOfProperty,resData.CentralnoGrejanje,
              resData.ParkingMesto, resData.Uknjizen, resData.NamestenStan, resData.Opis, resData.userId);
              
          })
        );
      }

      deleteNekr(id: string) {
        return this.authService.token.pipe(
          take(1),
          switchMap((token) => {
            return this.http.delete(
              `https://realestateapp-ddf22-default-rtdb.europe-west1.firebasedatabase.app/add-new-ad/${id}.json?auth=${token}`
            );
          }),
          switchMap(() => {
            return this.nekretnine;
          }),
          take(1),
          tap((nekretnine) => {
            this._nek.next(nekretnine.filter((q) => q.id !== id));
          })
        );
      }



      editNekretnina(
        id: string,
        Adresa: string,
        Grad: string,
        Drzava: string,
        GodinaGradnje: number, Kvadratura:number, Cena: number, BrojTelefona: string, Email:string,
        BrojSpratova:number, PovrsinaDvorista:number, UrlSlike:string, TypeOfSale:string, TypeOfProperty:string,
        CentralnoGrejanje:string, ParkingMesto:boolean, Uknjizen:boolean, NamestenStan:boolean, Opis:string,
        userId:string
      ) {
        return this.authService.token.pipe(
          take(1),
          switchMap((token) => {
            return this.http.put(
              `https://realestateapp-ddf22-default-rtdb.europe-west1.firebasedatabase.app/add-new-ad/${id}.json?auth=${token}`,
              {
                Adresa, Grad, Drzava, GodinaGradnje, Kvadratura,Cena,BrojTelefona,
                Email,BrojSpratova, PovrsinaDvorista,UrlSlike,TypeOfSale, TypeOfProperty,
                CentralnoGrejanje,ParkingMesto, Uknjizen, NamestenStan, Opis,
                userId,
              }
            );
          }),
          switchMap(() => {
            return this.nekretnine;
          }),
          take(1),
          tap((nekretnine) => {
            const updatedNekretninaIndex = nekretnine.findIndex((q) => q.id === id);
            const updatedNekretnine = [...nekretnine];
            updatedNekretnine[updatedNekretninaIndex] = new Nekretnina(
              id,
        Adresa,
        Grad,
        Drzava,
        GodinaGradnje, Kvadratura, Cena, BrojTelefona, Email,
        BrojSpratova, PovrsinaDvorista, UrlSlike, TypeOfSale, TypeOfProperty,
        CentralnoGrejanje, ParkingMesto, Uknjizen, NamestenStan, Opis,
        userId
            );
            this._nek.next(updatedNekretnine);
          })
        ); 
      }


dodajUSacuvane(idUsera:string){
  let generatedId;
  let novaNekr2: Nekretnina2;

  return this.authService.userId.pipe(
    take(1),
    switchMap(userId => {
      console.log(userId);
      novaNekr2 = new Nekretnina2(
        null, idUsera, true
      );
      console.log(novaNekr2);
      return this.http.post<{ name: string }>(
        `https://realestateapp-ddf22-default-rtdb.europe-west1.firebasedatabase.app/save-ad.json`, novaNekr2);
    }),
    take(1),
    switchMap((resData) => {
      generatedId = resData.name;
      return this.nekretnine2;
    }),
    take(1),
    tap((nekretnine2) => {
      novaNekr2.id2 = generatedId;
       this._nek2.next(nekretnine2.concat(novaNekr2));
     console.log(novaNekr2);
    })
  );

}

    

    }