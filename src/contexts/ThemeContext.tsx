import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
type Theme = 'light' | 'dark';
const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | null>(null);
export const ThemeProvider = ({ children }: { children: ReactNode }) => { const [theme, setTheme] = useState<Theme>('light'); const value = useMemo(() => ({ theme, toggleTheme: () => setTheme((t) => t === 'light' ? 'dark' : 'light') }), [theme]); return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>; };
export const useTheme = () => { const context = useContext(ThemeContext); if (!context) throw new Error('useTheme phải được dùng trong ThemeProvider'); return context; };
