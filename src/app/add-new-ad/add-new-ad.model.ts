export class Nekretnina{


    constructor(public id: string, public Adresa: string, public Grad: string, public Drzava:string,
      public GodinaGradnje: number,public Kvadratura: number, public Cena:number, 
      public BrojTelefona: string, public Email:string, public BrojSpratova: number,
      public PovrsinaDvorista:number, public UrlSlike:string,public TypeOfSale: string,public TypeOfProperty: string,
      public CentralnoGrejanje:string, public ParkingMesto:boolean, public Uknjizen:boolean,
      public NamestenStan:boolean, public Opis: string, public userId: string){}
  
    
  }

export class Nekretnina2{

  constructor(public id2:string, public userId2: string, public sacuvano2:boolean){}
}