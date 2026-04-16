import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { recordText, summaryType } = await req.json();

    if (!recordText || typeof recordText !== "string" || recordText.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Record text is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are a clinical summarization AI specialized in healthcare record analysis. Given raw healthcare record text, extract and return a structured clinical summary.

You MUST respond with a valid JSON object with these exact fields:
{
  "patient_id": "Extract patient ID/MRN if present, otherwise generate a placeholder like 'PT-XXXX'",
  "patient_name": "Extract patient name if present, otherwise 'Not specified'",
  "age": "Extract age if present, otherwise 'Not specified'",
  "gender": "Extract gender if present, otherwise 'Not specified'",
  "admission_date": "Extract admission date if present, otherwise 'Not specified'",
  "discharge_date": "Extract discharge date if present, otherwise 'Not specified'",
  "symptoms": ["Array of identified symptoms"],
  "diagnosis": ["Array of diagnoses"],
  "medications": ["Array of medications with dosages if available"],
  "lab_results": ["Array of key lab findings"],
  "procedures": ["Array of procedures performed"],
  "vital_signs": "Summary of vital signs if present",
  "treatment_plan": "Summary of treatment plan",
  "follow_up": "Follow-up instructions",
  "clinical_notes": "Brief clinical narrative summary",
  "risk_factors": ["Array of identified risk factors"],
  "allergies": ["Array of known allergies"]
}

Summary type requested: ${summaryType || "discharge"}
- For "discharge": Focus on comprehensive hospital stay summary
- For "progress": Focus on current status and daily changes  
- For "consultation": Focus on specialty-relevant history and recommendations

Extract as much information as possible from the text. For fields where information is not available, use "Not specified" for strings or empty arrays for arrays.
IMPORTANT: Return ONLY the JSON object, no markdown, no code blocks, no extra text.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Please summarize the following healthcare record:\n\n${recordText.slice(0, 10000)}` },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content || "";
    
    // Clean markdown code blocks if present
    content = content.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();

    let structured;
    try {
      structured = JSON.parse(content);
    } catch {
      // If JSON parse fails, return raw as clinical_notes
      structured = {
        patient_id: "Not specified",
        patient_name: "Not specified",
        age: "Not specified",
        gender: "Not specified",
        admission_date: "Not specified",
        discharge_date: "Not specified",
        symptoms: [],
        diagnosis: [],
        medications: [],
        lab_results: [],
        procedures: [],
        vital_signs: "Not specified",
        treatment_plan: "Not specified",
        follow_up: "Not specified",
        clinical_notes: content,
        risk_factors: [],
        allergies: [],
      };
    }

    return new Response(JSON.stringify({ summary: structured }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Summarize error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
