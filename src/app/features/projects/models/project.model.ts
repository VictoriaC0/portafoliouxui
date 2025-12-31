/**
 * Case Study Data Model
 * Complete data structure for a project case study
 */
export interface CaseStudy {
    caseTitle: string;
    caseSubtitle: string;
    context: string;
    challenge: string;
    methodology: string;
    research: string;
    solutionDescription: string;
    featuresList: string; // HTML string with <li> items
    keyImpact: string;
    metrics: string; // HTML string with metric-item divs
    learnings: string;
    nextSteps: string;
}

/**
 * Feature Model
 * Individual feature description
 */
export interface Feature {
    title: string;
    description: string;
    icon?: string;
}

/**
 * Metric Model
 * Key performance indicator
 */
export interface Metric {
    value: string;
    label: string;
    description?: string;
}

/**
 * Project Model
 * Complete project data including case study
 */
export interface Project {
    id: string;
    title: string;
    description: string;
    icon: string;
    tags: string[];
    link: string;
    caseData: CaseStudy;
    /** Optional metadata */
    featured?: boolean;
    publishDate?: Date;
    category?: string;
}

/**
 * Project Summary Model
 * Lightweight version for lists/cards
 */
export interface ProjectSummary {
    id: string;
    title: string;
    description: string;
    icon: string;
    tags: string[];
}

/**
 * Type guard to check if object is a valid Project
 */
export function isProject(obj: unknown): obj is Project {
    const p = obj as Project;
    return (
        typeof p === 'object' &&
        p !== null &&
        typeof p.id === 'string' &&
        typeof p.title === 'string' &&
        typeof p.description === 'string' &&
        typeof p.icon === 'string' &&
        Array.isArray(p.tags) &&
        typeof p.link === 'string' &&
        isCaseStudy(p.caseData)
    );
}

/**
 * Type guard to check if object is a valid CaseStudy
 */
export function isCaseStudy(obj: unknown): obj is CaseStudy {
    const cs = obj as CaseStudy;
    return (
        typeof cs === 'object' &&
        cs !== null &&
        typeof cs.caseTitle === 'string' &&
        typeof cs.caseSubtitle === 'string' &&
        typeof cs.context === 'string' &&
        typeof cs.challenge === 'string' &&
        typeof cs.methodology === 'string' &&
        typeof cs.research === 'string' &&
        typeof cs.solutionDescription === 'string' &&
        typeof cs.featuresList === 'string' &&
        typeof cs.keyImpact === 'string' &&
        typeof cs.metrics === 'string' &&
        typeof cs.learnings === 'string' &&
        typeof cs.nextSteps === 'string'
    );
}
