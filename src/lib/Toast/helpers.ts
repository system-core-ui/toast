import type { ThemeSchema } from '@thanh-libs/theme';
import type { ToastVariant } from '../models';

/* ─── Helpers ──────────────────────────────────────────────── */

/** Parse hex color to relative luminance (0 = black, 1 = white) */
export const getLuminance = (hex: string): number => {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16) / 255;
  const g = parseInt(h.substring(2, 4), 16) / 255;
  const b = parseInt(h.substring(4, 6), 16) / 255;
  const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
};

/** Auto-detect contrast text: white for dark backgrounds, dark for light */
export const getContrastText = (bgColor: string): string => {
  try {
    return getLuminance(bgColor) < 0.5 ? '#fff' : '#212121';
  } catch {
    return '#212121';
  }
};

export const getColorPalette = (theme: ThemeSchema, color: ToastVariant | string) => {
  const palette = (theme as ThemeSchema)?.palette;

  // Default: use mid-gray that's visible on white backgrounds
  if (color === 'default') {
    return {
      main: palette?.disabled?.dark ?? '#8c8c8c',
      light: palette?.background?.default ?? '#fafafa',
      contrastText: palette?.text?.primary ?? '#424242',
    };
  }

  // Semantic colors: theme uses light/pastel values for main, use dark for vivid colors
  const semanticMap: Record<string, { fallbackMain: string; fallbackLight: string }> = {
    error:   { fallbackMain: '#f44336', fallbackLight: '#ffebee' },
    success: { fallbackMain: '#52c41a', fallbackLight: '#f6ffed' },
    warning: { fallbackMain: '#faad14', fallbackLight: '#fffbe6' },
  };

  if (color in semanticMap) {
    const semantic = semanticMap[color];
    const colorPalette = palette?.[color as keyof typeof palette] as
      | { main: string; dark?: string; light?: string }
      | undefined;
    const main = colorPalette?.dark ?? semantic.fallbackMain;
    return {
      main,
      light: colorPalette?.light ?? semantic.fallbackLight,
      contrastText: getContrastText(main),
    };
  }

  // Standard colors (primary, secondary, info, etc.)
  const colorPalette = palette?.[color as keyof typeof palette] as
    | { main: string; light?: string; contrastText?: string }
    | undefined;
  const main = colorPalette?.main ?? '#9e9e9e';
  return {
    main,
    light: colorPalette?.light ?? '#f5f5f5',
    contrastText: colorPalette?.contrastText ?? getContrastText(main),
  };
};
