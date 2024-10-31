import { API } from "constants";

const productService = {
  getProduct(query = "") {
    return fetch(`${API}/product?${query}`).then((res) => res.json());
  },
  addProduct(form) {
    console.log(form);
    return fetch(`${API}/product/add`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(form),
    }).then((res) => res.json());
  },
  updateProduct(id, form) {
    return fetch(`${API}/product/update/${id}`, {
      body: JSON.stringify(form),
      method: "PUT",
    });
  },
  deleteProduct(id) {
    return fetch(`${API}/product/delete/${id}`, {
      method: "DELETE",
    });
  },
};

export default productService;
