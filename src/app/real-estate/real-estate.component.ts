import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Nekretnina } from '../add-new-ad/add-new-ad.service';


@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.scss'],
})
export class RealEstateComponent implements OnInit {

  
  @Input() nekretnine: Nekretnina =  {Adresa:"adresa",Cena:20000,UrlSlike:'https://www.mentorrent.rs/sr/wp-content/uploads/2020/06/Dedinje-house-with-swimming-pool-for-rent-10.jpg' ,
                              Opis:'111', id:'',Grad: 'string',Drzava: 'string',GodinaGradnje: 1,Kvadratura: 1,BrojTelefona: 'string',
                              Email: 'string',BrojSpratova: 2, PovrsinaDvorista: 2, TypeOfSale:'string',TypeOfProperty:'string',
                              CentralnoGrejanje:'string',ParkingMesto:true,Uknjizen:true, NamestenStan:true, UserID:null}

  constructor(private http: HttpClient) {

   }

  ngOnInit() {}


}
