import { API } from "constants";

const brandService = {
  getBrand(query = "") {
    return fetch(`${API}/brands?${query}`).then((res) => res.json());
  },
  addBrand(form) {
    return fetch(`${API}/brands`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(form),
    }).then((res) => res.json());
  },
  updateBrand(id, form) {
    return fetch(`${API}/brands/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
      method: "PATCH",
    }).then((res) => res.json());
  },
  deleteBrand(id) {
    return fetch(`${API}/brands/${id}`, {
      method: "DELETE",
    });
  },
};

export default brandService;
