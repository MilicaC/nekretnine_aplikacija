import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { RealEstate } from './real-estate';
interface RealEstateData{
  address:string,
  imageUrl:string,
  price:number,
  description:string
}

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.scss'],
})
export class RealEstateComponent implements OnInit {

  
  @Input() realEstate: RealEstate =  {address:"adresa",price:20000,imageUrl:'https://www.mentorrent.rs/sr/wp-content/uploads/2020/06/Dedinje-house-with-swimming-pool-for-rent-10.jpg' ,description:'111'}

  constructor(private http: HttpClient) {

   }

  ngOnInit() {}

  addRealEstate(address:string,imageUrl:string,price:number,description:string)
  {
      return this.http.post<{name:string}>(`https://realestateapp-ddf22-default-rtdb.europe-west1.firebasedatabase.app/real-estate.json`,
      {address,imageUrl,price,description});
  }
   
  getRealEstate(){
      return this.http.get<{[key:string]:RealEstateData}>(`https://realestateapp-ddf22-default-rtdb.europe-west1.firebasedatabase.app/real-estate.json`);
  }

}
