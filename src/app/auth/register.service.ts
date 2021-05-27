import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  addAuthor(Ime:string,Prezime:string,Email:string,Lozinka:string,PonovnaLozinka:string){

    return this.http.post<{name:string}>(`https://realestateapp-ddf22-default-rtdb.europe-west1.firebasedatabase.app/auth.json`,
    {Ime,Prezime,Email,Lozinka,PonovnaLozinka});
  }
}
