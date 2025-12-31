import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { ResponsiveState, ScreenSize } from '../models/responsive.model';

@Injectable({
    providedIn: 'root'
})
export class ResponsiveService {
    private readonly DESKTOP_BREAKPOINT = 992;
    private readonly TABLET_BREAKPOINT = 768;

    private responsiveStateSubject: BehaviorSubject<ResponsiveState>;

    public readonly isDesktop$: Observable<boolean>;
    public readonly screenSize$: Observable<ScreenSize>;
    public readonly state$: Observable<ResponsiveState>;

    constructor() {
        const initialState = this.getResponsiveState();
        this.responsiveStateSubject = new BehaviorSubject<ResponsiveState>(initialState);

        this.state$ = this.responsiveStateSubject.asObservable();
        this.isDesktop$ = this.state$.pipe(map(state => state.isDesktop));
        this.screenSize$ = this.state$.pipe(map(state => state.screenSize));

        // Listen to window resize with debounce
        fromEvent(window, 'resize')
            .pipe(debounceTime(250))
            .subscribe(() => {
                this.responsiveStateSubject.next(this.getResponsiveState());
            });
    }

    /**
     * Get current desktop state synchronously
     */
    isDesktop(): boolean {
        return this.responsiveStateSubject.value.isDesktop;
    }

    /**
     * Get current screen size synchronously
     */
    getScreenSize(): ScreenSize {
        return this.responsiveStateSubject.value.screenSize;
    }

    /**
     * Get current window width
     */
    getWidth(): number {
        return this.responsiveStateSubject.value.width;
    }

    /**
     * Calculate responsive state based on window width
     */
    private getResponsiveState(): ResponsiveState {
        const width = window.innerWidth;
        let screenSize: ScreenSize;

        if (width >= this.DESKTOP_BREAKPOINT) {
            screenSize = 'desktop';
        } else if (width >= this.TABLET_BREAKPOINT) {
            screenSize = 'tablet';
        } else {
            screenSize = 'mobile';
        }

        return {
            isDesktop: width >= this.DESKTOP_BREAKPOINT,
            screenSize,
            width
        };
    }
}
