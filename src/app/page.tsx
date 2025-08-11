"use client"; // se estiver usando app router do Next.js 13+

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from '../../services/config'
import { useRouter } from "next/navigation";
import { useState } from "react";

// Esquema de validação com Yup
const schema = yup
  .object({
    Name: yup.string().required("Nome de Usuário é obrigatório"),
    Email: yup.string().email("Email inválido").required("Digite seu Email"),
    Password: yup.string().min(8, "Sua senha deve ter no mínimo 8 caracteres").required("Digite sua senha"),
    Telefone: yup.number().min(11, 'Seu número deve conter pelo menos 11 digitos').required("Digite seu número de telefone"),
  })
  .required();



export default function Home() {
 
const router = useRouter()


 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


 async function onSubmit (data: FormData){

console.log(onSubmit)
try{
await api.post('/Cadastro',{

name:data.Name,
email:data.Email,
password:data.Password,
telefone:data.Telefone,

})

alert('Usuários criados com sucesso!')

router.push('/login')

}catch(error){
console.log(error)
alert('Usuários não cadastrados algum erro ocorreu')

} 



  }



  interface FormData {
  Name: string;
  Email: string;
  Password: string;
  Telefone: number;
}

const [button, setButton] = useState(false)

function Buttontime () {

setButton(true)

setTimeout(() => {
  
setButton(false)


}, 12000);




}

  return (
    <div className="bg-slate-300 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-lg p-10 rounded w-full max-w-md gap-3.5">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Registre seus dados</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black">Nome</label>
            <input {...register("Name")} className="w-full p-2 border rounded text-black" />
            <p className="text-red-500 text-sm">{errors.Name?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Email</label>
            <input {...register("Email")} className="w-full p-2 border rounded text-black" />
            <p className="text-red-500 text-sm">{errors.Email?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Senha</label>
            <input type="password" {...register("Password")} className="w-full p-2 border rounded text-black" />
            <p className="text-red-500 text-sm">{errors.Password?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Telefone</label>
            <input type="number" {...register("Telefone")} className="w-full p-2 border rounded text-black" />
            <p className="text-red-500 text-sm">{errors.Telefone?.message}</p>
          </div>

               <button
            onClick={Buttontime} // 👈 dispara o timeout
            disabled={button}    // 👈 se "button" for true, desativa
            type="submit"
            className={`w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 transition cursor-pointer ${
              button && "opacity-50 cursor-not-allowed"
            }`}
          >
            {button ? 'Aguarde alguns segundos...' : 'Registrar dados'}
          </button>

        </form>
      </div>
    </div>
  );
}
