import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";


function AddForm({ handleSubmit }) {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm()

    const handleAdd = async () => {
        const formValue = form.getFieldsValue();
        const res = await handleSubmit(formValue)
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
                Add user
            </Button>
            <Modal
                open={open}
                title="Add User"
                onOk={handleAdd}
                onCancel={() => setOpen(false)}
            >
                <Form.Item
                    label="Email"
                    name="email"
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
        </Form>)
}

export default AddForm