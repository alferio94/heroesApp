import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  termino : string = '';
  heroes : Heroe[] = [];
  heroe !: Heroe;
  constructor( private heroesService :HeroesService) { }

  ngOnInit(): void {
  }
  buscando(){
    this.heroesService.getSuggests(this.termino).subscribe(heroes => this.heroes = heroes)
  }
  opcionSeleccionada(event:MatAutocompleteSelectedEvent){
    const heroe: Heroe = event.option.value;
    if(!heroe){
      this.termino = '';
    }else{
      this.termino = heroe.superhero!;
      this.heroesService.getHeroe(heroe.id!).subscribe(heroe => this.heroe = heroe);
    }
   
  }

}
