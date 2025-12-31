import { DOCUMENT } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, Renderer2, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../../core/models/project.model';
import { ProjectService } from '../../../../core/services/project.service';
import { NavigationArrows } from '../../../../shared/components/navigation-arrows/navigation-arrows';
import { SidebarNav } from '../../../../shared/components/sidebar-nav/sidebar-nav';
import { CaseStudyNavigation } from '../../components/case-study-navigation/case-study-navigation';
import { Proceso } from '../../components/case-study/sections/proceso/proceso';
import { Resultados } from '../../components/case-study/sections/resultados/resultados';
import { Resumen } from '../../components/case-study/sections/resumen/resumen';
import { Solucion } from '../../components/case-study/sections/solucion/solucion';

@Component({
  selector: 'app-project-detail',
  imports: [SidebarNav, NavigationArrows, Resumen, Proceso, Solucion, Resultados, CaseStudyNavigation],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetail implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  project = signal<Project | undefined>(undefined);

  ngOnInit(): void {
    // Add project-page class to body for horizontal scroll styles
    this.renderer.addClass(this.document.body, 'project-page');

    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.projectService.getProjectById(projectId).subscribe(proj => {
        this.project.set(proj);
      });
    }
  }

  ngOnDestroy(): void {
    // Remove project-page class when leaving
    this.renderer.removeClass(this.document.body, 'project-page');
  }
}
