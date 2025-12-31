import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { filter, map, throttleTime } from 'rxjs/operators';
import { NavigationState } from '../models/navigation.model';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    private readonly HOME_SECTIONS = ['inicio', 'casos', 'acerca', 'contacto'];
    private readonly PROJECT_SECTIONS = ['resumen', 'proceso', 'solucion', 'resultados'];
    private readonly SCROLL_THRESHOLD = 50;
    private readonly TOUCH_THRESHOLD = 50;
    private readonly ANIMATION_DURATION = 800;

    private navigationStateSubject: BehaviorSubject<NavigationState>;
    private isScrolling = false;
    private touchStartX = 0;
    private touchStartY = 0;
    private platformId = inject(PLATFORM_ID);
    private isBrowser: boolean;

    public readonly currentSection$: Observable<string>;
    public readonly currentIndex$: Observable<number>;
    public readonly sections$: Observable<string[]>;
    public readonly canNavigateNext$: Observable<boolean>;
    public readonly canNavigatePrevious$: Observable<boolean>;
    public readonly state$: Observable<NavigationState>;

    constructor(private router: Router) {
        this.isBrowser = isPlatformBrowser(this.platformId);
        const initialState = this.getInitialState();
        this.navigationStateSubject = new BehaviorSubject<NavigationState>(initialState);

        this.state$ = this.navigationStateSubject.asObservable();
        this.currentSection$ = this.state$.pipe(map(state => state.currentSection));
        this.currentIndex$ = this.state$.pipe(map(state => state.currentIndex));
        this.sections$ = this.state$.pipe(map(state => state.sections));
        this.canNavigateNext$ = this.state$.pipe(map(state => state.canNavigateNext));
        this.canNavigatePrevious$ = this.state$.pipe(map(state => state.canNavigatePrevious));

        // Listen to route changes to update active section
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.updateStateFromRoute();
            });

        // Initialize horizontal navigation only in browser
        if (this.isBrowser) {
            this.initializeHorizontalNavigation();
        }
    }

    /**
     * Initialize horizontal navigation events (wheel, keyboard, touch)
     */
    private initializeHorizontalNavigation(): void {
        // Wheel event for mouse scroll
        fromEvent<WheelEvent>(window, 'wheel', { passive: false })
            .pipe(throttleTime(this.ANIMATION_DURATION))
            .subscribe((event: WheelEvent) => {
                if (!this.isDesktopMode()) return;

                event.preventDefault();
                const delta = event.deltaY || event.deltaX;

                if (Math.abs(delta) > this.SCROLL_THRESHOLD) {
                    if (delta > 0) {
                        this.navigateNext();
                    } else {
                        this.navigatePrevious();
                    }
                }
            });

        // Keyboard navigation
        fromEvent<KeyboardEvent>(window, 'keydown')
            .subscribe((event: KeyboardEvent) => {
                if (!this.isDesktopMode()) return;

                switch (event.key) {
                    case 'ArrowRight':
                    case 'ArrowDown':
                    case ' ':
                        event.preventDefault();
                        this.navigateNext();
                        break;
                    case 'ArrowLeft':
                    case 'ArrowUp':
                        event.preventDefault();
                        this.navigatePrevious();
                        break;
                    case 'Home':
                        event.preventDefault();
                        this.navigateToSection(this.getSections()[0]);
                        break;
                    case 'End':
                        event.preventDefault();
                        const sections = this.getSections();
                        this.navigateToSection(sections[sections.length - 1]);
                        break;
                }
            });

        // Touch events for mobile swipe
        fromEvent<TouchEvent>(window, 'touchstart', { passive: true })
            .subscribe((event: TouchEvent) => {
                if (!this.isDesktopMode()) return;
                this.touchStartX = event.touches[0].clientX;
                this.touchStartY = event.touches[0].clientY;
            });

        fromEvent<TouchEvent>(window, 'touchend', { passive: true })
            .subscribe((event: TouchEvent) => {
                if (!this.isDesktopMode()) return;

                const touchEndX = event.changedTouches[0].clientX;
                const touchEndY = event.changedTouches[0].clientY;
                const diffX = this.touchStartX - touchEndX;
                const diffY = this.touchStartY - touchEndY;

                // Horizontal swipe
                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > this.TOUCH_THRESHOLD) {
                    if (diffX > 0) {
                        this.navigateNext();
                    } else {
                        this.navigatePrevious();
                    }
                }
                // Vertical swipe
                else if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > this.TOUCH_THRESHOLD) {
                    if (diffY > 0) {
                        this.navigateNext();
                    } else {
                        this.navigatePrevious();
                    }
                }
            });
    }

    /**
     * Check if desktop mode (width >= 992px)
     */
    private isDesktopMode(): boolean {
        return this.isBrowser && window.innerWidth >= 992;
    }

    /**
     * Navigate to a specific section by ID and apply horizontal scroll
     */
    navigateToSection(sectionId: string): void {
        const state = this.navigationStateSubject.value;
        if (!state.sections.includes(sectionId)) {
            return;
        }

        this.updateActiveSection(sectionId);
        this.scrollToHorizontalSection(state.sections.indexOf(sectionId));
    }

    /**
     * Navigate to next section
     */
    navigateNext(): void {
        const state = this.navigationStateSubject.value;
        if (!state.canNavigateNext) {
            return;
        }

        const nextIndex = state.currentIndex + 1;
        const nextSection = state.sections[nextIndex];
        this.updateActiveSection(nextSection);
        this.scrollToHorizontalSection(nextIndex);
    }

    /**
     * Navigate to previous section
     */
    navigatePrevious(): void {
        const state = this.navigationStateSubject.value;
        if (!state.canNavigatePrevious) {
            return;
        }

        const prevIndex = state.currentIndex - 1;
        const prevSection = state.sections[prevIndex];
        this.updateActiveSection(prevSection);
        this.scrollToHorizontalSection(prevIndex);
    }

    /**
     * Apply horizontal scroll transformation
     */
    private scrollToHorizontalSection(index: number): void {
        if (!this.isBrowser || !this.isDesktopMode()) return;

        const sectionsContainer = document.querySelector('.sections-container') as HTMLElement;
        if (!sectionsContainer) return;

        this.isScrolling = true;
        const translateX = -index * 100;
        sectionsContainer.style.transform = `translateX(${translateX}vw)`;

        setTimeout(() => {
            this.isScrolling = false;
        }, this.ANIMATION_DURATION);
    }

    /**
     * Update active section (internal state management)
     */
    updateActiveSection(sectionId: string): void {
        const state = this.navigationStateSubject.value;
        const newIndex = state.sections.indexOf(sectionId);

        if (newIndex === -1) {
            return;
        }

        const newState: NavigationState = {
            currentSection: sectionId,
            currentIndex: newIndex,
            sections: state.sections,
            canNavigateNext: newIndex < state.sections.length - 1,
            canNavigatePrevious: newIndex > 0
        };

        this.navigationStateSubject.next(newState);
    }

    /**
     * Get current section synchronously
     */
    getCurrentSection(): string {
        return this.navigationStateSubject.value.currentSection;
    }

    /**
     * Get current index synchronously
     */
    getCurrentIndex(): number {
        return this.navigationStateSubject.value.currentIndex;
    }

    /**
     * Get sections array synchronously
     */
    getSections(): string[] {
        return this.navigationStateSubject.value.sections;
    }

    /**
     * Set sections (for dynamic page changes)
     */
    setSections(sections: string[]): void {
        const state = this.navigationStateSubject.value;
        const currentIndex = sections.indexOf(state.currentSection);

        const newState: NavigationState = {
            currentSection: currentIndex >= 0 ? state.currentSection : sections[0],
            currentIndex: currentIndex >= 0 ? currentIndex : 0,
            sections,
            canNavigateNext: currentIndex < sections.length - 1,
            canNavigatePrevious: currentIndex > 0
        };

        this.navigationStateSubject.next(newState);
    }

    /**
     * Get initial state based on current route
     */
    private getInitialState(): NavigationState {
        const url = this.router.url;
        const isProjectPage = url.includes('/project/');
        const sections = isProjectPage ? this.PROJECT_SECTIONS : this.HOME_SECTIONS;

        return {
            currentSection: sections[0],
            currentIndex: 0,
            sections,
            canNavigateNext: sections.length > 1,
            canNavigatePrevious: false
        };
    }

    /**
     * Update state from current route
     */
    private updateStateFromRoute(): void {
        const url = this.router.url;
        const isProjectPage = url.includes('/project/');
        const sections = isProjectPage ? this.PROJECT_SECTIONS : this.HOME_SECTIONS;

        // Try to detect section from hash
        const hash = url.split('#')[1];
        const currentSection = hash && sections.includes(hash) ? hash : sections[0];

        this.setSections(sections);
        this.updateActiveSection(currentSection);
    }
}
