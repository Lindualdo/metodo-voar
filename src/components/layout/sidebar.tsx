'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  LayoutDashboard, 
  Mic, 
  BarChart3, 
  Target, 
  FileText, 
  Settings, 
  Plane 
} from 'lucide-react';

const navigation = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Meus Áudios',
    href: '/audios',
    icon: Mic,
  },
  {
    title: 'Análise',
    href: '/analise',
    icon: BarChart3,
  },
  {
    title: 'Metas',
    href: '/metas',
    icon: Target,
    badge: 2,
  },
  {
    title: 'Relatórios',
    href: '/relatorios',
    icon: FileText,
    disabled: true,
  },
  {
    title: 'Configurações',
    href: '/settings',
    icon: Settings,
    disabled: true,
  },
];

const voarMethod = [
  { letter: 'V', title: 'Ver', subtitle: 'Captura imediata', color: 'bg-blue-500' },
  { letter: 'O', title: 'Organizar', subtitle: 'Processamento automático', color: 'bg-green-500' },
  { letter: 'A', title: 'Ajustar', subtitle: 'Análise estruturada', color: 'bg-yellow-500' },
  { letter: 'R', title: 'Repetir', subtitle: 'Ciclo semanal', color: 'bg-purple-500' },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn(
      "pb-12 min-h-screen bg-card border-r border-border",
      className
    )}>
      <div className="space-y-4 py-4">
        {/* Logo */}
        <div className="px-3 py-2">
          <Link href="/dashboard" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-voar-primary rounded-lg flex items-center justify-center">
              <Plane className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">VOAR</h2>
              <p className="text-xs text-muted-foreground">Produtividade Máxima</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <div className="px-3 py-2">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              if (item.disabled) {
              
              return (
                <div
                  key={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    item.disabled 
                      ? "text-muted-foreground/50 cursor-not-allowed opacity-50" 
                      : isActive 
                        ? "bg-voar-primary text-white" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="flex-1">{item.title}</span>
                  {item.badge && !item.disabled && (
                    <Badge variant="secondary" className="h-5 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                  {item.disabled && (
                    <Badge variant="outline" className="h-5 text-xs">
                      Em breve
                    </Badge>
                  )}
                </div>
              );
            } else {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-voar-primary text-white" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="flex-1">{item.title}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="h-5 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            }
            })}
          </div>
        </div>

        {/* Método VOAR */}
        <div className="px-3 py-2 mt-8">
          <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Método VOAR
          </h3>
          <div className="space-y-2">
            {voarMethod.map((item) => (
              <div
                key={item.letter}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold",
                  item.color
                )}>
                  {item.letter}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Profile */}
        <div className="px-3 py-2 mt-auto">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/50">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-voar-primary text-white">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">João Silva</p>
              <p className="text-xs text-muted-foreground">Premium</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}