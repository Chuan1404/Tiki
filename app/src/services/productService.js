import { API } from "constants";

const productService = {
  getProduct(query = "") {
    return fetch(`${API}/products?${query}`).then((res) => res.json());
  },
  addProduct(form) {
    return fetch(`${API}/products`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(form),
    }).then((res) => res.json());
  },
  updateProduct(id, form) {
    return fetch(`${API}/products/${id}`, {
      body: JSON.stringify(form),
      method: "PATCH",
    });
  },
  deleteProduct(id) {
    return fetch(`${API}/products/${id}`, {
      method: "DELETE",
    });
  },
};

export default productService;
