'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { mockGoals, mockAchievements } from '@/lib/mock-data';
import { getProgressColor, formatFullDate } from '@/lib/utils';
import { Target, Plus, Trophy, Calendar, Clock, Zap } from 'lucide-react';

export default function MetasPage() {
  const goals = mockGoals;
  const achievements = mockAchievements;

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'ativa':
        return 'info' as const;
      case 'concluida':
        return 'success' as const;
      case 'pausada':
        return 'warning' as const;
      default:
        return 'info' as const;
    }
  };

  const getAchievementIcon = (tipo: string) => {
    switch (tipo) {
      case 'streak':
        return '🔥';
      case 'meta':
        return '🎯';
      case 'insight':
        return '💡';
      case 'consistencia':
        return '⚡';
      default:
        return '🏆';
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Metas</h1>
          <p className="text-muted-foreground mt-2">
            Acompanhe suas metas e conquistas
          </p>
        </div>

        <Button className="w-full sm:w-auto" variant="voar">
          <Plus className="w-4 h-4 mr-2" />
          Nova Meta
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Metas Ativas</p>
                <p className="text-2xl font-bold">
                  {goals.filter(g => g.status === 'ativa').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Concluídas</p>
                <p className="text-2xl font-bold">
                  {goals.filter(g => g.status === 'concluida').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Taxa de Sucesso</p>
                <p className="text-2xl font-bold">67%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Progresso Médio</p>
                <p className="text-2xl font-bold">
                  {Math.round(goals.reduce((acc, goal) => acc + goal.progresso, 0) / goals.length)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Active Goals */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Metas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {goals.map((goal) => (
                  <div key={goal.id} className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground">
                            {goal.titulo}
                          </h4>
                          <Badge variant={getStatusVariant(goal.status)}>
                            {goal.status}
                          </Badge>
                        </div>
                        
                        {goal.descricao && (
                          <p className="text-sm text-muted-foreground mb-2">
                            {goal.descricao}
                          </p>
                        )}

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>
                            {goal.valorAtual} / {goal.valorAlvo} {goal.unidade}
                          </span>
                          {goal.prazo && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatFullDate(goal.prazo)}</span>
                            </div>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {goal.categoria}
                          </Badge>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className={`text-lg font-bold ${getProgressColor(goal.progresso)}`}>
                          {goal.progresso}%
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Progress value={goal.progresso} className="h-2" />
                      
                      {goal.status === 'ativa' && goal.progresso < 100 && (
                        <p className="text-xs text-muted-foreground">
                          Restam {goal.valorAlvo - goal.valorAtual} {goal.unidade} para concluir
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Conquistas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg"
                  >
                    <div className="text-2xl">
                      {getAchievementIcon(achievement.tipo)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm">
                        {achievement.titulo}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {achievement.descricao}
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {formatFullDate(achievement.dataConquista)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="text-center pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    Ver todas as conquistas →
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Tipos de Meta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium">Meta de Frequência</p>
                <p className="text-sm text-muted-foreground">Registros por período</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium">Meta de Performance</p>
                <p className="text-sm text-muted-foreground">Melhoria em categoria</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium">Meta de Consistência</p>
                <p className="text-sm text-muted-foreground">Sequência de dias</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}