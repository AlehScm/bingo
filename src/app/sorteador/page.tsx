"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Dices, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const TOTAL_NUMBERS = 90;

export default function SorteadorPage() {
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [lastDrawn, setLastDrawn] = useState<number | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [availableNumbers, setAvailableNumbers] = useState<number[]>([]);

  useEffect(() => {
    try {
        const storedDrawnNumbers = localStorage.getItem('drawnNumbers');
        const initialDrawn = storedDrawnNumbers ? JSON.parse(storedDrawnNumbers) : [];
        setDrawnNumbers(initialDrawn);

        const allNumbers = Array.from({ length: TOTAL_NUMBERS }, (_, i) => i + 1);
        const remainingNumbers = allNumbers.filter(n => !initialDrawn.includes(n));
        setAvailableNumbers(remainingNumbers);
    } catch (error) {
        console.error("Failed to parse from localStorage", error);
        const allNumbers = Array.from({ length: TOTAL_NUMBERS }, (_, i) => i + 1);
        setAvailableNumbers(allNumbers);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('drawnNumbers', JSON.stringify(drawnNumbers));
    } catch (error) {
      console.error("Failed to save to localStorage", error);
    }
  }, [drawnNumbers]);

  const handleDrawNumber = useCallback(() => {
    if (availableNumbers.length === 0) return;
    
    setIsDrawing(true);
    
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        const newNumber = availableNumbers[randomIndex];
        
        setLastDrawn(newNumber);
        setAvailableNumbers(prev => prev.filter(n => n !== newNumber));
        setDrawnNumbers(prev => [...prev, newNumber]);
        setIsDrawing(false);
    }, 500); 
  }, [availableNumbers]);

  const handleReset = () => {
    setDrawnNumbers([]);
    setLastDrawn(null);
    setAvailableNumbers(Array.from({ length: TOTAL_NUMBERS }, (_, i) => i + 1));
    localStorage.removeItem('drawnNumbers');
  };

  const sortedHistory = [...drawnNumbers].sort((a, b) => a - b);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-5xl mb-6">
        <Link href="/" passHref>
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
      </header>

      <main className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
            <Card className="text-center shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-muted-foreground">Último Número Sorteado</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="relative w-48 h-48 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                        <div className={`w-40 h-40 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-2xl transition-transform duration-500 ${isDrawing ? 'scale-110 rotate-[360deg]' : 'scale-100'}`}>
                            <span className="text-7xl font-bold tracking-tighter">
                                {isDrawing ? '?' : (lastDrawn ?? '—')}
                            </span>
                        </div>
                    </div>
                    <Button size="lg" onClick={handleDrawNumber} disabled={availableNumbers.length === 0 || isDrawing} className="w-full max-w-sm">
                        <Dices className="mr-2 h-5 w-5" />
                        {isDrawing ? 'Sorteando...' : 'Sortear Bola'}
                    </Button>
                    {availableNumbers.length === 0 && <p className="text-destructive mt-4 font-bold">Todos os números já foram sorteados!</p>}
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-8">
            <Card className="shadow-lg flex-grow flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Histórico ({drawnNumbers.length}/{TOTAL_NUMBERS})</CardTitle>
                    <Button variant="outline" size="icon" onClick={handleReset} aria-label="Resetar Sorteio">
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ScrollArea className="h-96">
                    <div className="flex flex-wrap gap-2">
                        {sortedHistory.map(num => (
                            <div key={num} className="flex items-center justify-center text-lg h-10 w-10 rounded-full bg-secondary text-secondary-foreground font-semibold">
                                {num}
                            </div>
                        ))}
                    </div>
                  </ScrollArea>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
