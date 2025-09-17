'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { mockEmotionDistribution, mockPatterns } from '@/lib/mock-data';
import { Info, TrendingUp, Lightbulb, BarChart3 } from 'lucide-react';

export default function AnalysePage() {
  const emotionData = mockEmotionDistribution;
  const patterns = mockPatterns;

  const getPatternIcon = (tipo: string) => {
    switch (tipo) {
      case 'padrao':
        return Info;
      case 'progresso':
        return TrendingUp;
      case 'recomendacao':
        return Lightbulb;
      default:
        return Info;
    }
  };

  const getPatternColor = (tipo: string) => {
    switch (tipo) {
      case 'padrao':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-600';
      case 'progresso':
        return 'bg-green-100 dark:bg-green-900/20 text-green-600';
      case 'recomendacao':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600';
      default:
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-600';
    }
  };

  const getPatternBadgeVariant = (tipo: string) => {
    switch (tipo) {
      case 'padrao':
        return 'info' as const;
      case 'progresso':
        return 'success' as const;
      case 'recomendacao':
        return 'warning' as const;
      default:
        return 'info' as const;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Análise</h1>
        <p className="text-muted-foreground mt-2">
          Insights baseados nos seus dados
        </p>
      </div>

      {/* Emotions Chart */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-voar-primary" />
              Emoções Frequentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={emotionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="quantidade"
                    nameKey="emocao"
                  >
                    {emotionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Emotion Summary */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              {emotionData.map((emotion) => (
                <div key={emotion.emocao} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: emotion.cor }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {emotion.emocao}
                  </span>
                  <Badge variant="outline" className="ml-auto text-xs">
                    {emotion.quantidade}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Patterns and Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Insights e Padrões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patterns.map((pattern, index) => {
                const Icon = getPatternIcon(pattern.tipo);
                
                return (
                  <div 
                    key={index}
                    className="p-4 rounded-lg border bg-muted/20 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getPatternColor(pattern.tipo)}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground">
                            {pattern.titulo}
                          </h4>
                          <Badge 
                            variant={getPatternBadgeVariant(pattern.tipo)}
                            className="text-xs"
                          >
                            {pattern.tipo}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {pattern.descricao}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weekly Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tendências Semanais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Segunda-feira</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-muted rounded-full h-2">
                    <div className="w-3/4 bg-yellow-500 h-2 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">75%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Terça-feira</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-muted rounded-full h-2">
                    <div className="w-4/5 bg-green-500 h-2 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">80%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Quarta-feira</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-muted rounded-full h-2">
                    <div className="w-full bg-green-500 h-2 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">90%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Autoconhecimento</span>
                </div>
                <Badge variant="success">+12%</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Disciplina</span>
                </div>
                <Badge variant="success">+8%</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Treino Mental</span>
                </div>
                <Badge variant="warning">-3%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Próximas Ações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Foque em Treino Mental
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                  Categoria com menor pontuação
                </p>
              </div>
              
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  Continue com Disciplina
                </p>
                <p className="text-xs text-green-600 dark:text-green-300 mt-1">
                  Evolução consistente
                </p>
              </div>
              
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-sm font-medium text-purple-800 dark:text-purple-200">
                  Registre mais cedo
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-300 mt-1">
                  Melhor performance matinal
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}