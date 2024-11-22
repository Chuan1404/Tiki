import { useEffect, useState } from "react";
import categoryService from "services/categoryService";
import { queryString } from "utils";
import AddForm from "./AddForm";
import EditableTable from "./EditableTable";

const Category = () => {
  const [categories, setCategories] = useState([]);

  const onAdd = async (formValue) => {
    const response = await categoryService.addCategory(formValue);
    await fetchData()
    return response
  };

  const onDelete = async (id) => {
    const response = await categoryService.deleteCategory(id);
    return response
  };
  const onEdit = async (id, formValue) => {
    const response = await categoryService.updateCategory(
      id,
      formValue
    );

    return response
  };

  const fetchData = async (pageSize = 10, page = 1) => {
    const response = await categoryService.getCategory(
      queryString({
        limit: pageSize,
        page: page,
      })
    );

    if (!response.error) {
      response.data = response.data?.map((item) => ({ ...item, key: item.id }));
      setCategories(response);
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
        data={categories}
        onEdit={onEdit}
        onDelete={onDelete}
        fetchData={fetchData}
      />
    </>

  );
};
export default Category;
