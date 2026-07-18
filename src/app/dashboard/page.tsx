import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/login');
  }

  const role = (session.user as any).role;

  switch (role) {
    case 'BUYER':
      redirect('/dashboard/buyer');
      break;
    case 'SELLER':
      redirect('/dashboard/seller');
      break;
    case 'ADMIN':
      redirect('/admin/dashboard');
      break;
    case 'SERVICE_PROVIDER':
      redirect('/dashboard/partner');
      break;
    default:
      // Fallback
      redirect('/dashboard/buyer');
  }
}
