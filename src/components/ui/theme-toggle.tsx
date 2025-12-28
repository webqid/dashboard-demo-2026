'use client';

import { useTheme } from '@/lib/theme';
import { IconSun, IconMoon } from '@/components/icons';

export function ThemeToggle() {
  const { resolvedTheme, setTheme, theme } = useTheme();

  const cycleTheme = () => {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className="relative flex h-8 w-8 items-center justify-center rounded-md text-text-muted hover:text-text-primary hover:bg-surface-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      aria-label={`Current theme: ${theme}. Click to change.`}
    >
      {resolvedTheme === 'dark' ? (
        <IconMoon className="h-4 w-4" />
      ) : (
        <IconSun className="h-4 w-4" />
      )}
      {theme === 'system' && (
        <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-brand" />
      )}
    </button>
  );
}
