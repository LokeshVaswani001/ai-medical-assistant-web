export type Symptom = { id: string; label: string };
export type Disease = { name: string; confidence: number; description: string; advice: string };
export type Hospital = { id: string; name: string; type: string; distanceKm: number; address: string };
export type Medicine = { id: string; name: string; dosage: string; time: string; taken: boolean };
export type Vital = { day: string; heartRate: number; spo2: number };

export const SYMPTOMS: Symptom[] = [
  { id: "fever", label: "Fever" },
  { id: "headache", label: "Headache" },
  { id: "cough", label: "Cough" },
  { id: "bodyache", label: "Body Ache" },
  { id: "sorethroat", label: "Sore Throat" },
  { id: "fatigue", label: "Fatigue" },
  { id: "nausea", label: "Nausea" },
  { id: "chestpain", label: "Chest Pain" },
  { id: "shortbreath", label: "Shortness of Breath" },
  { id: "dizziness", label: "Dizziness" },
];

// Simple mock rule-engine — in production this call goes to a real ML backend API
export function predictDiseases(selected: string[]): Disease[] {
  if (selected.length === 0) return [];
  const results: Disease[] = [];

  if (selected.includes("fever") && selected.includes("bodyache")) {
    results.push({
      name: "Viral Fever",
      confidence: 82,
      description: "A common viral infection causing fever and body aches.",
      advice: "Rest, stay hydrated, and monitor temperature. See a doctor if fever exceeds 102°F.",
    });
  }
  if (selected.includes("cough") && selected.includes("sorethroat")) {
    results.push({
      name: "Common Cold",
      confidence: 74,
      description: "Mild upper respiratory infection.",
      advice: "Warm fluids, rest, and steam inhalation usually help within a few days.",
    });
  }
  if (selected.includes("chestpain") && selected.includes("shortbreath")) {
    results.push({
      name: "Possible Cardiac / Respiratory Concern",
      confidence: 65,
      description: "Combination of chest pain and breathing difficulty needs urgent attention.",
      advice: "Please seek emergency medical care immediately — do not delay.",
    });
  }
  if (selected.includes("headache") && selected.includes("dizziness")) {
    results.push({
      name: "Migraine / Low Blood Pressure",
      confidence: 58,
      description: "Could relate to migraine episodes or blood pressure fluctuation.",
      advice: "Rest in a dark room, stay hydrated, consult a doctor if it recurs frequently.",
    });
  }
  if (selected.includes("fatigue") && selected.includes("nausea")) {
    results.push({
      name: "Gastric Infection",
      confidence: 55,
      description: "Possible mild digestive system infection.",
      advice: "Light diet, hydration, and rest. Consult a doctor if symptoms persist over 2 days.",
    });
  }

  if (results.length === 0) {
    results.push({
      name: "General Malaise",
      confidence: 40,
      description: "Symptoms are non-specific based on current selection.",
      advice: "Monitor your symptoms. Consult a doctor if they worsen or persist.",
    });
  }

  return results.sort((a, b) => b.confidence - a.confidence);
}

export const HOSPITALS: Hospital[] = [
  { id: "1", name: "City Care General Hospital", type: "Hospital", distanceKm: 1.2, address: "Main Boulevard, Sector 5" },
  { id: "2", name: "LifeLine Medical Center", type: "Hospital", distanceKm: 2.4, address: "Garden Town Road" },
  { id: "3", name: "QuickTest Diagnostics Lab", type: "Lab", distanceKm: 0.8, address: "Block C, Commercial Area" },
  { id: "4", name: "Wellness Family Clinic", type: "Clinic", distanceKm: 1.9, address: "Near City Park" },
  { id: "5", name: "St. Mary's Hospital", type: "Hospital", distanceKm: 3.6, address: "Canal View Avenue" },
];

export const MEDICINES: Medicine[] = [
  { id: "1", name: "Paracetamol 500mg", dosage: "1 tablet", time: "08:00 AM", taken: true },
  { id: "2", name: "Amoxicillin 250mg", dosage: "1 capsule", time: "02:00 PM", taken: false },
  { id: "3", name: "Vitamin D3", dosage: "1 tablet", time: "09:00 PM", taken: false },
];

export const VITALS: Vital[] = [
  { day: "Mon", heartRate: 72, spo2: 98 },
  { day: "Tue", heartRate: 75, spo2: 97 },
  { day: "Wed", heartRate: 70, spo2: 98 },
  { day: "Thu", heartRate: 78, spo2: 96 },
  { day: "Fri", heartRate: 74, spo2: 98 },
  { day: "Sat", heartRate: 71, spo2: 99 },
  { day: "Sun", heartRate: 73, spo2: 98 },
];
