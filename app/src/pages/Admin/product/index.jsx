import { useEffect, useState } from "react";
import productService from "services/productService";
import { queryString } from "utils";
import AddForm from "./AddForm";
import EditableTable from "./EditableTable";

const Product = () => {
  const [products, setProducts] = useState([]);

  const onAdd = async (formValue) => {
    const response = await productService.addProduct(formValue);
    await fetchData()
    return response
  };

  const onDelete = async (id) => {
    const response = await productService.deleteProduct(id);
    return response
  };
  const onEdit = async (id, formValue) => {
    const response = await productService.updateProduct(
      id,
      formValue
    );

    return response
  };

  const fetchData = async (pageSize = 10, page = 1) => {
    const response = await productService.getProduct(
      queryString({
        limit: pageSize,
        page: page,
      })
    );

    if (!response.error) {
      response.data = response.data?.map((item) => ({ ...item, key: item._id }));
      setProducts(response);
    }
    else {
      alert(response.error)
    }
  }

  useEffect(() => {
    (async () => {
      await fetchData()
    })()
  }, [])

  return (
    <>
      <AddForm handleSubmit={onAdd} />
      <EditableTable
        data={products}
        onEdit={onEdit}
        onDelete={onDelete}
        fetchData={fetchData}
      />
    </>

  );
};
export default Product;
