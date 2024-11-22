import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";


function AddForm({ handleSubmit }) {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm()

    const handleAdd = async () => {
        const formValue = form.getFieldsValue();
        const res = await handleSubmit(formValue)
        console.log(res)
        if (!res.error) {
            setOpen(false);
            form.resetFields();
        }
        else {
            alert(res.error)
        }
    };
    return (
        <Form form={form} component={false}>
            <Button
                style={{ marginBottom: 10 }}
                type="primary"
                onClick={() => setOpen(true)}
            >
                Add cart
            </Button>
            <Modal
                open={open}
                title="Add cart"
                onOk={handleAdd}
                onCancel={() => setOpen(false)}
            >
                <Form.Item
                    label="Product id"
                    name="productId"
                    layout="vertical"
                    rules={[
                        {
                            required: true,
                            message: "Please input product id!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="User id"
                    name="userId"
                    layout="vertical"
                    rules={[
                        {
                            required: true,
                            message: "Please input user id!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Quantity"
                    name="quantity"
                    layout="vertical"
                    rules={[
                        {
                            required: true,
                            message: "Please input quantity!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Modal>
        </Form>)
}

export default AddForm