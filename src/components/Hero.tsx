import { Button } from "@/components/ui/button";
import { FileText, Brain, Shield, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-subtle">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDk2ODgiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyem0wLTR2Mkgy' +
        'NGgtMmgxMnptMC00djJIMjR2LTJoMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            <Brain className="w-4 h-4" />
            AI-Powered Healthcare Innovation
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Automated Healthcare Record
            <span className="block bg-gradient-primary bg-clip-text text-transparent mt-2">
              Summarization System
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Leverage advanced Large Language Models to transform complex medical records 
            into concise, accurate clinical summaries. Enhance decision-making and reduce 
            documentation time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all"
            >
              <FileText className="w-5 h-5 mr-2" />
              Start Summarizing
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary/30 hover:bg-primary/5"
            >
              Learn More
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12">
            <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">
                Fine-tuned LLM with medical terminology expertise
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">HIPAA Compliant</h3>
              <p className="text-sm text-muted-foreground">
                Secure handling of sensitive patient data
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">Fast & Accurate</h3>
              <p className="text-sm text-muted-foreground">
                Generate summaries in seconds with high precision
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
