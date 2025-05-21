'use client';

import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Logo } from '@/components/common/Logo';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import { z } from 'zod';

// Define Zod schema with complex password validation
const signupSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
    password: z
      .string()
      .min(1, 'Senha é obrigatória')
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
        'Senha deve conter ao menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
      ),
    passwordConfirmation: z
      .string()
      .min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirmation'],
  });

// Define type for form errors
type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
};

export default function SignupPage() {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const { signup, error, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/';

  const validateForm = () => {
    try {
      signupSchema.parse({ name, email, password, passwordConfirmation });
      setFieldErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: FormErrors = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof FormErrors;
          errors[path] = err.message;
        });
        setFieldErrors(errors);

        // Set the first error message as the form error
        setFormError(error.errors[0].message);
      }
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    try {
      await signup({ name, email, password });
      router.push(redirectPath);
    } catch (err) {
      if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError('Registro falhou. Por favor, tente novamente.');
      }
    }
  };

  return (
    <div className="w-full flex justify-center items-center gap-x-[130px] bg-white">
      <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Logo />
        </div>
        <div className="w-full max-w-md rounded-3xl space-y-4 px-20 py-7 bg-white shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
          <div>
            <h2 className="text-2xl text-center  font-bold tracking-tight">
              Create your account
            </h2>
          </div>

          {(error || formError) && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error || formError}</div>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="text-sm text-custom-dark-gray">
                  Nome
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className={`w-[276px] relative block rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ${
                    fieldErrors.name
                      ? 'ring-red-500 focus:ring-red-500'
                      : 'ring-[#AEB0B3B2] focus:ring-indigo-600'
                  }`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-xs text-red-600">
                    {fieldErrors.name}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email-address"
                  className="text-sm text-custom-dark-gray"
                >
                  Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`w-[276px] relative block rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ${
                    fieldErrors.email
                      ? 'ring-red-500 focus:ring-red-500'
                      : 'ring-[#AEB0B3B2] focus:ring-indigo-600'
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-xs text-red-600">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-sm text-custom-dark-gray"
                >
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`w-[276px] relative block rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ${
                    fieldErrors.password
                      ? 'ring-red-500 focus:ring-red-500'
                      : 'ring-[#AEB0B3B2] focus:ring-indigo-600'
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {fieldErrors.password && (
                  <p className="mt-1 text-xs text-red-600">
                    {fieldErrors.password}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password-confirmation"
                  className="text-sm text-custom-dark-gray"
                >
                  Confirme sua senha
                </label>
                <input
                  id="password-confirmation"
                  name="password-confirmation"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`w-[276px] relative block rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ${
                    fieldErrors.passwordConfirmation
                      ? 'ring-red-500 focus:ring-red-500'
                      : 'ring-[#AEB0B3B2] focus:ring-indigo-600'
                  }`}
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                {fieldErrors.passwordConfirmation && (
                  <p className="mt-1 text-xs text-red-600">
                    {fieldErrors.passwordConfirmation}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 items-center">
              <Button
                type="submit"
                disabled={
                  loading ||
                  email === '' ||
                  password === '' ||
                  passwordConfirmation === '' ||
                  name === ''
                }
                variant="primary"
                size="sm"
                className="w-full "
              >
                {loading ? 'Registrando...' : 'Criar conta'}
              </Button>
            </div>
          </form>
        </div>
        <div className="mt-6">
          <p className="text-center text-sm text-gray-500">
            Já possui conta?{' '}
            <a
              href="/login"
              className="-6 underline text-custom-main-green hover:text-custom-auxiliar-green"
            >
              Clique aqui
            </a>
          </p>
        </div>
      </div>
      <div>
        <div className="bg-custom-auxiliar-green p-4 rounded-2xl">
          <div className="px-10 pb-10 pt-24">
            <p className="text-3xl text-white font-bold text-center">
              Bem-vindo(a) ao the Library!
            </p>
            <p className="text-white text-base">
              Crie sua conta para utilizar a plataforma
            </p>
          </div>
        </div>
        <div className="bg-custom-auxiliar-green pr-12 rounded-2xl">
          <div className=" bg-custom-main-yellow rounded-2xl">
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
