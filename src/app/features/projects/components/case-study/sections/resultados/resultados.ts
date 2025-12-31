import { Component, input } from '@angular/core';

@Component({
  selector: 'app-resultados',
  imports: [],
  templateUrl: './resultados.html',
  styleUrl: './resultados.scss',
})
export class Resultados {
  caseData = input.required<any>();
}
