import { Component, input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../../../core/services/project.service';

@Component({
  selector: 'app-case-study-navigation',
  imports: [],
  templateUrl: './case-study-navigation.html',
  styleUrl: './case-study-navigation.scss'
})
export class CaseStudyNavigation {
  currentProjectId = input.required<string>();

  private projectService = inject(ProjectService);
  private router = inject(Router);

  goToNextProject(): void {
    const nextProject = this.projectService.getNextProject(this.currentProjectId());
    if (nextProject) {
      this.router.navigate(['/project', nextProject.id]);
    }
  }

  goToPreviousProject(): void {
    const previousProject = this.projectService.getPreviousProject(this.currentProjectId());
    if (previousProject) {
      this.router.navigate(['/project', previousProject.id]);
    }
  }
}
