'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plane, Mail, Lock, Eye, EyeOff, Github } from 'lucide-react';
import { useAuthStore } from '@/stores/auth';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setError, clearError, error } = useAuthStore();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);
    clearError();

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        callbackUrl,
        redirect: false,
      });

      if (result?.error) {
        setError('Credenciais inválidas. Tente novamente.');
      } else if (result?.ok) {
        router.push(callbackUrl);
      }
    } catch (error) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    clearError();

    try {
      await signIn(provider, {
        callbackUrl,
      });
    } catch (error) {
      setError(`Erro ao fazer login com ${provider}. Tente novamente.`);
    } finally {
      setIsLoading(false);
    }
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
            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Social Login Buttons */}
            <div className="space-y-2 mb-4">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continuar com Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleSocialLogin('github')}
                disabled={isLoading}
              >
                <Github className="w-4 h-4 mr-2" />
                Continuar com GitHub
              </Button>
            </div>

            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou continue com email
                </span>
              </div>
            </div>

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