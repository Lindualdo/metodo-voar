'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/components/theme-provider';
import { 
  Plane, 
  Mic, 
  BarChart3, 
  Target, 
  Repeat, 
  ArrowRight,
  Sun,
  Moon,
  CheckCircle,
  Star
} from 'lucide-react';

export default function HomePage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-voar-primary rounded-lg flex items-center justify-center">
              <Plane className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">VOAR</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            
            <Link href="/login">
              <Button variant="outline">
                Entrar
              </Button>
            </Link>
            
            <Link href="/login">
              <Button variant="voar">
                Começar Grátis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-voar-primary/5 via-background to-voar-secondary/5">
        <div className="container mx-auto px-6 text-center">
          <Badge variant="success" className="mb-6">
            ✨ Novo: Integração com WhatsApp
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Transforme reflexões em{' '}
            <span className="text-voar-primary">resultados</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Com o Método VOAR, você transforma confusão em clareza, 
            falhas em combustível, e disciplina em resultados reais e sustentáveis.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button variant="voar" size="lg" className="w-full sm:w-auto">
                Começar Agora
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Ver Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row justify-center gap-8 mt-12 text-center">
            <div>
              <div className="text-2xl font-bold text-voar-primary">15 dias</div>
              <div className="text-sm text-muted-foreground">Sequência média</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-voar-primary">78%</div>
              <div className="text-sm text-muted-foreground">Melhoria média</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-voar-primary">2:15</div>
              <div className="text-sm text-muted-foreground">Tempo por registro</div>
            </div>
          </div>
        </div>
      </section>

      {/* Method VOAR */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Os 4 Pilares do Método VOAR
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Um sistema prático para transformar reflexões em dados e dados em evolução contínua
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-500 rounded-full text-white flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold">V</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Ver</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Captura imediata de pensamentos e sentimentos por áudio
                </p>
                <div className="flex items-center justify-center">
                  <Mic className="w-5 h-5 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-500 rounded-full text-white flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold">O</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Organizar</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Processamento automático e classificação em 5 eixos essenciais
                </p>
                <div className="flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-yellow-500 rounded-full text-white flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold">A</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Ajustar</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Análise estruturada com relatórios e gráficos inteligentes
                </p>
                <div className="flex items-center justify-center">
                  <Target className="w-5 h-5 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-500 rounded-full text-white flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold">R</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Repetir</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Ciclo semanal de evolução com progresso contínuo
                </p>
                <div className="flex items-center justify-center">
                  <Repeat className="w-5 h-5 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Por que o VOAR é diferente?
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-12 h-12 bg-voar-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-voar-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Zero Atrito</h3>
              <p className="text-muted-foreground">
                Você só fala, o sistema faz o resto. Nada de formulários complexos ou interfaces confusas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-voar-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-voar-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Foco Total</h3>
              <p className="text-muted-foreground">
                Trabalha nos 5 eixos essenciais da produtividade pessoal de forma estruturada.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-voar-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-voar-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Evolução Garantida</h3>
              <p className="text-muted-foreground">
                Cada semana traz aprendizado e ajustes. Progresso contínuo e mensurável.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-voar-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para decolar?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Comece sua jornada de autoconhecimento e produtividade hoje mesmo.
          </p>
          
          <Link href="/login">
            <Button variant="secondary" size="lg">
              Começar Grátis Agora
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          
          <p className="mt-4 text-sm opacity-75">
            Grátis para sempre. Sem cartão de crédito.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-voar-primary rounded-lg flex items-center justify-center">
                <Plane className="w-3 h-3 text-white" />
              </div>
              <span className="font-bold">VOAR</span>
            </div>
            
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground">Privacidade</Link>
              <Link href="#" className="hover:text-foreground">Termos</Link>
              <Link href="#" className="hover:text-foreground">Suporte</Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2024 VOAR. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}