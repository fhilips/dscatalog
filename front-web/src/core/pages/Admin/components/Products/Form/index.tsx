import "./styles.scss";
import BaseForm from '../../BaseForm';

const Form = () => { 

  return (
    <BaseForm title="CADASTRAR UM PRODUTO">
      <div className="row">
        <div className="col-6">
          <input type="text" className="form-control"/>
        </div>
      </div>
    </BaseForm>
  );
};

export default Form;