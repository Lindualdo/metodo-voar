'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AudioRecord } from '@/types';
import { formatDuration, getEmotionColor, getCategoryColor } from '@/lib/utils';
import { Play, Pause, Clock, Calendar } from 'lucide-react';

interface AudioListProps {
  audioRecords: AudioRecord[];
  isLoading?: boolean;
}

export function AudioList({ audioRecords, isLoading }: AudioListProps) {
  const handlePlayToggle = (audio: AudioRecord) => {
    console.log('Play/Pause audio:', audio.id);
    // Aqui seria implementado o player real
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-muted rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (audioRecords.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Play className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Nenhum áudio encontrado</h3>
          <p className="text-sm text-muted-foreground">
            Faça sua primeira gravação para começar
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {audioRecords.map((audio) => (
        <Card key={audio.id} className="transition-all hover:shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              {/* Play/Pause Button */}
              <Button
                size="icon"
                variant="outline"
                onClick={() => handlePlayToggle(audio)}
                className="w-10 h-10 flex-shrink-0"
              >
                <Play className="w-4 h-4" />
              </Button>

              {/* Audio Info */}
              <div className="flex-1 min-w-0">
                {/* Date and Time */}
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{audio.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{audio.time}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {formatDuration(audio.duration)}
                  </Badge>
                </div>

                {/* Transcript Preview */}
                <p className="text-sm text-foreground mb-3 line-clamp-2">
                  {audio.transcript}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {/* Emotion Tags */}
                  {audio.emotions.map((emotion, index) => (
                    <Badge
                      key={`emotion-${index}`}
                      variant="secondary"
                      className="text-xs"
                      style={{
                        backgroundColor: `${getEmotionColor(emotion.emotion)}20`,
                        color: getEmotionColor(emotion.emotion),
                        borderColor: `${getEmotionColor(emotion.emotion)}40`,
                      }}
                    >
                      {emotion.emotion}
                    </Badge>
                  ))}

                  {/* Category Tags */}
                  {audio.categories.map((category, index) => (
                    <Badge
                      key={`category-${index}`}
                      variant="outline"
                      className="text-xs"
                      style={{
                        borderColor: getCategoryColor(category.category),
                        color: getCategoryColor(category.category),
                      }}
                    >
                      {category.category.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="flex-shrink-0">
                <Badge 
                  variant={audio.status === 'processado' ? 'success' : 'warning'}
                  className="text-xs"
                >
                  {audio.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}