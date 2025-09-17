'use client';

import { useEffect } from 'react';
import { AudioList } from '@/components/audio/audio-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAudioStore } from '@/stores/audio';
import { Mic, Plus, Search, Filter } from 'lucide-react';

export default function AudiosPage() {
  const {
    audioRecords,
    isLoadingRecords,
    error,
    fetchAudioRecords
  } = useAudioStore();

  useEffect(() => {
    fetchAudioRecords();
  }, [fetchAudioRecords]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 font-medium">Erro ao carregar áudios</p>
          <p className="text-sm text-muted-foreground mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Meus Áudios</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie seus registros de áudio
          </p>
        </div>

        <Button className="w-full sm:w-auto" variant="voar">
          <Plus className="w-4 h-4 mr-2" />
          Novo Registro
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Mic className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Áudios</p>
                <p className="text-2xl font-bold">{audioRecords.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Processados</p>
                <p className="text-2xl font-bold">
                  {audioRecords.filter(a => a.status === 'processado').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <div className="w-5 h-5 text-purple-600">⏱️</div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tempo Total</p>
                <p className="text-2xl font-bold">
                  {Math.floor(audioRecords.reduce((acc, audio) => acc + audio.duration, 0) / 60)}min
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Registros de Áudio</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <AudioList 
            audioRecords={audioRecords}
            isLoading={isLoadingRecords}
          />
        </CardContent>
      </Card>
    </div>
  );
}