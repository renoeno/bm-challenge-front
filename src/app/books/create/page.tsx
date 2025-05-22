'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import AdminRoute from '@/components/AdminRoute/AdminRoute';
import Button from '@/components/Button/Button';
import { z } from 'zod';

const bookSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(255, 'Título deve ter no máximo 255 caracteres'),
  author: z.string().min(1, 'Autor é obrigatório').max(255, 'Autor deve ter no máximo 255 caracteres'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  variant: z.string().min(1, 'Tipo é obrigatório'),
  price: z.string()
    .min(1, 'Preço é obrigatório')
    .regex(/^\d+\.\d{2}$/, 'Preço deve estar no formato 99.99')
    .refine((val) => parseFloat(val) >= 0, 'Preço não pode ser negativo'),
  stock: z.number()
    .min(1, 'Estoque deve ser maior que 0')
    .max(999, 'Estoque deve ser menor que 999'),
  image: z.string().url('URL da imagem inválida').min(1, 'URL da imagem é obrigatória'),
  categories: z.string()
    .min(1, 'Categorias são obrigatórias')
    .refine(
      (val) => val.split(',').every(cat => cat.trim().length > 0),
      'Categorias não podem estar vazias'
    ),
});

type FormErrors = {
  title?: string;
  author?: string;
  description?: string;
  variant?: string;
  price?: string;
  stock?: string;
  image?: string;
  categories?: string;
};

export default function CreateBookPage() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    variant: '',
    price: '',
    stock: '',
    image: '',
    categories: '',
  });
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState<string>('');
  const router = useRouter();

  const validateForm = () => {
    try {
      bookSchema.parse({
        ...formData,
        stock: parseInt(formData.stock),
      });
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
        setFormError(error.errors[0].message);
      }
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) {
      return;
    }

    try {
      // TODO: Implement book creation logic here
      router.push('/books');
    } catch (err) {
      if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError('Falha ao criar livro. Por favor, tente novamente.');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <AdminRoute>
      <div className="min-h-screen px-8 py-5 w-full">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-custom-dark-gray font-bold text-[28px] leading-[1]">
            Criar Novo Livro
          </h1>
        </div>
        <hr className="bg-custom-tertiary-gray" />

        <div className="mt-8 max-w-2xl mx-auto">
          {formError && (
            <div className="rounded-md bg-red-50 p-4 mb-4">
              <div className="text-sm text-red-700">{formError}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="title" className="text-sm text-custom-dark-gray">
                  Título
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full relative block rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ${
                    fieldErrors.title
                      ? 'ring-red-500 focus:ring-red-500'
                      : 'ring-[#AEB0B3B2] focus:ring-indigo-600'
                  }`}
                />
                {fieldErrors.title && (
                  <p className="mt-1 text-xs text-red-600">{fieldErrors.title}</p>
                )}
              </div>

              <div>
                <label htmlFor="author" className="text-sm text-custom-dark-gray">
                  Autor
                </label>
                <input
                  id="author"
                  name="author"
                  type="text"
                  value={formData.author}
                  onChange={handleChange}
                  className={`w-full relative block rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ${
                    fieldErrors.author
                      ? 'ring-red-500 focus:ring-red-500'
                      : 'ring-[#AEB0B3B2] focus:ring-indigo-600'
                  }`}
                />
                {fieldErrors.author && (
                  <p className="mt-1 text-xs text-red-600">{fieldErrors.author}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="text-sm text-custom-dark-gray">
                  Descrição
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full relative block rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ${
                    fieldErrors.description
                      ? 'ring-red-500 focus:ring-red-500'
                      : 'ring-[#AEB0B3B2] focus:ring-indigo-600'
                  }`}
                />
                {fieldErrors.description && (
                  <p className="mt-1 text-xs text-red-600">{fieldErrors.description}</p>
                )}
              </div>

              <div>
                <label htmlFor="categories" className="text-sm text-custom-dark-gray">
                  Categorias (separadas por vírgula)
                </label>
                <input
                  id="categories"
                  name="categories"
                  type="text"
                  placeholder="Ficção, Romance, Aventura"
                  value={formData.categories}
                  onChange={handleChange}
                  className={`w-full relative block rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ${
                    fieldErrors.categories
                      ? 'ring-red-500 focus:ring-red-500'
                      : 'ring-[#AEB0B3B2] focus:ring-indigo-600'
                  }`}
                />
                {fieldErrors.categories && (
                  <p className="mt-1 text-xs text-red-600">{fieldErrors.categories}</p>
                )}
              </div>

              <div>
                <label htmlFor="variant" className="text-sm text-custom-dark-gray">
                  Tipo
                </label>
                <select
                  id="variant"
                  name="variant"
                  value={formData.variant}
                  onChange={handleChange}
                  className={`w-full relative block rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ${
                    fieldErrors.variant
                      ? 'ring-red-500 focus:ring-red-500'
                      : 'ring-[#AEB0B3B2] focus:ring-indigo-600'
                  }`}
                >
                  <option value="">Selecione um tipo</option>
                  <option value="physical">Físico</option>
                  <option value="digital">Digital</option>
                </select>
                {fieldErrors.variant && (
                  <p className="mt-1 text-xs text-red-600">{fieldErrors.variant}</p>
                )}
              </div>

              <div>
                <label htmlFor="price" className="text-sm text-custom-dark-gray">
                  Preço
                </label>
                <input
                  id="price"
                  name="price"
                  type="text"
                  placeholder="99.99"
                  value={formData.price}
                  onChange={handleChange}
                  className={`w-full relative block rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ${
                    fieldErrors.price
                      ? 'ring-red-500 focus:ring-red-500'
                      : 'ring-[#AEB0B3B2] focus:ring-indigo-600'
                  }`}
                />
                {fieldErrors.price && (
                  <p className="mt-1 text-xs text-red-600">{fieldErrors.price}</p>
                )}
              </div>

              <div>
                <label htmlFor="stock" className="text-sm text-custom-dark-gray">
                  Estoque
                </label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="1"
                  max="999"
                  value={formData.stock}
                  onChange={handleChange}
                  className={`w-full relative block rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ${
                    fieldErrors.stock
                      ? 'ring-red-500 focus:ring-red-500'
                      : 'ring-[#AEB0B3B2] focus:ring-indigo-600'
                  }`}
                />
                {fieldErrors.stock && (
                  <p className="mt-1 text-xs text-red-600">{fieldErrors.stock}</p>
                )}
              </div>

              <div>
                <label htmlFor="image" className="text-sm text-custom-dark-gray">
                  URL da Imagem
                </label>
                <input
                  id="image"
                  name="image"
                  type="url"
                  value={formData.image}
                  onChange={handleChange}
                  className={`w-full relative block rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ${
                    fieldErrors.image
                      ? 'ring-red-500 focus:ring-red-500'
                      : 'ring-[#AEB0B3B2] focus:ring-indigo-600'
                  }`}
                />
                {fieldErrors.image && (
                  <p className="mt-1 text-xs text-red-600">{fieldErrors.image}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => router.back()}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
              >
                Criar Livro
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminRoute>
  );
}