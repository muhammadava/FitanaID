export interface Medicine {
  id: string;
  name: string;
  slug: string;
  category: "herbal" | "kimia" | "vitamin" | "suplemen";
  sub_category?: string;
  brand_name?: string;
  generic_name?: string;
  description: string;
  uses: string[];
  side_effects: string[];
  dosage?: string;
  form?: string;
  contraindications: string[];
  drug_interactions: string[];
  drug_class?: string;
  price_min?: number;
  price_max?: number;
  tags: string[];
  is_pro: boolean;
  image_url?: string;
  relevance_score?: Record<string, number>;
  created_at?: string;
}

export interface MedicineListResponse {
  items: Medicine[];
  total: number;
  page: number;
  pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface ConsultationQuestion {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
    tags: Record<string, number>;
    contraindications?: string[];
  }[];
}

export interface RecommendationItem {
  medicine: Medicine;
  score: number;
  match_percent: number;
  matched_tags: string[];
}

export interface ConsultationResult {
  session_id: string;
  category: string;
  recommendations: RecommendationItem[];
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  display_name?: string;
  username?: string;
  profile_picture?: string;
  is_pro: boolean;
  created_at: string;
}

export interface ConsultationHistory {
  id: string;
  category: string;
  created_at: string;
  result_count: number;
  top_medicine_name?: string;
}

export type MedicineCategory = "herbal" | "kimia" | "vitamin" | "suplemen";
