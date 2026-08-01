export interface ContactRequest {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  updated_at?: string | null;
}

export interface ApiError {
  message: string;
  details?: unknown;
}
