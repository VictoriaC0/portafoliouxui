export type ScreenSize = 'desktop' | 'tablet' | 'mobile';

export interface ResponsiveState {
  isDesktop: boolean;
  screenSize: ScreenSize;
  width: number;
}
