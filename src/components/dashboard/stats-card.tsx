'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-voar-primary',
  trend,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn('transition-all hover:shadow-md', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <Icon className={cn('w-5 h-5', iconColor)} />
              <p className="text-sm font-medium text-muted-foreground">
                {title}
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">
                {value}
              </p>
              
              {subtitle && (
                <p className="text-xs text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {trend && (
            <div className="flex flex-col items-end">
              <Badge 
                variant={trend.isPositive ? 'success' : 'destructive'}
                className="text-xs"
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}