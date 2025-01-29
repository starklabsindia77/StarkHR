// Add User type if not already present
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  organization_id?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  last_sign_in_at?: string;
  is_active: boolean;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  subdomain: string;
  settings: {
    industry: string;
    size: string;
    website?: string;
    gstNumber?: string;
    panNumber?: string;
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    logoUrl?: string;
  };
  createdAt: string;
  updatedAt: string;
}

