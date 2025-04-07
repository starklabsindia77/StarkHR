import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/lib/auth/auth-context';
import { DEFAULT_USERS } from '@/lib/constants/roles';
import { getDefaultRoute } from '@/lib/auth/protected-routes';
import { Organization } from '@/types/schema';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
});


interface LoginFormProps {
  orgInfo: Organization | null;
}

export function LoginForm({ orgInfo }: LoginFormProps) {
  console.log('orgInfo ===>', orgInfo);
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const login = await signIn(values.email, values.password);
      console.log('login ====>', login);
      if (login !== undefined) {
        toast({
          title: 'Success',
          description: 'You have successfully logged in',
          duration: 3000,
        });
        const userConfig = login;

        // Find the user's role to determine the redirect route
        // const userConfig = DEFAULT_USERS.find(
        //   (user) => user.email === values.email
        // );
        if (!userConfig) {
          throw new Error('User configuration not found');
        }

        // Navigate to the appropriate dashboard
        const redirectPath = getDefaultRoute(userConfig.role);
        console.log('redirect path ===> ', redirectPath);
        navigate(redirectPath);
        // setTimeout(() => {
        //   navigate(redirectPath);
        // }, 500);
      }
      // Show success toast
      // Small delay to ensure toast is visible
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Invalid email or password',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Input type="email" placeholder="Email" {...form.register('email')} />
          {form.formState.errors.email && (
            <p className="text-sm text-destructive">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Password"
            {...form.register('password')}
          />
          {form.formState.errors.password && (
            <p className="text-sm text-destructive">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <div className="space-y-4 border-t pt-4">
        <p className="text-sm text-muted-foreground text-center">
          Demo Accounts
        </p>
        <div className="grid gap-2 text-sm">
          {DEFAULT_USERS.map((user) => (
            <div
              key={user.email}
              className="flex justify-between items-center p-2 border rounded"
            >
              <div>
                <p className="font-medium">{user.role}</p>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                disabled={loading}
                onClick={() => {
                  form.setValue('email', user.email);
                  form.setValue('password', user.password);
                }}
              >
                Use
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
