'use client';

import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'webqid-theme';

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored;
  }
  return 'system';
}

// External store for theme to avoid setState in effects
let themeListeners: Array<() => void> = [];
let currentStoredTheme: Theme | null = null;
let isMounted = false;

function subscribeToTheme(callback: () => void) {
  themeListeners.push(callback);
  // Mark as mounted when first subscriber connects (client-side)
  if (!isMounted) {
    isMounted = true;
    // Initialize stored theme on mount
    currentStoredTheme = getStoredTheme();
  }
  return () => {
    themeListeners = themeListeners.filter((l) => l !== callback);
  };
}

function getThemeSnapshot(): Theme {
  if (currentStoredTheme === null) {
    currentStoredTheme = getStoredTheme();
  }
  return currentStoredTheme;
}

function getServerThemeSnapshot(): Theme {
  return 'system';
}

function notifyThemeListeners() {
  themeListeners.forEach((l) => l());
}

// Mounted state external store
function subscribeMounted(callback: () => void) {
  themeListeners.push(callback);
  return () => {
    themeListeners = themeListeners.filter((l) => l !== callback);
  };
}

function getMountedSnapshot(): boolean {
  return isMounted;
}

function getMountedServerSnapshot(): boolean {
  return false;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);
  const mounted = useSyncExternalStore(subscribeMounted, getMountedSnapshot, getMountedServerSnapshot);

  // Compute resolved theme
  const resolvedTheme: ResolvedTheme = mounted
    ? theme === 'system'
      ? getSystemTheme()
      : theme
    : 'light';

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    const resolved = theme === 'system' ? getSystemTheme() : theme;

    // Apply to document - toggle dark class based on resolved theme
    const root = document.documentElement;
    if (resolved === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme, mounted]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted || theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const newResolved = e.matches ? 'dark' : 'light';
      if (newResolved === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      // Trigger re-render for components using resolved theme
      notifyThemeListeners();
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  const setTheme = useCallback((newTheme: Theme) => {
    currentStoredTheme = newTheme;
    localStorage.setItem(STORAGE_KEY, newTheme);
    notifyThemeListeners();
  }, []);

  // Prevent flash by not rendering until mounted
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: 'system', resolvedTheme: 'light', setTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
