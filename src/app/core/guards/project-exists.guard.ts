import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';

export const projectExistsGuard: CanActivateFn = (route, state) => {
    const projectService = inject(ProjectService);
    const router = inject(Router);

    const projectId = route.paramMap.get('id');

    if (!projectId) {
        console.warn('ProjectExistsGuard: No project ID provided');
        router.navigate(['/home']);
        return false;
    }

    const exists = projectService.projectExists(projectId);

    if (!exists) {
        console.warn(`ProjectExistsGuard: Project ${projectId} not found`);
        router.navigate(['/home']);
        return false;
    }

    return true;
};
