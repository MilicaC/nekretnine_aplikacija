import { Component, OnInit } from '@angular/core';

import { RealEstate } from '../real-estate/real-estate';




@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  realEstates: RealEstate[]=
  [{address: 'Dedinje',price:20000,imageUrl:'https://www.mentorrent.rs/sr/wp-content/uploads/2020/06/Dedinje-house-with-swimming-pool-for-rent-10.jpg' ,description:'111'},
     {address: 'Nbg',price:30000,imageUrl:'https://img.halooglasi.com/slike/oglasi/Thumbs/200617/m/novi-beograd---blok-63-sun-city-72m2-garaza-u-5425635688751-71791721558.jpg',description:'222' },
     {address: 'Dedinje',price:20000,imageUrl:'https://www.mentorrent.rs/sr/wp-content/uploads/2020/06/Dedinje-house-with-swimming-pool-for-rent-10.jpg' ,description:'111'}];

   
  constructor() { }

  ngOnInit() {
  }

}
