import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../../../core/models/project.model';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
  host: {
    'class': 'col-lg-4 col-md-6 col-12 d-flex'
  }
})
export class ProjectCard {
  private router = inject(Router);

  project = input.required<Project>();

  viewProject(): void {
    this.router.navigate(['/project', this.project().id]);
  }

  // Helper method to get tag labels as strings for display
  getTagLabels(): string[] {
    return this.project().tags.map(tag => tag.label);
  }
}
