import "./styles.scss";
import BaseForm from "../../BaseForm";
import { useState } from "react";
import { makePrivateRequest } from "core/utils/request";

type FormState = {
  name: string;
  price: string;
  category: string;
  description: string;
};

const Form = () => {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    price: "",
    category: "1",
    description: ""
  });

  type FormEvent = React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>;
  const handleOnChange = ( event: FormEvent) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      ...formData,
      imgUrl: 'https://cdn.vox-cdn.com/thumbor/Vgy3FfpWvBD32CYZrcNq6itGqnw=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/20034840/ishMfuW.png',
      categories: [{ id: formData.category }]
    }

    
    makePrivateRequest({ url: '/products', method: 'POST', data: payload})
  };

  return (
    <form onSubmit={handleSubmit}>
      <BaseForm title="CADASTRAR UM PRODUTO">
        <div className="row">
          <div className="col-6">
            <input
              type="text"
              className="form-control mb-5"
              value={formData.name}
              name="name"
              onChange={handleOnChange}
              placeholder="nome do produto"
            />
            <select
              className="form-control mb-5"
              onChange={handleOnChange}
              value={formData.category}
              name="category"  
              >
              <option value="1">Livros</option>
              <option value="3">Computadores</option>
              <option value="2">electronicos</option>
            </select>
            <input
              value={formData.price}
              type="text"
              name="price"
              onChange={handleOnChange}
              className="form-control"
              placeholder="Preço"
            />
          </div>
          <div className="col-6">
            <textarea
              name="description" 
              className="form-control"
              onChange={handleOnChange}
              cols={30} 
              rows={10} />
          </div>
        </div>
      </BaseForm>
    </form>
  );
};

export default Form;
