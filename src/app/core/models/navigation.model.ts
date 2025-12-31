export interface Section {
    id: string;
    index: number;
    element?: HTMLElement;
}

export interface NavigationState {
    currentSection: string;
    currentIndex: number;
    sections: string[];
    canNavigateNext: boolean;
    canNavigatePrevious: boolean;
}
