import { useHistory } from "react-router";
import Card from "../Card";
import "./styles.scss";

const List = () => {
  const history = useHistory();

  const handleCreate = () => {
    history.push("/admin/products/create");
  };

  return (
    <div className="admin-products-list">
      <button onClick={handleCreate} className="btn btn-primary btn-lg">
        ADICIONAR
      </button>
      <div className="admin-list-container">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default List;
