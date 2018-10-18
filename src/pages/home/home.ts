import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ANIMES } from '../../data/data.animes';
import { Anime} from "../../interfaces/anime.interface";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animes:  Anime[]=[];
  audio = new Audio();
  timpoDuracion: any;
  constructor(public navCtrl: NavController) {
      this.animes = ANIMES.slice(0);
  }

  ReproducirAudio( anime ){

    console.log( anime.nombre );
    this.pausar_audio( anime );

    if (anime.reproduciendo){
      anime.reproduciendo = false;
      return;
    }

    this.audio.src = anime.audio;
    this.audio.load();
    this.audio.play();
    anime.reproduciendo = true;

    this.timpoDuracion=setTimeout(()=> anime.reproduciendo = false, anime.duracion *1000 );


  }

  private pausar_audio(paus: Anime){

    clearTimeout( this.timpoDuracion );
    this.audio.pause();
    this.audio.currentTime = 0;

    for ( let anime of this.animes) {
      if (anime.nombre != paus.nombre)
        anime.reproduciendo = false;
    }

  }

  eliminar_item( i:number ){
    this.animes.splice(i, 1);
  }

  doRefresh( refresh:any ){

    setTimeout(()=> {
      this.animes = ANIMES.slice(0);
      refresh.complete();
    },2000);


  }

}
