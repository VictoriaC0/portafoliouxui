import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PROJECTS_DATA } from '../data/projects.data';
import { Project } from '../models/project.model';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private projectsSubject = new BehaviorSubject<Project[]>(PROJECTS_DATA);
    public projects$ = this.projectsSubject.asObservable();

    /**
     * Get all active projects sorted by order
     */
    getAllProjects(): Observable<Project[]> {
        return this.projects$.pipe(
            map(projects => projects
                .filter(p => p.isActive)
                .sort((a, b) => a.order - b.order)
            )
        );
    }

    /**
     * Get all projects (including inactive)
     */
    getAllProjectsIncludingInactive(): Observable<Project[]> {
        return this.projects$;
    }

    /**
     * Get project by ID
     */
    getProjectById(id: string): Observable<Project | undefined> {
        return this.projects$.pipe(
            map(projects => projects.find(p => p.id === id))
        );
    }

    /**
     * Get project by ID synchronously
     */
    getProjectByIdSync(id: string): Project | undefined {
        return this.projectsSubject.value.find(p => p.id === id);
    }

    /**
     * Check if project exists
     */
    projectExists(id: string): boolean {
        return this.projectsSubject.value.some(p => p.id === id);
    }

    /**
     * Get project index in array
     */
    getProjectIndex(id: string): number {
        const activeProjects = this.projectsSubject.value
            .filter(p => p.isActive)
            .sort((a, b) => a.order - b.order);
        return activeProjects.findIndex(p => p.id === id);
    }

    /**
     * Get next project (circular navigation)
     */
    getNextProject(currentId: string): Project | undefined {
        const activeProjects = this.projectsSubject.value
            .filter(p => p.isActive)
            .sort((a, b) => a.order - b.order);

        const currentIndex = activeProjects.findIndex(p => p.id === currentId);

        if (currentIndex === -1) {
            return activeProjects[0]; // Default to first if not found
        }

        // Circular: if last, return first
        const nextIndex = (currentIndex + 1) % activeProjects.length;
        return activeProjects[nextIndex];
    }

    /**
     * Check if current project is the last one
     */
    isLastProject(currentId: string): boolean {
        const activeProjects = this.projectsSubject.value
            .filter(p => p.isActive)
            .sort((a, b) => a.order - b.order);

        const currentIndex = activeProjects.findIndex(p => p.id === currentId);
        return currentIndex === activeProjects.length - 1;
    }

    /**
     * Check if current project is the first one
     */
    isFirstProject(currentId: string): boolean {
        const activeProjects = this.projectsSubject.value
            .filter(p => p.isActive)
            .sort((a, b) => a.order - b.order);

        const currentIndex = activeProjects.findIndex(p => p.id === currentId);
        return currentIndex === 0;
    }

    /**
     * Get previous project (circular navigation)
     */
    getPreviousProject(currentId: string): Project | undefined {
        const activeProjects = this.projectsSubject.value
            .filter(p => p.isActive)
            .sort((a, b) => a.order - b.order);

        const currentIndex = activeProjects.findIndex(p => p.id === currentId);

        if (currentIndex === -1) {
            return activeProjects[activeProjects.length - 1]; // Default to last if not found
        }

        // Circular: if first, return last
        const prevIndex = currentIndex === 0
            ? activeProjects.length - 1
            : currentIndex - 1;
        return activeProjects[prevIndex];
    }

    /**
     * Get projects by tag
     */
    getProjectsByTag(tagId: string): Observable<Project[]> {
        return this.projects$.pipe(
            map(projects => projects.filter(p =>
                p.isActive && p.tags.some(t => t.id === tagId)
            ))
        );
    }

    /**
     * Get all unique tags from projects
     */
    getAllTags(): Observable<{ id: string; label: string; count: number }[]> {
        return this.projects$.pipe(
            map(projects => {
                const tagMap = new Map<string, { id: string; label: string; count: number }>();

                projects
                    .filter(p => p.isActive)
                    .forEach(project => {
                        project.tags.forEach(tag => {
                            if (tagMap.has(tag.id)) {
                                tagMap.get(tag.id)!.count++;
                            } else {
                                tagMap.set(tag.id, { ...tag, count: 1 });
                            }
                        });
                    });

                return Array.from(tagMap.values())
                    .sort((a, b) => b.count - a.count);
            })
        );
    }

    /**
     * Search projects by title or description
     */
    searchProjects(query: string): Observable<Project[]> {
        const lowerQuery = query.toLowerCase().trim();

        if (!lowerQuery) {
            return this.getAllProjects();
        }

        return this.projects$.pipe(
            map(projects => projects.filter(p =>
                p.isActive && (
                    p.title.toLowerCase().includes(lowerQuery) ||
                    p.description.toLowerCase().includes(lowerQuery) ||
                    p.tags.some(t => t.label.toLowerCase().includes(lowerQuery))
                )
            ))
        );
    }

    /**
     * Add new project (for future CRUD operations)
     */
    addProject(project: Project): void {
        const currentProjects = this.projectsSubject.value;
        this.projectsSubject.next([...currentProjects, project]);
    }

    /**
     * Update project (for future CRUD operations)
     */
    updateProject(id: string, updates: Partial<Project>): void {
        const currentProjects = this.projectsSubject.value;
        const index = currentProjects.findIndex(p => p.id === id);

        if (index !== -1) {
            const updatedProjects = [...currentProjects];
            updatedProjects[index] = {
                ...updatedProjects[index],
                ...updates,
                updatedAt: new Date()
            };
            this.projectsSubject.next(updatedProjects);
        }
    }

    /**
     * Delete project (soft delete by setting isActive = false)
     */
    deleteProject(id: string): void {
        this.updateProject(id, { isActive: false });
    }
}
