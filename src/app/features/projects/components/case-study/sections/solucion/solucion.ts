import { Component, input } from '@angular/core';

@Component({
  selector: 'app-solucion',
  imports: [],
  templateUrl: './solucion.html',
  styleUrl: './solucion.scss',
})
export class Solucion {
  caseData = input.required<any>();
}
