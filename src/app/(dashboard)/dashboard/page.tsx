'use client';

import { useEffect } from 'react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { WeeklyChart } from '@/components/dashboard/weekly-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboardStore } from '@/stores/dashboard';
import { formatDuration } from '@/lib/utils';
import { Mic, Target, Clock, Flame, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const {
    stats,
    weeklyEvolution,
    categoryDistribution,
    isLoadingStats,
    isLoadingCharts,
    fetchDashboardData,
    error
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 font-medium">Erro ao carregar dados</p>
          <p className="text-sm text-muted-foreground mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Visão geral da sua evolução
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Registros"
          value={stats?.registros.total || 0}
          subtitle="Este mês"
          icon={Mic}
          iconColor="text-blue-600"
          trend={{
            value: 12,
            isPositive: true
          }}
        />

        <StatsCard
          title="Metas"
          value={`${stats?.metas.concluidas || 0}/${stats?.metas.total || 0}`}
          subtitle="Concluídas"
          icon={Target}
          iconColor="text-green-600"
          trend={{
            value: 8,
            isPositive: true
          }}
        />

        <StatsCard
          title="Tempo Médio"
          value={stats ? formatDuration(stats.tempoMedio.minutos * 60 + stats.tempoMedio.segundos) : '0:00'}
          subtitle="Por registro"
          icon={Clock}
          iconColor="text-purple-600"
        />

        <StatsCard
          title="Sequência"
          value={stats?.sequencia.diasConsecutivos || 0}
          subtitle="Dias seguidos"
          icon={Flame}
          iconColor="text-orange-600"
          trend={{
            value: 5,
            isPositive: true
          }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weekly Evolution Chart */}
        <div className="lg:col-span-2">
          <WeeklyChart 
            data={weeklyEvolution}
            isLoading={isLoadingCharts}
          />
        </div>

        {/* Categories Overview */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-voar-primary" />
                Categorias
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingCharts ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="flex items-center justify-between mb-2">
                        <div className="h-3 bg-muted rounded w-20"></div>
                        <div className="h-3 bg-muted rounded w-6"></div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {categoryDistribution.map((category) => (
                    <div key={category.categoria}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">
                          {category.categoria}
                        </span>
                        <span className="text-sm font-bold text-foreground">
                          {category.quantidade}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{
                            backgroundColor: category.cor,
                            width: `${(category.quantidade / Math.max(...categoryDistribution.map(c => c.quantidade))) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-muted-foreground text-center">
                      Ver todas as categorias →
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-voar-primary rounded-lg flex items-center justify-center">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium">Novo Registro</p>
                <p className="text-sm text-muted-foreground">Grave um novo áudio</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium">Ver Metas</p>
                <p className="text-sm text-muted-foreground">Acompanhe o progresso</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium">Análise</p>
                <p className="text-sm text-muted-foreground">Insights detalhados</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}