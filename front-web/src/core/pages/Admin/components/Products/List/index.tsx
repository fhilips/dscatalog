import { useHistory } from "react-router";
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
    </div>
  );
};

export default List;
