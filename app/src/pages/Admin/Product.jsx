import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { productService, userService } from "services";
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
const Product = () => {
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
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

  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(true);

  const [open, setOpen] = useState(false);

  const handleOk = async () => {
    let form = addForm.getFieldsValue();
    let res = await productService.addProduct(form);
    if (!res.error) {
      setOpen(false);
      addForm.resetFields();

      const updatedRes = await productService.getProduct(
        queryString({
          limit: tableParams.pagination.pageSize || 10,
          page: tableParams.pagination.current || 1,
        })
      );
      updatedRes.data = updatedRes.data?.map((item) => ({
        ...item,
        key: item._id,
      }));
      setProducts(updatedRes);

      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: updatedRes.total,
        },
      });
    }
  };

  const isEditing = (record) => record.key === editingKey;

  const handleDelete = async (key) => {
    const newData = products.data?.filter((item) => item.key !== key);
    let res = await userService.deleteUser(key);
    if (!res.error) {
      setProducts({
        ...products,
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
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...products.data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });

        let res = await productService.updateProduct(
          item._id,
          form.getFieldsValue()
        );
        if (!res.error) {
          setProducts({
            ...products,
            data: newData,
          });
          setEditingKey("");
        }
      } else {
        newData.push(row);
        setProducts({
          ...products,
          data: newData,
        });
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  console.log(products)
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      editable: true,
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      editable: true,
    },
    {
      title: "name",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "Brand Name",
      dataIndex: "brandName",
      editable: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      editable: true,
    },
    {
      title: "Rating Average",
      dataIndex: "ratingAverage",
      editable: true,
    },
    {
      title: "Review Count",
      dataIndex: "reviewCount",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginInlineEnd: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: "delete",
      dataIndex: "delete",
      render: (_, record) =>
        products.data?.length >= 1 ? (
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

  useEffect(() => {
    (async () => {
      setFetching(true);
      const res = await productService.getProduct(
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
      setProducts(res);
    })();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
  ]);
  return (
    <Form form={form} component={false}>
      <Button
        style={{ marginBottom: 10 }}
        type="primary"
        onClick={() => setOpen(true)}
      >
        Add product
      </Button>
      <Modal
        open={open}
        title="Add product"
        onOk={handleOk}
        onCancel={() => setOpen(false)}
      >
        <Form.Item
          label="Category"
          name="categoryId"
          rules={[
            {
              required: true,
              message: "Please input category name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Brand Name"
          name="brandName"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Modal>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={products.data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
    </Form>
  );
};
export default Product;
