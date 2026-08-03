export type Symptom = { id: string; label: string };
export type Disease = { name: string; confidence: number; description: string; advice: string };
export type Hospital = { 
  id: string; 
  name: string; 
  type: string; 
  distanceKm: number; 
  address: string; 
  lat: number; 
  lng: number; 
};
export type Medicine = { id: string; name: string; dosage: string; time: string; taken: boolean };
export type Vital = { day: string; heartRate: number; spo2: number };

const API_BASE_URL = 'http://localhost:5000/api';

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

// Backend API Connected Prediction Function
export async function predictDiseases(selected: string[]): Promise<Disease[]> {
  if (selected.length === 0) return [];

  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symptoms: selected }),
    });

    const data = await response.json();
    if (data.success && data.prediction) {
      return [
        {
          name: data.prediction,
          confidence: 88,
          description: data.description,
          advice: data.advice,
        },
      ];
    }
  } catch (error) {
    console.error('Backend connection error:', error);
  }

  // Fallback if backend is offline
  return [
    {
      name: "General Assessment",
      confidence: 50,
      description: "Could not connect to backend server.",
      advice: "Please check if your backend server is running on port 5000.",
    },
  ];
}

export const HOSPITALS: Hospital[] = [
  { 
    id: "1", 
    name: "City Care General Hospital", 
    type: "Hospital", 
    distanceKm: 1.2, 
    address: "Main Boulevard, Sector 5",
    lat: 32.5855,
    lng: 73.4912
  },
  { 
    id: "2", 
    name: "LifeLine Medical Center", 
    type: "Hospital", 
    distanceKm: 2.4, 
    address: "Garden Town Road",
    lat: 32.5790,
    lng: 73.4850
  },
  { 
    id: "3", 
    name: "QuickTest Diagnostics Lab", 
    type: "Lab", 
    distanceKm: 0.8, 
    address: "Block C, Commercial Area",
    lat: 32.5820,
    lng: 73.4780
  },
  { 
    id: "4", 
    name: "Wellness Family Clinic", 
    type: "Clinic", 
    distanceKm: 1.9, 
    address: "Near City Park",
    lat: 32.5900,
    lng: 73.4950
  },
  { 
    id: "5", 
    name: "St. Mary's Hospital", 
    type: "Hospital", 
    distanceKm: 3.6, 
    address: "Canal View Avenue",
    lat: 32.5750,
    lng: 73.5020
  },
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