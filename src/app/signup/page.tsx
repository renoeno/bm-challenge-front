'use client';

import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Logo } from '@/components/common/Logo';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const { login, error, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/dashboard';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    
    try {
      await login({ email, password });
      router.push(redirectPath); // Redirect after successful login
    } catch (err) {
      if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className='w-full flex justify-center items-center gap-x-[130px] bg-white'>
        <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className='mb-6'><Logo /></div>
            <div className="w-full max-w-md rounded-3xl space-y-4 px-20 py-7 bg-white shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
                <div>
                <h2 className="text-2xl text-center  font-bold tracking-tight">
                    Create your account
                </h2>
                </div>
                
                {(error || formError) && (
                <div className="rounded-md bg-red-50 p-4">
                    <div className="text-sm text-red-700">
                    {error || formError}
                    </div>
                </div>
                )}
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm flex flex-col gap-4">
                        <div>
                            <label htmlFor="email-address" className='text-sm text-custom-dark-gray' >
                                Email
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="w-[276px] relative block rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-[#AEB0B3B2]  focus:ring-indigo-600"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            </div>
                        <div>
                            <label htmlFor="password"  className='text-sm text-custom-dark-gray' >
                                Senha
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="w-[276px] relative block  rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-[#AEB0B3B2]  focus:ring-indigo-600"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password-confirmation"  className='text-sm text-custom-dark-gray' >
                                Confirme sua senha
                            </label>
                            <input
                                id="password-confirmation"
                                name="password-confirmation"
                                type="password-confirmation"
                                autoComplete="current-password-confirmation"
                                required
                                className="w-[276px] relative block  rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-[#AEB0B3B2]  focus:ring-indigo-600"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='flex flex-col gap-4 items-center'>
                        <button
                        type="submit"
                        disabled={loading}
                        className="group relative flex w-full justify-center rounded-md bg-custom-main-green py-2 px-3 text-sm font-semibold text-white hover:bg-custom-auxiliar-green disabled:bg-gray-200"
                        >
                        {loading ? 'Logando...' : 'Entrar'}
                        </button>

                        <button
                            disabled={loading}
                            className="group relative w-fit flex justify-center rounded-md border border-solid border-custom-main-gray bg-white py-1 px-6 text-[12px] text-custom-main-gray hover:bg-gray-100 disabled:bg-gray-200 disabled:border-none"
                        >
                            Esqueci minha senha
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div>
            <div className='bg-custom-auxiliar-green p-4 rounded-2xl'>
                <div className='px-10 pb-10 pt-24'>
                    <p className='text-3xl text-white font-bold text-center'>Bem-vindo(a) ao the Library!</p>
                    <p className='text-white text-base'>Crie sua conta para utilizar a plataforma</p>

                </div>
            </div>
            <div className='bg-custom-auxiliar-green pr-12 rounded-2xl'>
                <div className=' bg-custom-main-yellow rounded-2xl'>
                    <Image
                    src="/images/img-bm.png" 
                    alt="Login Image"
                    width={547}  
                    height={595} 
                    />
                </div>
            </div>
        </div>
    </div>
  );
}