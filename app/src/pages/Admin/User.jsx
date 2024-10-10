import { Table } from "antd";
import { useQuery } from "hooks";
import { useEffect } from "react";
import { userService } from "services";

export default function User() {

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  const { data: users, fetching: userFetching } = useQuery(
    () => userService.getUser(),
    []
  ); 
  console.log(users)
  return <Table dataSource={users.data || []} columns={columns} />;
}
