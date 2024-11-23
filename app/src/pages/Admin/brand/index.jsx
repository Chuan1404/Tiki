import { useEffect, useState } from "react";
import brandService from "services/brandService";
import { queryString } from "utils";
import AddForm from "./AddForm";
import EditableTable from "./EditableTable";

const Brand = () => {
  const [brands, setBrands] = useState([]);

  const onAdd = async (formValue) => {
    const response = await brandService.addBrand(formValue);
    await fetchData()
    return response
  };

  const onDelete = async (id) => {
    const response = await brandService.deleteBrand(id);
    return response
  };
  const onEdit = async (id, formValue) => {
    const response = await brandService.updateBrand(
      id,
      formValue
    );

    return response
  };

  const fetchData = async (pageSize = 10, page = 1) => {
    const response = await brandService.getBrand(
      queryString({
        limit: pageSize,
        page: page,
      })
    );

    if (!response.error) {
      response.data = response.data?.map((item) => ({ ...item, key: item.id }));
      setBrands(response);
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
        data={brands}
        onEdit={onEdit}
        onDelete={onDelete}
        fetchData={fetchData}
      />
    </>

  );
};
export default Brand;
