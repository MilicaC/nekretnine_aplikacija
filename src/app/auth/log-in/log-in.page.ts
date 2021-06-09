import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {FormControl, FormGroup, NgForm, NgModel} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
//import { Autor } from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  isSignedIn = false;
  loginForm: FormGroup;

 


  constructor(private authService: AuthService, private router: Router,private http: HttpClient) { }

  ngOnInit() {
   // this.loginForm = new FormGroup({
     // Email: new FormControl(),
      //Lozinka: new FormControl(),
     
    //});
  }
     
   /* if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
    } else {
    }
    this.isSignedIn = false;*/
  //}
  
 /* async login(form: NgForm, email: string, password: string) {
    await this.authService.signin(email,password);
    if(this.authService.isLoggedIn) {
      this.isSignedIn = true;
    }
  }*/
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Register(){
    this.router.navigateByUrl('/register');
  }

  login(loginForm: NgForm) {
    //this.isLoading = true;
    
    console.log(loginForm);
    if(loginForm.valid){
    this.authService.logIn(loginForm.value).subscribe(resData=>{
      console.log('prijava uspesna');
      console.log(resData);
     // this.isLoading = false;
      this.router.navigateByUrl('/home');
    });
  }

  }


}
