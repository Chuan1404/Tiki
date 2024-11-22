import { Form, Input, Popconfirm, Table, Typography } from "antd";
import { useEffect, useState } from "react";


const EditableTable = ({ data: defaultData, onEdit, onDelete, fetchData }) => {
    const [updateForm] = Form.useForm();
    const [tableData, setTableData] = useState(defaultData)
    const [editingKey, setEditingKey] = useState("");
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        updateForm.setFieldsValue({
            ...record,
        });
        setEditingKey(record.key);
    };
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

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            editable: true,
        },
        {
            title: "Product",
            dataIndex: "productId",
            editable: true,
        },
        {
            title: "User",
            dataIndex: "userId",
            editable: true,
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            editable: true,
        },
        // {
        //     title: "operation",
        //     dataIndex: "operation",
        //     render: (_, record) => {
        //         const editable = isEditing(record);
        //         return editable ? (
        //             <span>
        //                 <Typography.Link
        //                     onClick={() => handleEdit(record.key)}
        //                     style={{
        //                         marginInlineEnd: 8,
        //                     }}
        //                 >
        //                     Save
        //                 </Typography.Link>
        //                 <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
        //                     <a>Cancel</a>
        //                 </Popconfirm>
        //             </span>
        //         ) : (
        //             <Typography.Link
        //                 disabled={editingKey !== ""}
        //                 onClick={() => edit(record)}
        //             >
        //                 Edit
        //             </Typography.Link>
        //         );
        //     },
        // },
        {
            title: "delete",
            dataIndex: "delete",
            render: (_, record) =>
                tableData.data?.length >= 1 ? (
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

    const handleEdit = async (id) => {
        try {
            const row = await updateForm.validateFields();
            const newData = [...tableData.data];
            const index = newData.findIndex((item) => id === item.id);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });

                const formValue = updateForm.getFieldsValue()
                let res = await onEdit(id, formValue)
                setEditingKey("");
                if (!res.error) {
                    setTableData({
                        ...tableData,
                        data: newData,
                    });
                }
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    const handleDelete = async (key) => {
        const newData = tableData.data?.filter((item) => item.id !== key);
        const res = await onDelete(key)
        if (!res.error) {
            setTableData({
                ...tableData,
                data: newData,
            });
        }
    };

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
            await fetchData(tableParams.pagination?.pageSize, tableParams.pagination?.current)
        })();

        return () => {

        }
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        tableParams?.sortOrder,
        tableParams?.sortField,
        JSON.stringify(tableParams.filters),
    ]);

    useEffect(() => {
        setTableData(defaultData)
        return () => {

        }
    }, [defaultData]);

    return (
        <Form form={updateForm} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={tableData.data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={tableParams.pagination}
                onChange={handleTableChange}
            />
        </Form>
    )
}

const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    index,
    children,
    ...restProps
}) => (
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
    </td>)





export default EditableTable