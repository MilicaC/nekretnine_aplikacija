import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import {FormBuilder} from '@angular/forms';

import {AuthService} from '../auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

 



   registerForm: FormGroup;

  





  constructor(private authService: AuthService,private http: HttpClient, private router: Router,
    private loadingCtrl: LoadingController, public toastCtrl: ToastController) { }

  ngOnInit() {
    this.registerForm= new FormGroup({
     // Ime: new FormControl(null),
      // ovde je imalo validatora u svakom redu
      //Prezime: new  FormControl(null),
      //Email: new FormControl(null),
      //Lozinka: new FormControl(null),
      //Ponovilozinku: new FormControl(null)
       Ime: new FormControl(null, Validators.required),
      Prezime: new FormControl(null, Validators.required),
      Email: new FormControl(null, [Validators.required, Validators.email]),
      Lozinka: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      Ponovilozinku: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
    
  }
    
 
   async addAuthor(){
     if(this.registerForm.get('Ime').invalid || this.registerForm.get('Prezime').invalid || this.registerForm.get('Email').invalid ||
     this.registerForm.get('Lozinka').invalid || this.registerForm.get('Ponovilozinku').invalid ){
       const toast= this.toastCtrl.create({
         message: "Moraju biti popunjena sva polja.",
         duration: 3000
       });
       (await toast).present();
       this.registerForm.reset();
      }else if(this.registerForm.get('Lozinka') != this.registerForm.get('Ponovilozinku')){
        const toast= this.toastCtrl.create({
          message: "Ne poklapaju se unete lozinke.",
          duration: 3000
        });
        (await toast).present();
        this.registerForm.reset();
      }
     else{
       this.loadingCtrl.create({message: "Registering..."}).then((loadingEl:HTMLIonLoadingElement)=>{
     loadingEl.present();
        this.authService.addAuthor(this.registerForm.value).subscribe(resData=>{
          console.log('Registracija je uspela');
          console.log(resData);
          loadingEl.dismiss();
          this.registerForm.reset();
          this.router.navigateByUrl('/log-in');
        
        });
      
          

        });
      
      }
}

// ova metoda izgleda ne radi nista
  register() {
      // @ts-ignore
    this.authService.register().subscribe(resData => {
        console.log('Registracija uspela');
        console.log(resData);
      });
  }


}
