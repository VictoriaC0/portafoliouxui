import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NavigationService } from '../../../core/services/navigation.service';
import { ResponsiveService } from '../../../core/services/responsive.service';
import { ScrollService } from '../../../core/services/scroll.service';

@Component({
  selector: 'app-section-container',
  imports: [CommonModule],
  templateUrl: './section-container.html',
  styleUrl: './section-container.scss',
})
export class SectionContainer implements OnInit {
  private responsiveService = inject(ResponsiveService);
  private scrollService = inject(ScrollService);
  private navigationService = inject(NavigationService);

  isDesktop$ = this.responsiveService.isDesktop$;

  ngOnInit(): void {
    // ScrollService already handles all scroll/touch/keyboard events globally
    // This component just provides the container structure

    // Initialize scroll position on load
    const currentIndex = this.navigationService.getCurrentIndex();
    if (currentIndex > 0) {
      // If we're not on the first section, scroll to it
      setTimeout(() => {
        this.scrollService.scrollToSection(currentIndex, false);
      }, 100);
    }
  }
}
