import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../../../../../core/services/project.service';

@Component({
  selector: 'app-resultados',
  imports: [],
  templateUrl: './resultados.html',
  styleUrl: './resultados.scss',
})
export class Resultados {
  caseData = input.required<any>();
  currentProjectId = input.required<string>();

  private projectService = inject(ProjectService);
  private router = inject(Router);

  goToProjects(): void {
    this.router.navigate(['/'], { fragment: 'casos' });
  }

  goToNextProject(): void {
    const nextProject = this.projectService.getNextProject(this.currentProjectId());
    if (nextProject) {
      this.router.navigate(['/project', nextProject.id]);
    }
  }
}
