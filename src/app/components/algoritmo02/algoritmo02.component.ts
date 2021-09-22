import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-algoritmo02',
  templateUrl: './algoritmo02.component.html',
  styleUrls: ['./algoritmo02.component.css']
})
export class Algoritmo02Component implements OnInit {

  public yyyy = new Date().getFullYear();
  resultData: any = [];

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    try {
      let unica: any = [];
      let unicaCount = 0;
      this.resultData = [];
      let lecturaData = ((document.getElementById("lectura") as HTMLInputElement).value);
      //toLowerCase
      lecturaData = lecturaData.toLowerCase();
      lecturaData = lecturaData.replace(/[{",.:;-_—"'”“}]/g, '');
      //Reemplazamos los saltos de linea por espacios
      lecturaData = lecturaData.replace(/\r?\n/g, " ");
      //Reemplazamos los espacios seguidos por uno solo
      lecturaData = lecturaData.replace(/[ ]+/g, " ");
      //Quitarmos los espacios del principio y del final
      lecturaData = lecturaData.replace(/^ /, "");
      lecturaData = lecturaData.replace(/ $/, "");
      // Convierte entrada de datos en Array
      let lecturaArray = lecturaData.split(' ');
      let busquedaArray = lecturaArray;
      // Obtiene palabras unicas 
      for (let indexA = 0; indexA < busquedaArray.length; indexA++) {
        const resultado = unica.some((palabra: any) => palabra === busquedaArray[indexA]);
        if (!(resultado)) {
          unica.push(busquedaArray[indexA]);
        }
      }
      // Proceso y resultados
      for (let indexB = 0; indexB < unica.length; indexB++) {
        for (let indexC = 0; indexC < lecturaArray.length; indexC++) {
          if (unica[indexB] == lecturaArray[indexC]) {
             unicaCount = unicaCount + 1;
          }
        }
        this.resultData.push(`{${unica[indexB].toUpperCase()}: ${unicaCount}}`);
        unicaCount = 0;
      }
      //
      this.toastr.success('Hola, excelente.', 'Aviso de Yaydoo FrontEnd', {
        timeOut: 10000,
        positionClass: 'toast-bottom-right'
      });
    } catch (e) {
      this.toastr.error('Hola, creo que algo salio mal. ', 'Aviso de Yaydoo FrontEnd', {
        timeOut: 10000,
        positionClass: 'toast-bottom-right'
      })
      console.log('Error respose: ', e)
    }
  }

}
