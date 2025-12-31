import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
  selector: 'app-sidebar-nav',
  imports: [CommonModule],
  templateUrl: './sidebar-nav.html',
  styleUrl: './sidebar-nav.scss',
})
export class SidebarNav {
  private navigationService = inject(NavigationService);
  private responsiveService = inject(ResponsiveService);

  isDesktop$ = this.responsiveService.isDesktop$;
  currentSection$ = this.navigationService.currentSection$;

  sections$: Observable<NavSection[]> = this.navigationService.sections$.pipe(
    map(sections => this.mapToNavSections(sections))
  );

  navigateToSection(sectionId: string): void {
    this.navigationService.navigateToSection(sectionId);
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
