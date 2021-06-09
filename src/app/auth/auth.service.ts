import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { NgForm } from '@angular/forms';

interface AuthResponseData{
kind: string;
idToken: string;
email: string;
refreshToken:string;
locald: string;
expiresIn: string;
registered?: boolean;


}

interface UserData{
  Ime?: string,
     Prezime?: string,
     Email: string,
     Lozinka: string,
     Ponovilozinku?: string
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
 

  logIn(user: UserData){
    // eslint-disable-next-line no-underscore-dangle
    this._isUserAuthenticated = true;
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey2}`,
    {email: user.Email, password:user.Lozinka, returnSecureToken: true});


  }


  addAuthor(user: UserData){
    this._isUserAuthenticated = true;
     if(user.Ponovilozinku==user.Lozinka){
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey2}`,
      {ime: user.Ime, prezime: user.Prezime, email: user.Email, password:user.Lozinka, password2:user.Ponovilozinku,
      returnSecureToken: true});
    
    }
    else console.log("Neuspela registracija")
  }


}
