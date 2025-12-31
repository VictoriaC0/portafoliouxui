import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationService } from '../../../core/services/navigation.service';
import { ResponsiveService } from '../../../core/services/responsive.service';

@Component({
  selector: 'app-navigation-arrows',
  imports: [CommonModule],
  templateUrl: './navigation-arrows.html',
  styleUrl: './navigation-arrows.scss',
})
export class NavigationArrows {
  private navigationService = inject(NavigationService);
  private responsiveService = inject(ResponsiveService);

  isDesktop$ = this.responsiveService.isDesktop$;
  canNavigatePrevious$ = this.navigationService.canNavigatePrevious$;
  canNavigateNext$ = this.navigationService.canNavigateNext$;

  navigatePrevious(): void {
    this.navigationService.navigatePrevious();
  }

  navigateNext(): void {
    this.navigationService.navigateNext();
  }
}
