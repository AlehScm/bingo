"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw, Star } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TOTAL_NUMBERS = 90;
const CARD_SIZE = 25;

const generateUniqueRandomNumbers = (count: number, max: number): number[] => {
    const numbers = new Set<number>();
    while (numbers.size < count) {
        numbers.add(Math.floor(Math.random() * max) + 1);
    }
    return Array.from(numbers).sort((a,b) => a-b);
};

export default function ParticipantePage() {
    const [cardNumbers, setCardNumbers] = useState<number[]>([]);
    const [markedNumbers, setMarkedNumbers] = useState<Set<number>>(new Set());

    const generateNewCard = useCallback(() => {
        setCardNumbers(generateUniqueRandomNumbers(CARD_SIZE, TOTAL_NUMBERS));
        setMarkedNumbers(new Set());
    }, []);

    useEffect(() => {
        generateNewCard();
    }, [generateNewCard]);

    const handleNumberClick = (number: number) => {
        setMarkedNumbers(prevMarked => {
            const newMarked = new Set(prevMarked);
            if (newMarked.has(number)) {
                newMarked.delete(number);
            } else {
                newMarked.add(number);
            }
            return newMarked;
        });
    };

    return (
        <div className="min-h-screen bg-background p-4 md:p-8 flex flex-col items-center">
            <header className="w-full max-w-2xl mb-6 flex justify-between items-center">
                <Link href="/" passHref>
                    <Button variant="ghost">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar
                    </Button>
                </Link>
                <Button onClick={generateNewCard}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Gerar Nova Cartela
                </Button>
            </header>
            
            <main className="w-full max-w-2xl">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-center text-3xl font-bold flex items-center justify-center gap-2">
                            <Star className="text-primary"/>
                            Minha Cartela de Bingo
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6">
                        <div className="grid grid-cols-5 gap-2 md:gap-4">
                            {cardNumbers.map((number, index) => {
                                const isMarked = markedNumbers.has(number);
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleNumberClick(number)}
                                        className={cn(
                                            "aspect-square w-full rounded-lg flex items-center justify-center text-xl md:text-2xl font-bold transition-all duration-200 ease-in-out transform hover:scale-110",
                                            isMarked
                                                ? "bg-accent text-accent-foreground shadow-inner scale-105"
                                                : "bg-primary/10 text-primary hover:bg-primary/20",
                                            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        )}
                                        aria-pressed={isMarked}
                                    >
                                        {number}
                                    </button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
