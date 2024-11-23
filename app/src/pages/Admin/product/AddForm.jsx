import { Button, Form, Input, Modal } from "antd";
import { SelectLoader } from "components";
import { API } from "constants";
import { useState } from "react";

function AddForm({ handleSubmit }) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAdd = async () => {
    const formValue = form.getFieldsValue();
    const res = await handleSubmit(formValue);
    console.log(res);
    if (!res.error) {
      setOpen(false);
      form.resetFields();
    } else {
      alert(res.error);
    }
  };
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
        onOk={handleAdd}
        onCancel={() => setOpen(false)}
      >
        <Form.Item
          label="Category id"
          name="categoryId"
          layout="vertical"
          rules={[
            {
              required: true,
              message: "Please input category name!",
            },
          ]}
        >
          {/* <Input /> */}
          <SelectLoader
            api={`${API}/categories`}
            onChange={(value) => {
              form.setFieldsValue({ categoryId: value });
            }}
          />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          layout="vertical"
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
          label="Brand Id"
          name="brandId"
          layout="vertical"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <SelectLoader
            api={`${API}/brands`}
            onChange={(value) => {
              form.setFieldsValue({ brandId: value });
            }}
          />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          layout="vertical"
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
    </Form>
  );
}

export default AddForm;
