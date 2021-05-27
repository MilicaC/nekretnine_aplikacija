import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { NgForm } from '@angular/forms';
export interface Author{
  Ime: string,
     Prezime: string,
     Email: string,
     Lozinka: string,
     Ponovilozinku: string
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  _isUserAuthenticated = false;
  firebaseAuth: any;

  constructor(private http:HttpClient) { }
 /* async signup(email: string, password: string) {

  }*/
  get isUserAuthenticates(): boolean{
    // eslint-disable-next-line no-underscore-dangle
    return this._isUserAuthenticated;
  }
  register(){
  }

  logIn(){
    // eslint-disable-next-line no-underscore-dangle
    this._isUserAuthenticated = true;
  }
  logOut(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }


  addAuthor(Ime:string,Prezime:string,Email:string,Lozinka:string,PonovnaLozinka:string){
     if(PonovnaLozinka==Lozinka){
    return this.http.post<{name:string}>(`https://realestateapp-ddf22-default-rtdb.europe-west1.firebasedatabase.app/auth.json`,
    {Ime,Prezime,Email,Lozinka,PonovnaLozinka});
    
    }
    else console.log("Neuspela registracija")
  }


}
