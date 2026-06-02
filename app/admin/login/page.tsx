import { Suspense } from 'react';
import { Logo } from '@/components/Logo';
import { LoginForm } from './LoginForm';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-site-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <div className="bg-white rounded-sm shadow-xl p-8">
          <h1 className="text-xl font-black mb-1">Admin Access</h1>
          <p className="text-sm text-gray-500 mb-6">Enter your admin password to continue.</p>
          <Suspense fallback={<div className="h-24 animate-pulse bg-gray-100 rounded" />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
