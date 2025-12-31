import { Component, input } from '@angular/core';

@Component({
  selector: 'app-resumen',
  imports: [],
  templateUrl: './resumen.html',
  styleUrl: './resumen.scss',
})
export class Resumen {
  caseData = input.required<any>();
}
