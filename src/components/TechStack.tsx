import { Card, CardContent } from "@/components/ui/card";
import { Code, Database, Lock, Cpu, Cloud, Container } from "lucide-react";

const technologies = [
  {
    icon: Code,
    name: "Python & NLP Libraries",
    description: "PyTorch, TensorFlow, Transformers"
  },
  {
    icon: Cpu,
    name: "Large Language Models",
    description: "GPT, Llama, Flan-T5 (Fine-tuned)"
  },
  {
    icon: Database,
    name: "Vector Database",
    description: "Supabase with PostgreSQL"
  },
  {
    icon: Lock,
    name: "Security",
    description: "HIPAA-compliant infrastructure"
  },
  {
    icon: Cloud,
    name: "RAG Framework",
    description: "Retrieval-Augmented Generation"
  },
  {
    icon: Container,
    name: "Deployment",
    description: "Docker containerization"
  }
];

export const TechStack = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Technology Stack
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built on modern, specialized technologies designed for large-scale machine learning and clinical data processing
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <Card 
                key={index}
                className="hover:shadow-md transition-all duration-300 border-border bg-card group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-card-foreground mb-2">
                        {tech.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
