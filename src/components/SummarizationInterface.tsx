import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Loader2, Download, Copy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SummarizationInterface = () => {
  const [recordText, setRecordText] = useState("");
  const [summaryType, setSummaryType] = useState("discharge");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!recordText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter healthcare record text to summarize.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockSummary = generateMockSummary(summaryType, recordText);
      setSummary(mockSummary);
      setIsLoading(false);
      toast({
        title: "Summary Generated",
        description: "Your healthcare record has been successfully summarized.",
      });
    }, 2000);
  };

  const generateMockSummary = (type: string, text: string) => {
    const summaries: Record<string, string> = {
      discharge: `DISCHARGE SUMMARY\n\nPatient was admitted with presenting symptoms and underwent comprehensive evaluation. Treatment plan included medication management and therapeutic interventions. Patient showed positive response to treatment with improved clinical parameters. Discharge instructions provided including medication schedule, follow-up appointments, and activity restrictions. Patient educated on warning signs requiring immediate medical attention.`,
      progress: `PROGRESS NOTE\n\nPatient Status: Stable and improving\nVital Signs: Within normal limits\nCurrent Treatment: Continuing prescribed medication regimen\nResponse to Treatment: Positive clinical improvement noted\nPlan: Continue current management, monitor progress, scheduled follow-up in 1 week`,
      consultation: `SPECIALTY CONSULTATION SUMMARY\n\nReason for Consultation: Comprehensive specialty evaluation\nRelevant History: Patient presents with pertinent medical history and current symptoms\nFindings: Clinical examination reveals significant observations\nRecommendations: Suggested treatment modifications and additional diagnostic studies\nFollow-up: Specialty clinic appointment scheduled`
    };
    
    return summaries[type] || summaries.discharge;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied",
      description: "Summary copied to clipboard.",
    });
  };

  const handleDownload = () => {
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `summary-${summaryType}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded",
      description: "Summary has been downloaded successfully.",
    });
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Generate Clinical Summary
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Input healthcare record data and select summary type to generate AI-powered clinical abstracts
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="shadow-md border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Input Healthcare Record
              </CardTitle>
              <CardDescription>
                Paste or type the healthcare record text to be summarized
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="summary-type">Summary Type</Label>
                <Select value={summaryType} onValueChange={setSummaryType}>
                  <SelectTrigger id="summary-type" className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discharge">Discharge Summary</SelectItem>
                    <SelectItem value="progress">Progress Notes</SelectItem>
                    <SelectItem value="consultation">Specialty Consultation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="record-text">Healthcare Record Text</Label>
                <Textarea
                  id="record-text"
                  placeholder="Enter patient healthcare record details including symptoms, diagnosis, treatment, medications, lab results, and clinical observations..."
                  value={recordText}
                  onChange={(e) => setRecordText(e.target.value)}
                  rows={12}
                  className="resize-none bg-background"
                />
              </div>

              <Button 
                onClick={handleSummarize} 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating Summary...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Summary
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-md border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                Generated Summary
              </CardTitle>
              <CardDescription>
                AI-generated clinical summary with key information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="min-h-[380px] p-4 rounded-lg bg-muted border border-border">
                {summary ? (
                  <div className="whitespace-pre-wrap text-sm text-foreground leading-relaxed">
                    {summary}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                    Summary will appear here after generation
                  </div>
                )}
              </div>

              {summary && (
                <div className="flex gap-2">
                  <Button 
                    onClick={handleCopy} 
                    variant="outline"
                    className="flex-1"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                  <Button 
                    onClick={handleDownload}
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
