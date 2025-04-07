import { Organization } from '@/types/schema';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const API_BASE_URL = '/api/organizations';



/**
 * Fetches organization details based on the subdomain.
 * @param {string} subdomain - The subdomain to query.
 * @returns {Promise<Organization>} - The organization data.
 */
export const fetchOrganizationBySubdomain = async (subdomain: string): Promise<Organization> => {
    try {
      const response = await axios.get(`${API_URL}${API_BASE_URL}/subdomain/${subdomain}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching organization by subdomain:', error);
      throw error;
    }
  };
  
  /**
   * Fetches all organizations that match a host pattern.
   * @param {string} host - The host to query.
   * @returns {Promise<Organization[]>} - List of organizations matching the host.
   */
  export const fetchOrganizationsByHost = async (host: string): Promise<Organization[]> => {
    try {
      const response = await axios.get(`${API_URL}/${API_BASE_URL}?host=${host}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching organizations by host:', error);
      throw error;
    }
  };