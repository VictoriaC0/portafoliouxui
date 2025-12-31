import { Injectable, NgZone } from '@angular/core';
import { NavigationService } from './navigation.service';
import { ResponsiveService } from './responsive.service';

@Injectable({
    providedIn: 'root'
})
export class ScrollService {
    private readonly THROTTLE_DELAY = 1000; // ms
    private readonly TOUCH_THRESHOLD = 50; // px
    private readonly TRANSITION_DURATION = 800; // ms

    private isScrolling = false;
    private touchStartY = 0;
    private touchStartX = 0;

    constructor(
        private navigationService: NavigationService,
        private responsiveService: ResponsiveService,
        private ngZone: NgZone
    ) {
        this.initializeScrollListeners();
    }

    /**
     * Initialize scroll and gesture listeners outside Angular zone for performance
     */
    private initializeScrollListeners(): void {
        this.ngZone.runOutsideAngular(() => {
            // Wheel scroll
            window.addEventListener('wheel', (e) => this.handleWheelScroll(e), { passive: false });

            // Touch gestures
            window.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
            window.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });

            // Keyboard navigation
            window.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
        });
    }

    /**
     * Scroll to a specific section by index
     */
    scrollToSection(index: number, animated: boolean = true): void {
        const sections = this.navigationService.getSections();
        if (index < 0 || index >= sections.length) {
            return;
        }

        const sectionId = sections[index];
        const isDesktop = this.responsiveService.isDesktop();

        if (isDesktop) {
            this.scrollHorizontal(index, animated);
        } else {
            this.scrollVertical(sectionId, animated);
        }

        // Update navigation state
        this.navigationService.updateActiveSection(sectionId);
    }

    /**
     * Horizontal scroll using CSS transform (desktop)
     */
    private scrollHorizontal(index: number, animated: boolean = true): void {
        const container = document.getElementById('sections-container');
        if (!container) return;

        const translateX = -index * 100;

        if (!animated) {
            container.style.transition = 'none';
        } else {
            container.style.transition = `transform ${this.TRANSITION_DURATION}ms cubic-bezier(0.645, 0.045, 0.355, 1)`;
        }

        container.style.transform = `translateX(${translateX}vw)`;

        // Reset transition after animation completes
        if (!animated) {
            setTimeout(() => {
                container.style.transition = '';
            }, 50);
        }
    }

    /**
     * Vertical scroll using scrollIntoView (mobile)
     */
    private scrollVertical(sectionId: string, animated: boolean = true): void {
        const section = document.getElementById(sectionId);
        if (!section) return;

        section.scrollIntoView({
            behavior: animated ? 'smooth' : 'auto',
            block: 'start'
        });
    }

    /**
     * Handle wheel scroll events with throttling
     */
    private handleWheelScroll(event: WheelEvent): void {
        // Only apply horizontal scroll on desktop
        if (!this.responsiveService.isDesktop()) {
            return;
        }

        if (this.isScrolling) {
            event.preventDefault();
            return;
        }

        const delta = Math.sign(event.deltaY);

        if (delta > 0) {
            // Scroll down/right
            this.throttleNavigation(() => {
                this.ngZone.run(() => {
                    this.navigationService.navigateNext();
                    const newIndex = this.navigationService.getCurrentIndex();
                    this.scrollToSection(newIndex);
                });
            });
        } else if (delta < 0) {
            // Scroll up/left
            this.throttleNavigation(() => {
                this.ngZone.run(() => {
                    this.navigationService.navigatePrevious();
                    const newIndex = this.navigationService.getCurrentIndex();
                    this.scrollToSection(newIndex);
                });
            });
        }

        event.preventDefault();
    }

    /**
     * Handle touch start
     */
    private handleTouchStart(event: TouchEvent): void {
        if (!this.responsiveService.isDesktop()) {
            return; // Let native scroll handle mobile
        }

        this.touchStartX = event.touches[0].clientX;
        this.touchStartY = event.touches[0].clientY;
    }

    /**
     * Handle touch end and detect swipe gestures
     */
    private handleTouchEnd(event: TouchEvent): void {
        if (!this.responsiveService.isDesktop()) {
            return;
        }

        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;

        const deltaX = touchEndX - this.touchStartX;
        const deltaY = touchEndY - this.touchStartY;

        // Determine if swipe is horizontal
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.TOUCH_THRESHOLD) {
            if (deltaX > 0) {
                // Swipe right (previous section)
                this.throttleNavigation(() => {
                    this.ngZone.run(() => {
                        this.navigationService.navigatePrevious();
                        const newIndex = this.navigationService.getCurrentIndex();
                        this.scrollToSection(newIndex);
                    });
                });
            } else {
                // Swipe left (next section)
                this.throttleNavigation(() => {
                    this.ngZone.run(() => {
                        this.navigationService.navigateNext();
                        const newIndex = this.navigationService.getCurrentIndex();
                        this.scrollToSection(newIndex);
                    });
                });
            }
        }
    }

    /**
     * Handle keyboard navigation (arrow keys)
     */
    private handleKeyboardNavigation(event: KeyboardEvent): void {
        if (!this.responsiveService.isDesktop()) {
            return;
        }

        const key = event.key;

        if (key === 'ArrowRight' || key === 'ArrowDown') {
            event.preventDefault();
            this.throttleNavigation(() => {
                this.ngZone.run(() => {
                    this.navigationService.navigateNext();
                    const newIndex = this.navigationService.getCurrentIndex();
                    this.scrollToSection(newIndex);
                });
            });
        } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
            event.preventDefault();
            this.throttleNavigation(() => {
                this.ngZone.run(() => {
                    this.navigationService.navigatePrevious();
                    const newIndex = this.navigationService.getCurrentIndex();
                    this.scrollToSection(newIndex);
                });
            });
        }
    }

    /**
     * Throttle navigation to prevent rapid scrolling
     */
    private throttleNavigation(callback: () => void): void {
        if (this.isScrolling) {
            return;
        }

        this.isScrolling = true;
        callback();

        setTimeout(() => {
            this.isScrolling = false;
        }, this.THROTTLE_DELAY);
    }

    /**
     * Cleanup listeners on service destroy
     */
    ngOnDestroy(): void {
        // Note: Services are singleton and typically don't get destroyed
        // but this is here for completeness
    }
}
