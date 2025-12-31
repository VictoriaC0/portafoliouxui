import { Component, input } from '@angular/core';

@Component({
  selector: 'app-proceso',
  imports: [],
  templateUrl: './proceso.html',
  styleUrl: './proceso.scss',
})
export class Proceso {
  caseData = input.required<any>();
}
