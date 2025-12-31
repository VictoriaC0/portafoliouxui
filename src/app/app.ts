import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollService } from './core/services/scroll.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('portafoliouxui-angular');

  // Inject ScrollService to ensure it initializes on app start
  private scrollService = inject(ScrollService);

  ngOnInit(): void {
    // ScrollService will initialize scroll listeners in its constructor
  }
}
