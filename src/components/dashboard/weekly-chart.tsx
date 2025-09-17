'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { WeeklyEvolution } from '@/types';

interface WeeklyChartProps {
  data: WeeklyEvolution[];
  isLoading?: boolean;
}

export function WeeklyChart({ data, isLoading }: WeeklyChartProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Evolução Semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-voar-primary rounded-full animate-pulse"></div>
              <div className="w-4 h-4 bg-voar-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-4 h-4 bg-voar-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolução Semanal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                className="stroke-muted" 
              />
              <XAxis 
                dataKey="semana" 
                className="text-sm fill-muted-foreground"
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                className="text-sm fill-muted-foreground"
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
              />
              <Line 
                type="monotone" 
                dataKey="pontuacao" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ 
                  fill: 'hsl(var(--primary))', 
                  strokeWidth: 2,
                  r: 4,
                }}
                activeDot={{ 
                  r: 6, 
                  fill: 'hsl(var(--primary))',
                  stroke: 'hsl(var(--background))',
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Progress indicator */}
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>Início do mês</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span>Pontuação</span>
          </div>
          <span>Atual</span>
        </div>
      </CardContent>
    </Card>
  );
}