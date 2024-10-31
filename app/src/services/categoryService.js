import { API } from "constants";

const categoryService = {
  getCategory(query = "") {
    return fetch(`${API}/category?${query}`).then((res) => res.json());
  },
  addCategory(form) {
    console.log(form);
    return fetch(`${API}/category/add`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(form),
    }).then((res) => res.json());
  },
  updateCategory(id, form) {
    return fetch(`${API}/category/update/${id}`, {
      body: JSON.stringify(form),
      method: "PUT",
    });
  },
  deleteCategory(id) {
    return fetch(`${API}/category/delete/${id}`, {
      method: "DELETE",
    });
  },
};

export default categoryService;
