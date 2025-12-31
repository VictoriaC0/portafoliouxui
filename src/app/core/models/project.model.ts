export interface Tag {
    id: string;
    label: string;
}

export interface Metric {
    label: string;
    value: string;
    description?: string;
}

export interface Feature {
    title: string;
    description: string;
    icon?: string;
}

export interface CaseStudy {
    title: string;
    subtitle: string;
    context: string;
    challenge: string;
    methodology: string;
    research: string;
    solutionDescription: string;
    features: Feature[];
    keyImpact: string;
    metrics: Metric[];
    learnings: string;
    nextSteps: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    icon: string;
    tags: Tag[];
    link: string;
    caseStudy: CaseStudy;
    order: number;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export type ProjectStatus = 'active' | 'archived' | 'draft';
