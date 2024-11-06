import { useEffect, useState } from "react";
import { userService } from "services";
import { queryString } from "utils";
import AddForm from "./AddForm";
import EditableTable from "./EditableTable";

const User = () => {
  const [users, setUsers] = useState([]);

  const onAdd = async (formValue) => {
    const response = await userService.addUser(formValue);
    await fetchData()
    return response
  };

  const onDelete = async (id) => {
    const response = await userService.deleteUser(id);
    return response
  };
  const onEdit = async (id, formValue) => {
    const response = await userService.updateUser(
      id,
      formValue
    );

    return response
  };

  const fetchData = async (pageSize = 10, page = 1) => {
    const response = await userService.getUser(
      queryString({
        limit: pageSize,
        page: page,
      })
    );

    if (!response.error) {
      response.data = response.data?.map((item) => ({ ...item, key: item._id }));
      setUsers(response);
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
        data={users}
        onEdit={onEdit}
        onDelete={onDelete}
        fetchData={fetchData}
      />
    </>

  );
};
export default User;
