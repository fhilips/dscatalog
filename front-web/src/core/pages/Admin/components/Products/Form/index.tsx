import "./styles.scss";
import BaseForm from "../../BaseForm";
import { useState } from "react";
import { makePrivateRequest } from "core/utils/request";
import { useForm } from "react-hook-form";

type FormState = {
  name: string;
  price: string;
  category: string;
  description: string;
  imageUrl: string;
};

const Form = () => {
  const { register, handleSubmit } = useForm<FormState>()
  const onSubmit = (data: FormState) => {  
    makePrivateRequest({ url: '/products', method: 'POST', data })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseForm title="CADASTRAR UM PRODUTO">
        <div className="row">
          <div className="col-6">
            <input
              {...register("name", { required: "Campo obrigatório"})} 
              type="text"
              className="form-control margin-bottom-30 input-base"                            
              placeholder="nome do produto"                     
            />
          
            <input
              {...register("price", { required: "Campo obrigatório"})} 
              type="text"                       
              className="form-control margin-bottom-30 input-base"
              placeholder="Preço"
            />
             <input
              {...register("imageUrl", { required: "Campo obrigatório"})} 
              type="text"
              className="form-control margin-bottom-30 input-base"                            
              placeholder="Imagem do produto"
            />
          </div>
          <div className="col-6">
            <textarea
              {...register("description", { required: "Campo obrigatório"})} 
              className="form-control input-base"
              placeholder="Descrição"
              cols={30} 
              rows={10} />
          </div>
        </div>
      </BaseForm>
    </form>
  );
};

export default Form;
