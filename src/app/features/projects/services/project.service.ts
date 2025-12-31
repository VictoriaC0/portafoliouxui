import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { getProjectDataCopy } from '../data/project.data';
import { Project, ProjectSummary, isProject } from '../models/project.model';

/**
 * Project Service
 * Manages project data with CRUD operations and circular navigation
 */
@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private projectsSubject = new BehaviorSubject<Project[]>(getProjectDataCopy());

    /**
     * Observable stream of all projects
     */
    public readonly projects$: Observable<Project[]> = this.projectsSubject.asObservable();

    /**
     * Observable stream of featured projects only
     */
    public readonly featuredProjects$: Observable<Project[]> = this.projects$.pipe(
        map(projects => projects.filter(p => p.featured === true))
    );

    constructor() { }

    /**
     * Get all projects (synchronous)
     */
    getAllProjects(): Project[] {
        return this.projectsSubject.value;
    }

    /**
     * Get all projects (async observable)
     */
    getAllProjects$(): Observable<Project[]> {
        return this.projects$;
    }

    /**
     * Get project by ID (synchronous)
     * @param id Project identifier
     * @returns Project if found, undefined otherwise
     */
    getProjectById(id: string): Project | undefined {
        return this.projectsSubject.value.find(p => p.id === id);
    }

    /**
     * Get project by ID (async observable)
     * @param id Project identifier
     * @returns Observable<Project> or error if not found
     */
    getProjectById$(id: string): Observable<Project> {
        const project = this.getProjectById(id);
        if (project) {
            return of(project);
        }
        return throwError(() => new Error(`Project with id "${id}" not found`));
    }

    /**
     * Check if project exists
     * @param id Project identifier
     */
    projectExists(id: string): boolean {
        return this.projectsSubject.value.some(p => p.id === id);
    }

    /**
     * Get project index in array
     * @param id Project identifier
     * @returns Index or -1 if not found
     */
    getProjectIndex(id: string): number {
        return this.projectsSubject.value.findIndex(p => p.id === id);
    }

    /**
     * Get next project (circular navigation)
     * @param currentId Current project ID
     * @returns Next project or undefined if current not found
     */
    getNextProject(currentId: string): Project | undefined {
        const projects = this.projectsSubject.value;
        const currentIndex = this.getProjectIndex(currentId);

        if (currentIndex === -1) {
            return undefined;
        }

        // Circular: if last, return first
        const nextIndex = (currentIndex + 1) % projects.length;
        return projects[nextIndex];
    }

    /**
     * Get previous project (circular navigation)
     * @param currentId Current project ID
     * @returns Previous project or undefined if current not found
     */
    getPreviousProject(currentId: string): Project | undefined {
        const projects = this.projectsSubject.value;
        const currentIndex = this.getProjectIndex(currentId);

        if (currentIndex === -1) {
            return undefined;
        }

        // Circular: if first, return last
        const prevIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
        return projects[prevIndex];
    }

    /**
     * Get project summaries (lightweight for lists)
     */
    getProjectSummaries(): ProjectSummary[] {
        return this.projectsSubject.value.map(p => ({
            id: p.id,
            title: p.title,
            description: p.description,
            icon: p.icon,
            tags: p.tags
        }));
    }

    /**
     * Get projects by category
     * @param category Category name
     */
    getProjectsByCategory(category: string): Project[] {
        return this.projectsSubject.value.filter(p => p.category === category);
    }

    /**
     * Get projects by tag
     * @param tag Tag name
     */
    getProjectsByTag(tag: string): Project[] {
        return this.projectsSubject.value.filter(p => p.tags.includes(tag));
    }

    /**
     * Search projects by text
     * @param query Search query
     * @returns Projects matching query in title or description
     */
    searchProjects(query: string): Project[] {
        const lowerQuery = query.toLowerCase();
        return this.projectsSubject.value.filter(p =>
            p.title.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery) ||
            p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
    }

    // CRUD Operations (for future extensibility)

    /**
     * Create new project
     * @param project New project data
     * @returns Created project
     */
    createProject(project: Project): Project {
        if (!isProject(project)) {
            throw new Error('Invalid project data');
        }

        const projects = this.projectsSubject.value;

        // Check for duplicate ID
        if (this.projectExists(project.id)) {
            throw new Error(`Project with id "${project.id}" already exists`);
        }

        const newProjects = [...projects, project];
        this.projectsSubject.next(newProjects);

        return project;
    }

    /**
     * Update existing project
     * @param id Project ID
     * @param updates Partial project updates
     * @returns Updated project or undefined if not found
     */
    updateProject(id: string, updates: Partial<Project>): Project | undefined {
        const projects = this.projectsSubject.value;
        const index = this.getProjectIndex(id);

        if (index === -1) {
            return undefined;
        }

        const updatedProject = { ...projects[index], ...updates, id }; // Preserve ID

        if (!isProject(updatedProject)) {
            throw new Error('Invalid project updates');
        }

        const newProjects = [...projects];
        newProjects[index] = updatedProject;
        this.projectsSubject.next(newProjects);

        return updatedProject;
    }

    /**
     * Delete project
     * @param id Project ID
     * @returns true if deleted, false if not found
     */
    deleteProject(id: string): boolean {
        const projects = this.projectsSubject.value;
        const index = this.getProjectIndex(id);

        if (index === -1) {
            return false;
        }

        const newProjects = projects.filter(p => p.id !== id);
        this.projectsSubject.next(newProjects);

        return true;
    }

    /**
     * Reset to original data
     */
    resetToDefaults(): void {
        this.projectsSubject.next(getProjectDataCopy());
    }
}
