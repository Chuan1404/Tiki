import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { orderService, productService, userService } from "services";
import { queryString } from "utils";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const Order = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const cancel = () => {
    setEditingKey("");
  };
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      onChange: cancel,
    },
  });

  const [orders, setOrders] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    (async () => {
      setFetching(true);
      const res = await orderService.getOrder(
        queryString({
          limit: tableParams.pagination.pageSize || 10,
          page: tableParams.pagination.current || 1,
        })
      );
      res.data = res.data?.map((item) => ({ ...item, key: item._id }));
      setFetching(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: res.total,
        },
      });
      setOrders(res);
    })();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
  ]);

  const isEditing = (record) => record.key === editingKey;

  const handleDelete = async (key) => {
    const newData = orders.data?.filter((item) => item.key !== key);
    let res = await userService.deleteUser(key);
    if (!res.error) {
      setOrders({
        ...orders,
        data: newData,
      });
    }
  };
  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };
  // const save = async (key) => {
  //   try {
  //     const row = await form.validateFields();
  //     const newData = [...orders.data];
  //     const index = newData.findIndex((item) => key === item.key);
  //     if (index > -1) {
  //       const item = newData[index];
  //       newData.splice(index, 1, {
  //         ...item,
  //         ...row,
  //       });

  //       let res = await productService.updateProduct(item._id, form.getFieldsValue());
  //       if (!res.error) {
  //         setOrders({
  //           ...orders,
  //           data: newData,
  //         });
  //         setEditingKey("");
  //       }
  //     } else {
  //       newData.push(row);
  //       setOrders({
  //         ...orders,
  //         data: newData,
  //       });
  //       setEditingKey("");
  //     }
  //   } catch (errInfo) {
  //     console.log("Validate Failed:", errInfo);
  //   }
  // };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      editable: true,
    },
    {
      title: "User",
      dataIndex: "userId",
      editable: true,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      editable: true,
    },
    {
      title: "Shipping Method",
      dataIndex: "shippingMethod",
      editable: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      editable: true,
    },
    {
      title: "Province",
      dataIndex: "province",
      editable: true,
    },
    {
      title: "District",
      dataIndex: "district",
      editable: true,
    },
    {
      title: "Note",
      dataIndex: "note",
      editable: true,
    },
    // {
    //   title: "operation",
    //   dataIndex: "operation",
    //   render: (_, record) => {
    //     const editable = isEditing(record);
    //     return editable ? (
    //       <span>
    //         <Typography.Link
    //           onClick={() => save(record.key)}
    //           style={{
    //             marginInlineEnd: 8,
    //           }}
    //         >
    //           Save
    //         </Typography.Link>
    //         <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
    //           <a>Cancel</a>
    //         </Popconfirm>
    //       </span>
    //     ) : (
    //       <Typography.Link
    //         disabled={editingKey !== ""}
    //         onClick={() => edit(record)}
    //       >
    //         Edit
    //       </Typography.Link>
    //     );
    //   },
    // },
    {
      title: "delete",
      dataIndex: "delete",
      render: (_, record) =>
        orders.data?.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        // inputType: col.dataIndex === "age" ? "number" : "text",
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });
  };

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={orders.data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
    </Form>
  );
};
export default Order;
