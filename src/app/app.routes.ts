import { Routes } from '@angular/router';
import { projectExistsGuard } from './core/guards/project-exists.guard';
import { Home } from './features/home/home/home';
import { ProjectDetail } from './features/projects/pages/project-detail/project-detail';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'project/:id',
        component: ProjectDetail,
        canActivate: [projectExistsGuard]
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];
