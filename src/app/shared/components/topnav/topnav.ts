import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavigationService } from '../../../core/services/navigation.service';
import { ResponsiveService } from '../../../core/services/responsive.service';

interface NavSection {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-topnav',
  imports: [CommonModule],
  templateUrl: './topnav.html',
  styleUrl: './topnav.scss',
})
export class Topnav {
  private navigationService = inject(NavigationService);
  private responsiveService = inject(ResponsiveService);
  private router = inject(Router);

  isMobile$ = this.responsiveService.isDesktop$.pipe(map(isDesktop => !isDesktop));
  currentSection$ = this.navigationService.currentSection$;

  isMenuOpen = signal(false);

  sections$: Observable<NavSection[]> = this.navigationService.sections$.pipe(
    map(sections => this.mapToNavSections(sections))
  );

  isProjectPage$ = this.navigationService.sections$.pipe(
    map(sections => sections.includes('resumen') || sections.includes('proceso'))
  );

  toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
  }

  navigateToSection(sectionId: string): void {
    this.navigationService.navigateToSection(sectionId);
    this.isMenuOpen.set(false); // Close menu after navigation
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
    this.isMenuOpen.set(false); // Close menu after navigation
  }

  private mapToNavSections(sections: string[]): NavSection[] {
    const iconMap: Record<string, string> = {
      'inicio': 'house',
      'casos': 'briefcase',
      'acerca': 'user',
      'contacto': 'envelope',
      'resumen': 'file-text',
      'proceso': 'graph',
      'solucion': 'lightbulb',
      'resultados': 'chart-line'
    };

    const labelMap: Record<string, string> = {
      'inicio': 'Inicio',
      'casos': 'Casos',
      'acerca': 'Acerca',
      'contacto': 'Contacto',
      'resumen': 'Resumen',
      'proceso': 'Proceso',
      'solucion': 'Solución',
      'resultados': 'Resultados'
    };

    return sections.map(id => ({
      id,
      label: labelMap[id] || id,
      icon: iconMap[id] || 'circle'
    }));
  }
}
