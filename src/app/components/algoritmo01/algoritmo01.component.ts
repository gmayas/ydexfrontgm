import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-algoritmo01',
  templateUrl: './algoritmo01.component.html',
  styleUrls: ['./algoritmo01.component.css']
})
export class Algoritmo01Component implements OnInit {

  public yyyy = new Date().getFullYear();
  aliceArray: any;
  bobArray: any;
  resultData: any = "[ , ]";
  
  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    try {
      let valRangoAlice = false;
      let valRangoBob = false;
      let puntosAlice = 0;
      let puntosBob = 0;
      this.resultData = "[ , ]";
      // Convierte entrada de datos en Array
      let aliceData = `[${((document.getElementById("alice") as HTMLInputElement).value)}]`;
      let bobData = `[${((document.getElementById("bob") as HTMLInputElement).value)}]`;
      this.aliceArray = JSON.parse(aliceData);
      this.bobArray = JSON.parse(bobData);
      // Verifica que que sean iguales en elementos
      if (this.aliceArray.length !== this.bobArray.length) {
        this.toastr.warning('Hola, Allce y Bob deben tener la misma cantidad de elementos. ', 'Aviso de Yaydoo FrontEnd', {
          timeOut: 10000,
          positionClass: 'toast-bottom-right'
        });
        return; };
      // Verifica que Alice este entre 1 y 100  
      this.aliceArray.map((value: any) => {
          if (!(value >= 1 && value <= 100)){
            this.toastr.warning('Hola, Los valores de Alice deben de estar entre 1 y 100.. ', 'Aviso de Yaydoo FrontEnd', {
              timeOut: 10000,
              positionClass: 'toast-bottom-right'
            });
            valRangoAlice = true;
            return; 
          }
        });
      if (valRangoAlice) return;
      // Verifica que Bob este entre 1 y 100  
      this.bobArray.map((value: any) => {
        if (!(value >= 1 && value <= 100)){
          this.toastr.warning('Hola, Los valores de Bob deben de estar entre 1 y 100.. ', 'Aviso de Yaydoo FrontEnd', {
            timeOut: 10000,
            positionClass: 'toast-bottom-right'
          });
          valRangoBob = true;
          return; 
        }
      });
     if (valRangoBob) return;
     // Proceso y resultados 
     for (let index = 0; index < this.aliceArray.length; index++) {
      // Se ejecuta N veces, segun this.aliceArray.length
      if (this.aliceArray[index] > this.bobArray[index]) {
        puntosAlice = puntosAlice +1;
      } else if (this.aliceArray[index] < this.bobArray[index]) {
        puntosBob = puntosBob + 1;
      } else if (this.aliceArray[index] == this.bobArray[index]) {
        this.toastr.info(`Hola, Alice [${index}] y Bob [${index}] no reciben puntos.`, 'Aviso de Yaydoo FrontEnd', {
          timeOut: 10000,
          positionClass: 'toast-bottom-right'
        });   
      }
    }
    this.resultData =`[${puntosAlice}, ${puntosBob}]`;
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
