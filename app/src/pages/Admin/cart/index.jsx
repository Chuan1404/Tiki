import { useEffect, useState } from "react";
import { queryString } from "utils";
import EditableTable from "./EditableTable";
import { cartService } from "services";

const Cart = () => {
  const [carts, setCarts] = useState([]);

  // const onAdd = async (formValue) => {
  //   const response = await cart.addCart(formValue);
  //   await fetchData()
  //   return response
  // };

  const onDelete = async (id) => {
    const response = await cartService.deleteCart(id);
    return response
  };
  // const onEdit = async (id, formValue) => {
  //   const response = await cartService.updateCart(
  //     id,
  //     formValue
  //   );

  //   return response
  // };

  const fetchData = async (pageSize = 10, page = 1) => {
    const response = await cartService.getCart(
      queryString({
        limit: pageSize,
        page: page,
      })
    );

    if (!response.error) {
      response.data = response.data?.map((item) => ({ ...item, key: item.id }));
      setCarts(response);
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
      {/* <AddForm handleSubmit={onAdd} /> */}
      <EditableTable
        data={carts}
        // onEdit={onEdit}
        onDelete={onDelete}
        fetchData={fetchData}
      />
    </>

  );
};
export default Cart;
