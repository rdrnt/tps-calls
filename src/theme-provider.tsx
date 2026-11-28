import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  /** The theme actually shown, with 'system' resolved. */
  resolvedTheme: 'dark' | 'light';
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  resolvedTheme: 'light',
  setTheme: () => null,
};

const DARK_QUERY = '(prefers-color-scheme: dark)';

const subscribeToSystemTheme = (onChange: () => void) => {
  const query = window.matchMedia(DARK_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};

const getSystemTheme = () =>
  window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

// Safari throws a SecurityError on any localStorage access when storage is blocked.
const readStoredTheme = (storageKey: string): Theme | null => {
  try {
    return localStorage.getItem(storageKey) as Theme | null;
  } catch {
    return null;
  }
};

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => readStoredTheme(storageKey) || defaultTheme
  );

  const systemTheme = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemTheme
  );
  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  const value = {
    theme,
    resolvedTheme,
    setTheme: (theme: Theme) => {
      try {
        localStorage.setItem(storageKey, theme);
      } catch {
        // Storage is blocked; keep the theme for this session only.
      }
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
