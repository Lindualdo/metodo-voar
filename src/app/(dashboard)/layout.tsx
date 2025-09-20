'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { useAuthStore } from '@/stores/auth';
import { Menu, Sun, Moon, Bell, LogOut } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user } = useAuthStore();

  const handleLogout = async () => {
    await signOut({
      callbackUrl: '/',
    });
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transform bg-card border-r border-border transition-transform lg:relative lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between h-full px-6">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>

              {/* Breadcrumb will be added here */}
              <div className="hidden md:block">
                <h1 className="text-lg font-semibold text-foreground">
                  Dashboard
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>

              {/* User Welcome */}
              {user && (
                <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full">
                  <span className="text-xs text-muted-foreground">
                    Olá, {user.name?.split(' ')[0]}
                  </span>
                </div>
              )}

              {/* WhatsApp Status */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/20 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-700 dark:text-green-400 font-medium">
                  WhatsApp Conectado
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}