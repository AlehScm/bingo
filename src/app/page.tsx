import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Ticket, LayoutGrid, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold text-primary tracking-tighter">
          MobileMatch
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">Seu app de sorteios e bingo</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <Card className="hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out border-2 border-primary/10 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-8 flex flex-col items-center justify-center text-center">
            <Ticket className="w-16 h-16 text-primary mb-4" />
            <h2 className="text-3xl font-bold mb-2">Sorteador</h2>
            <p className="text-muted-foreground mb-6">
              Sorteie números de 1 a 90, sem repetição. Acompanhe o histórico de sorteios.
            </p>
            <Link href="/sorteador" passHref>
              <Button size="lg" className="w-full">
                Começar Sorteio
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out border-2 border-primary/10 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-8 flex flex-col items-center justify-center text-center">
            <LayoutGrid className="w-16 h-16 text-primary mb-4" />
            <h2 className="text-3xl font-bold mb-2">Participante</h2>
            <p className="text-muted-foreground mb-6">
              Gere sua cartela de bingo personalizada e marque os números sorteados.
            </p>
            <Link href="/participante" passHref>
              <Button size="lg" className="w-full">
                Gerar Cartela
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <footer className="mt-16 text-center text-muted-foreground text-sm">
        <p>Criado para diversão e jogos. Boa sorte!</p>
      </footer>
    </main>
  );
}
