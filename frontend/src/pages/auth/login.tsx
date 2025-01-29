import { useEffect, useState } from 'react';
import { AuthLayout } from '@/components/layouts';
import { LoginForm } from '@/components/auth/login-form';
import { fetchOrganizationBySubdomain } from '@/lib/api/org';
import { Organization } from '@/types/schema';

interface LoginPageProps {
  subdomain: string;
}

export default function LoginPage({ subdomain }: LoginPageProps) {
  const [organizationInfo, setOrganizationInfo] = useState<Organization | null>(null);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const organization = await fetchOrganizationBySubdomain(subdomain);
        setOrganizationInfo(organization);
      } catch (error) {
        console.error('Error fetching organization:', error);
      }
    };

    if (subdomain) {
      fetchOrganization();
    }
  }, [subdomain]);

  return (
    <AuthLayout>
      <LoginForm orgInfo={organizationInfo} />
    </AuthLayout>
  );
}
