'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useTheme } from '@/components/theme-provider';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Mic, 
  Sun, 
  Moon, 
  Smartphone,
  Save,
  Edit
} from 'lucide-react';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie suas preferências e conta
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Perfil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-20 h-20 mb-4">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-voar-primary text-white text-lg">
                  JS
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg">João Silva</h3>
              <p className="text-sm text-muted-foreground">joao@email.com</p>
              <Badge variant="success" className="mt-2">
                Premium
              </Badge>
            </div>

            <div className="space-y-4">
              <Button variant="outline" className="w-full">
                <Edit className="w-4 h-4 mr-2" />
                Editar Perfil
              </Button>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Membro desde:</span>
                <span>Janeiro 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total de registros:</span>
                <span>47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sequência atual:</span>
                <span>15 dias</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Aparência
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Tema</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setTheme('light')}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        theme === 'light' 
                          ? 'border-voar-primary bg-voar-primary/10' 
                          : 'border-muted hover:border-muted-foreground'
                      }`}
                    >
                      <Sun className="w-5 h-5 mx-auto mb-2" />
                      <span className="text-sm">Claro</span>
                    </button>

                    <button
                      onClick={() => setTheme('dark')}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        theme === 'dark' 
                          ? 'border-voar-primary bg-voar-primary/10' 
                          : 'border-muted hover:border-muted-foreground'
                      }`}
                    >
                      <Moon className="w-5 h-5 mx-auto mb-2" />
                      <span className="text-sm">Escuro</span>
                    </button>

                    <button
                      onClick={() => setTheme('system')}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        theme === 'system' 
                          ? 'border-voar-primary bg-voar-primary/10' 
                          : 'border-muted hover:border-muted-foreground'
                      }`}
                    >
                      <Smartphone className="w-5 h-5 mx-auto mb-2" />
                      <span className="text-sm">Sistema</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notificações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notificações por email</h4>
                    <p className="text-sm text-muted-foreground">Receba resumos semanais</p>
                  </div>
                  <div className="w-12 h-6 bg-voar-primary rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Lembretes diários</h4>
                    <p className="text-sm text-muted-foreground">Lembrete para fazer registros</p>
                  </div>
                  <div className="w-12 h-6 bg-muted rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Insights novos</h4>
                    <p className="text-sm text-muted-foreground">Quando novos padrões forem identificados</p>
                  </div>
                  <div className="w-12 h-6 bg-voar-primary rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="w-5 h-5" />
                Configurações de Áudio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Qualidade de gravação</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <button className="p-2 text-sm rounded border border-muted hover:border-muted-foreground">
                      Baixa
                    </button>
                    <button className="p-2 text-sm rounded border-2 border-voar-primary bg-voar-primary/10">
                      Média
                    </button>
                    <button className="p-2 text-sm rounded border border-muted hover:border-muted-foreground">
                      Alta
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Transcrição automática</h4>
                    <p className="text-sm text-muted-foreground">Processar áudios automaticamente</p>
                  </div>
                  <div className="w-12 h-6 bg-voar-primary rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Compartilhar análises</h4>
                    <p className="text-sm text-muted-foreground">Para melhorar o sistema</p>
                  </div>
                  <div className="w-12 h-6 bg-muted rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Histórico público</h4>
                    <p className="text-sm text-muted-foreground">Mostrar progresso em rankings</p>
                  </div>
                  <div className="w-12 h-6 bg-muted rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded"></div>
                WhatsApp
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <h4 className="font-medium text-green-800 dark:text-green-200">
                      Conectado
                    </h4>
                    <p className="text-sm text-green-600 dark:text-green-300">
                      Envie áudios pelo WhatsApp
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Configurar
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button variant="default" className="w-full sm:w-auto">
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>
      </div>

      <Card className="border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">
            Zona Perigosa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Exportar dados</h4>
                <p className="text-sm text-muted-foreground">
                  Baixe todos os seus dados em formato JSON
                </p>
              </div>
              <Button variant="outline" size="sm">
                Exportar
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-red-600 dark:text-red-400">
                  Excluir conta
                </h4>
                <p className="text-sm text-muted-foreground">
                  Esta ação não pode ser desfeita
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Excluir
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}