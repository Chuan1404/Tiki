import { API } from "constants";

const categoryService = {
  getCategory(query = "") {
    return fetch(`${API}/categories?${query}`).then((res) => res.json());
  },
  addCategory(form) {
    return fetch(`${API}/categories`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(form),
    }).then((res) => res.json());
  },
  updateCategory(id, form) {
    return fetch(`${API}/categories/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
      method: "PATCH",
    }).then((res) => res.json());
  },
  deleteCategory(id) {
    return fetch(`${API}/categories/${id}`, {
      method: "DELETE",
    });
  },
};

export default categoryService;
