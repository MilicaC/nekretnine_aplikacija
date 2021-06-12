import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { take, map,tap, switchMap, catchError } from 'rxjs/operators';
import { User } from './user.model';

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
  private _user = new BehaviorSubject<User>(null);

  constructor(private http:HttpClient) { }
 /* async signup(email: string, password: string) {

  }*/
  get isUserAuthenticates(){
    // eslint-disable-next-line no-underscore-dangle
    return this._user.asObservable().pipe(
      map((user:User)=>{
        if(user){
          return !!user.token;
        }else{
          return false;
        }
      })
    );
  }

  get userId(){
    return this._user.asObservable().pipe(
      map((user:User)=>{
        if(user){
          return user.id;
        }else{
          return null;
        }
      })
    );
  }

  get token() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      })
    );
  }


 

  logIn(user: UserData){
    // eslint-disable-next-line no-underscore-dangle
    this._isUserAuthenticated = true;
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey2}`,
    {email: user.Email, password:user.Lozinka, returnSecureToken: true})
    .pipe(
      tap((UserData: AuthResponseData)=>{
        const expirationTime = new Date(new Date().getTime() + +UserData.expiresIn * 1000);
        const user = new User(UserData.locald, UserData.email, UserData.idToken, expirationTime);
        this._user.next(user);
      })
      
    );


  }

  




  addAuthor(user: UserData){
    this._isUserAuthenticated = true;
     if(user.Ponovilozinku==user.Lozinka){
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey2}`,
      {ime: user.Ime, prezime: user.Prezime, email: user.Email, password:user.Lozinka, password2:user.Ponovilozinku,
      returnSecureToken: true})
      .pipe(
        tap((UserData: AuthResponseData)=>{
          const expirationTime = new Date(new Date().getTime() + +UserData.expiresIn * 1000);
          const user = new User(UserData.locald, UserData.email, UserData.idToken, expirationTime);
          this._user.next(user);
        })
        
      );
    
    }
    else console.log("Neuspela registracija")
  }

  logOut() {
    this._user.next(null);
  }



}


