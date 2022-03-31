import { API } from "constants";

const productService = {
    getProduct(query = '') {
        return fetch(`${API}/product${query}`)
            .then(res => res.json())
    }
}

export default productService;