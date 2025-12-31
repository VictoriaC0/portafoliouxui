import { DOCUMENT } from '@angular/common';
import { Component, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';
import { NavigationArrows } from '../../../shared/components/navigation-arrows/navigation-arrows';
import { SidebarNav } from '../../../shared/components/sidebar-nav/sidebar-nav';
import { Topnav } from '../../../shared/components/topnav/topnav';
import { Acerca } from '../sections/acerca/acerca';
import { Casos } from '../sections/casos/casos';
import { Contacto } from '../sections/contacto/contacto';
import { Inicio } from '../sections/inicio/inicio';

@Component({
  selector: 'app-home',
  imports: [Topnav, SidebarNav, NavigationArrows, Inicio, Casos, Acerca, Contacto],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, OnDestroy {
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  ngOnInit(): void {
    // Add index-page class to body for horizontal scroll styles
    this.renderer.addClass(this.document.body, 'index-page');
  }

  ngOnDestroy(): void {
    // Remove index-page class when leaving
    this.renderer.removeClass(this.document.body, 'index-page');
  }
}
