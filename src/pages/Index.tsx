import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { SummarizationInterface } from "@/components/SummarizationInterface";
import { TechStack } from "@/components/TechStack";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <div id="features">
          <Features />
        </div>
        <div id="summarize">
          <SummarizationInterface />
        </div>
        <div id="technology">
          <TechStack />
        </div>
      </main>
      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 MediSummarize - Automated Healthcare Record Summarization Using LLM
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            Built with advanced AI technology for healthcare professionals
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
