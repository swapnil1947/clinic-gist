import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, Loader2, Download, Copy, CheckCircle2, User, Activity, Pill, FlaskConical, ClipboardList, AlertTriangle, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface StructuredSummary {
  patient_id: string;
  patient_name: string;
  age: string;
  gender: string;
  admission_date: string;
  discharge_date: string;
  symptoms: string[];
  diagnosis: string[];
  medications: string[];
  lab_results: string[];
  procedures: string[];
  vital_signs: string;
  treatment_plan: string;
  follow_up: string;
  clinical_notes: string;
  risk_factors: string[];
  allergies: string[];
}

export const SummarizationInterface = () => {
  const [recordText, setRecordText] = useState("");
  const [summaryType, setSummaryType] = useState("discharge");
  const [summary, setSummary] = useState<StructuredSummary | null>(null);
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
    setSummary(null);

    try {
      const { data, error } = await supabase.functions.invoke("summarize", {
        body: { recordText: recordText.trim(), summaryType },
      });

      if (error) throw error;

      if (data?.error) {
        toast({ title: "Error", description: data.error, variant: "destructive" });
      } else if (data?.summary) {
        setSummary(data.summary);
        toast({ title: "Summary Generated", description: "Healthcare record has been analyzed and structured." });
      }
    } catch (e: any) {
      console.error("Summarization error:", e);
      toast({ title: "Error", description: e.message || "Failed to generate summary.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const summaryToText = () => {
    if (!summary) return "";
    return `PATIENT SUMMARY
================
Patient ID: ${summary.patient_id}
Patient Name: ${summary.patient_name}
Age: ${summary.age}
Gender: ${summary.gender}
Admission Date: ${summary.admission_date}
Discharge Date: ${summary.discharge_date}

SYMPTOMS:
${summary.symptoms.length ? summary.symptoms.map(s => `• ${s}`).join("\n") : "None specified"}

DIAGNOSIS:
${summary.diagnosis.length ? summary.diagnosis.map(d => `• ${d}`).join("\n") : "None specified"}

MEDICATIONS:
${summary.medications.length ? summary.medications.map(m => `• ${m}`).join("\n") : "None specified"}

LAB RESULTS:
${summary.lab_results.length ? summary.lab_results.map(l => `• ${l}`).join("\n") : "None specified"}

PROCEDURES:
${summary.procedures.length ? summary.procedures.map(p => `• ${p}`).join("\n") : "None specified"}

VITAL SIGNS: ${summary.vital_signs}

TREATMENT PLAN: ${summary.treatment_plan}

FOLLOW-UP: ${summary.follow_up}

RISK FACTORS:
${summary.risk_factors.length ? summary.risk_factors.map(r => `• ${r}`).join("\n") : "None specified"}

ALLERGIES:
${summary.allergies.length ? summary.allergies.map(a => `• ${a}`).join("\n") : "None specified"}

CLINICAL NOTES:
${summary.clinical_notes}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryToText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copied", description: "Summary copied to clipboard." });
  };

  const handleDownload = () => {
    const blob = new Blob([summaryToText()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `summary-${summaryType}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Downloaded", description: "Summary has been downloaded." });
  };

  const renderArrayField = (items: string[], icon: React.ReactNode, label: string) => (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        {icon}
        {label}
      </div>
      {items.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {items.map((item, i) => (
            <Badge key={i} variant="secondary" className="text-xs font-normal">
              {item}
            </Badge>
          ))}
        </div>
      ) : (
        <span className="text-xs text-muted-foreground">Not specified</span>
      )}
    </div>
  );

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Generate Clinical Summary
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Input healthcare record data and get AI-powered structured clinical summaries with patient ID, symptoms, diagnosis, and more
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Card */}
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
                    Analyzing with AI...
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

          {/* Output Card */}
          <Card className="shadow-md border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                Structured Summary
              </CardTitle>
              <CardDescription>
                AI-extracted clinical data organized by category
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="min-h-[380px] p-4 rounded-lg bg-muted border border-border overflow-y-auto max-h-[500px]">
                {summary ? (
                  <div className="space-y-4">
                    {/* Patient Info */}
                    <div className="grid grid-cols-2 gap-3 p-3 rounded-md bg-background border border-border">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">Patient ID</p>
                          <p className="text-sm font-semibold text-foreground">{summary.patient_id}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Name</p>
                        <p className="text-sm font-semibold text-foreground">{summary.patient_name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Age</p>
                        <p className="text-sm text-foreground">{summary.age}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Gender</p>
                        <p className="text-sm text-foreground">{summary.gender}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Admission</p>
                        <p className="text-sm text-foreground">{summary.admission_date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Discharge</p>
                        <p className="text-sm text-foreground">{summary.discharge_date}</p>
                      </div>
                    </div>

                    {renderArrayField(summary.symptoms, <Activity className="w-4 h-4 text-red-500" />, "Symptoms")}
                    {renderArrayField(summary.diagnosis, <ClipboardList className="w-4 h-4 text-primary" />, "Diagnosis")}
                    {renderArrayField(summary.medications, <Pill className="w-4 h-4 text-blue-500" />, "Medications")}
                    {renderArrayField(summary.lab_results, <FlaskConical className="w-4 h-4 text-green-500" />, "Lab Results")}
                    {renderArrayField(summary.procedures, <ClipboardList className="w-4 h-4 text-purple-500" />, "Procedures")}

                    {/* Vital Signs */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Heart className="w-4 h-4 text-red-500" />
                        Vital Signs
                      </div>
                      <p className="text-xs text-muted-foreground">{summary.vital_signs}</p>
                    </div>

                    {/* Treatment Plan */}
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">Treatment Plan</p>
                      <p className="text-xs text-muted-foreground">{summary.treatment_plan}</p>
                    </div>

                    {/* Follow-up */}
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">Follow-up</p>
                      <p className="text-xs text-muted-foreground">{summary.follow_up}</p>
                    </div>

                    {renderArrayField(summary.risk_factors, <AlertTriangle className="w-4 h-4 text-yellow-500" />, "Risk Factors")}
                    {renderArrayField(summary.allergies, <AlertTriangle className="w-4 h-4 text-orange-500" />, "Allergies")}

                    {/* Clinical Notes */}
                    <div className="space-y-1 pt-2 border-t border-border">
                      <p className="text-sm font-semibold text-foreground">Clinical Notes</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{summary.clinical_notes}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                    Structured summary will appear here after generation
                  </div>
                )}
              </div>

              {summary && (
                <div className="flex gap-2">
                  <Button onClick={handleCopy} variant="outline" className="flex-1">
                    <Copy className="w-4 h-4 mr-2" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                  <Button onClick={handleDownload} variant="outline" className="flex-1">
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
