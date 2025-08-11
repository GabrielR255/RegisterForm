"use client"; // se estiver usando app router do Next.js 13+

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from '../../../services/config';
import Link from 'next/link'; // Importando Link

// Esquema de validação com Yup
const schema = yup
  .object({
    Name: yup.string().required("Nome de Usuário é obrigatório"),
    Email: yup.string().email("Email inválido").required("Digite seu Email"),
  })
  .required();

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function listenusers(data: FormData) {
    try {
      const response = await api.get(`/Listen/${data.Email}`);
      // Verifique o que está vindo
      console.log(response.data);

      alert(`Usuário: ${response.data.name}\nEmail: ${response.data.email}\nTelefone: ${response.data.telefone}`);
    } catch (error) {
      console.log(error);
      alert("Usuário não encontrado ou erro no servidor.");
    }
  }



   interface FormData {
  Name: string;
  Email: string;
  
}
  return (
    <div className="bg-slate-300 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-lg p-8 rounded w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Listar dados</h1>

        <form onSubmit={handleSubmit(listenusers)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black">Name</label>
            <input {...register("Name")} className="w-full p-2 border rounded text-black" />
            <p className="text-red-500 text-sm">{errors.Name?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Email</label>
            <input {...register("Email")} className="w-full p-2 border rounded text-black" />
            <p className="text-red-500 text-sm">{errors.Email?.message}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 transition cursor-pointer"
          >
            Listar meus dados
          </button>

          {/* Botão de Link para a página inicial */}
          <Link href="/">
            <button
              type="button"
              className="w-full bg-gray-500 text-white py-2 px-4 rounded mt-4 hover:bg-gray-600 transition cursor-pointer"
            >
              Voltar para a página inicial
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
