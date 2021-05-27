import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';


import {AuthService} from '../auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

   registerForm: FormGroup;
  constructor(private authService: AuthService,private http: HttpClient) { }

  ngOnInit() {
    this.registerForm= new FormGroup({
      Ime: new FormControl('name'),
      Prezime: new  FormControl(null),
      Email: new FormControl(null),
      Lozinka: new FormControl(null),
      Ponovilozinku: new FormControl(null)
    });
  }
    
 
   addAuthor(){
      if( this.registerForm.value['Lozinka']== this.registerForm.value['Ponovilozinku']){
      this.authService.addAuthor(this.registerForm.value['Ime'],
      this.registerForm.value['Prezime'],
      this.registerForm.value['Email'],
      this.registerForm.value['Lozinka'],
      this.registerForm.value['Ponovilozinku']).subscribe(res=>console.log(res));
      }
      else console.log("Neuspela registracija")
   
}
  register() {
      // @ts-ignore
    this.authService.register().subscribe(resData => {
        console.log('Registracija uspela');
        console.log(resData);
      });
  }


}
