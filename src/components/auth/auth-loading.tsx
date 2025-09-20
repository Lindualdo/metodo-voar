'use client';

import { Plane } from 'lucide-react';

export function AuthLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-voar-primary rounded-lg mb-4">
          <Plane className="w-8 h-8 text-white animate-pulse" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">VOAR</h2>
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-voar-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-2 text-sm text-muted-foreground">Carregando...</span>
        </div>
      </div>
    </div>
  );
}