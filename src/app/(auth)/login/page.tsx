'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plane, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-voar-primary/10 via-background to-voar-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-voar-primary rounded-lg flex items-center justify-center">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold">VOAR</h1>
              <p className="text-sm text-muted-foreground">Produtividade Máxima</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              Bem-vindo de volta
            </h2>
            <p className="text-muted-foreground">
              Entre na sua conta para continuar sua jornada
            </p>
          </div>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Fazer Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-voar-primary focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-voar-primary focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link 
                  href="/forgot-password"
                  className="text-sm text-voar-primary hover:underline"
                >
                  Esqueci minha senha
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="voar"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Entrando...
                  </div>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="info" className="text-xs">
                  DEMO
                </Badge>
                <span className="text-sm font-medium">Credenciais de teste</span>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p><strong>Email:</strong> demo@voar.com</p>
                <p><strong>Senha:</strong> demo123</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Não tem uma conta?{' '}
            <Link 
              href="/signup" 
              className="text-voar-primary hover:underline font-medium"
            >
              Criar conta
            </Link>
          </p>
        </div>

        {/* Method VOAR Preview */}
        <Card className="bg-muted/30">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3 text-center">Método VOAR</h3>
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="text-center">
                <div className="w-6 h-6 bg-blue-500 rounded-full text-white flex items-center justify-center mx-auto mb-1 text-xs font-bold">
                  V
                </div>
                <p className="font-medium">Ver</p>
              </div>
              <div className="text-center">
                <div className="w-6 h-6 bg-green-500 rounded-full text-white flex items-center justify-center mx-auto mb-1 text-xs font-bold">
                  O
                </div>
                <p className="font-medium">Organizar</p>
              </div>
              <div className="text-center">
                <div className="w-6 h-6 bg-yellow-500 rounded-full text-white flex items-center justify-center mx-auto mb-1 text-xs font-bold">
                  A
                </div>
                <p className="font-medium">Ajustar</p>
              </div>
              <div className="text-center">
                <div className="w-6 h-6 bg-purple-500 rounded-full text-white flex items-center justify-center mx-auto mb-1 text-xs font-bold">
                  R
                </div>
                <p className="font-medium">Repetir</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}