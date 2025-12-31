import { Component, inject, OnInit, signal } from '@angular/core';
import { ProjectCard } from '../../../projects/components/project-card/project-card';
import { ProjectService } from '../../../../core/services/project.service';
import { Project } from '../../../../core/models/project.model';

@Component({
  selector: 'app-casos',
  imports: [ProjectCard],
  templateUrl: './casos.html',
  styleUrl: './casos.scss'
})
export class Casos implements OnInit {
  private projectService = inject(ProjectService);

  projects = signal<Project[]>([]);

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(projects => {
      this.projects.set(projects);
    });
  }
}
