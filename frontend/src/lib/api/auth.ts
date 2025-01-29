import { User } from '@/types/schema';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  address: string;

  // Organization Info
  companyName: string;
  industry: string;
  size: string;
  website?: string;
  gstNumber?: string;
  panNumber?: string;
  logo?: File;

  // Address Info
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;

  // Subscription
  subscriptionPlan: string;

  // Verification
  terms: boolean;
  updates: boolean;

  // Password
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  organization: {
    id: string;
    name: string;
    slug: string;
  };
}

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

class AuthService {
  private static instance: AuthService;
  private token: string | null = null;

  private constructor() {
    // Initialize token from localStorage if exists
    this.token = localStorage.getItem('token');
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_URL}/api/auth/${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'An error occurred');
    }

    return response.json();
  }

  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    this.token = response.token;
    localStorage.setItem('token', response.token);
    return response;
  }

  public async register(data: RegisterData): Promise<AuthResponse> {
    // Handle file upload with FormData
    // const formData = new FormData();
    // Object.entries(data).forEach(([key, value]) => {
    //   if (value instanceof File) {
    //     formData.append(key, value);
    //   } else if (typeof value === 'boolean') {
    //     formData.append(key, value.toString());
    //   } else if (value !== undefined && value !== null) {
    //     formData.append(key, String(value));
    //   }
    // });
    // console.log('Form Data:', JSON.stringify(formData));
  
    // const response = await this.request<AuthResponse>('register', {
    //   method: 'POST',
    //   body: JSON.stringify(data), // Use JSON.stringify,
    // });

    const response = await axiosInstance.post(`/api/auth/register`, data);

    console.log('Registration Response:', response.data);
    this.token = response.data.token;
    localStorage.setItem('token', response.data.token);
    return response.data;
  }

  public async logout(): Promise<void> {
    this.token = null;
    localStorage.removeItem('token');
  }

  public async getCurrentUser(): Promise<User | null> {
    if (!this.token) {
      return null;
    }

    try {
      const response = await this.request<{ user: User }>('me');
      return response.user;
    } catch (error) {
      console.log('Error fetching current user:', error);
      this.logout();
      return null;
    }
  }

  public async forgotPassword(email: string): Promise<void> {
    await this.request('forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  public async resetPassword(token: string, password: string): Promise<void> {
    await this.request('reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
  }

  public async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    await this.request('update-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public getToken(): string | null {
    return this.token;
  }
}

export const  authService = AuthService.getInstance();