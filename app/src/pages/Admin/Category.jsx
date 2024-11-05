import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import categoryService from "services/categoryService";
import { queryString } from "utils";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          initialValue={record.name}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Category = () => {
  const [updateForm] = Form.useForm();
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

  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);


  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    updateForm.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };

  const handleDelete = async (key) => {
    console.log(key)
    const newData = categories.data?.filter((item) => item.id !== key);
    let res = await categoryService.deleteCategory(key);
    if (!res.error) {
      setCategories({
        ...categories,
        data: newData,
      });
    }
  };
  const handleEdit = async (key) => {
    try {
      const row = await updateForm.validateFields();
      const newData = [...categories.data];
      const index = newData.findIndex((item) => key === item.id);
      console.log(index)
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });

        let res = await categoryService.updateCategory(
          item.id,
          updateForm.getFieldsValue()
        );
        setEditingKey("");
        if (!res.error) {
          setCategories({
            ...categories,
            data: newData,
          });
        }
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const handleAdd = async () => {
    let updateForm = addForm.getFieldsValue();
    let res = await categoryService.addCategory(updateForm);
    if (!res.error) {
      setOpen(false);
      addForm.resetFields();
    }
    else {
      alert(res.error)
    }
  };



  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "30%",
      editable: false,
    },
    {
      title: "name",
      dataIndex: "name",
      width: "70%",
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
              onClick={() => handleEdit(record.id)}
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
        categories.data?.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}
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
      const res = await categoryService.getCategory(
        queryString({
          limit: tableParams.pagination.pageSize || 10,
          page: tableParams.pagination.current || 1,
        })
      );
      if (!res.error) {
        res.data = res.data?.map((item) => ({ ...item, key: item._id }));
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res.total,
          },
        });
        setCategories(res);
      }
      else {
        alert(res.error)
      }

    })();

    return () => {

    }
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
    addForm.getFieldValue()
  ]);

  return (
    <Form form={addForm} component={false}>
      <Button
        style={{ marginBottom: 10 }}
        type="primary"
        onClick={() => setOpen(true)}
      >
        Add category
      </Button>
      <Modal
        open={open}
        title="Add category"
        onOk={handleAdd}
        onCancel={() => setOpen(false)}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input category name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Modal>
      <Form form={updateForm} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={categories.data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={tableParams.pagination}
          onChange={handleTableChange}
        />
      </Form>

    </Form>
  );
};
export default Category;
