import { Brain, Database, Shield, Zap, FileCheck, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "Advanced LLM Technology",
    description: "Fine-tuned Large Language Models specialized in medical terminology and clinical documentation patterns.",
    color: "text-primary"
  },
  {
    icon: Database,
    title: "RAG Architecture",
    description: "Retrieval-Augmented Generation ensures factual accuracy by referencing specific data from original records.",
    color: "text-accent"
  },
  {
    icon: Shield,
    title: "Data Privacy & Security",
    description: "HIPAA-compliant infrastructure with end-to-end encryption to protect sensitive patient information.",
    color: "text-primary"
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description: "Generate comprehensive summaries in seconds, significantly reducing documentation time.",
    color: "text-accent"
  },
  {
    icon: FileCheck,
    title: "Multiple Summary Types",
    description: "Support for discharge summaries, progress notes, and specialty consultation reports.",
    color: "text-primary"
  },
  {
    icon: Users,
    title: "Clinical Validation",
    description: "Summaries validated using automated metrics and expert medical professional review.",
    color: "text-accent"
  }
];

export const Features = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Key Features & Capabilities
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powered by cutting-edge AI technology and designed for healthcare professionals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 border-border bg-card"
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-card-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
