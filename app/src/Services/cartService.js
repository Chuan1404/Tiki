import { API } from "constants"
import { callApiWithToken } from "utils"

const cartService = {
    getCart() {
        return callApiWithToken(`${API}/ecommerce/v1/cart`)
    },
    updateCart(id, quantity = 1) {
        return callApiWithToken(`${API}/ecommerce/v1/cart/quantity/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ quantity })
        })
    },
    removeCart(id) {
        return callApiWithToken(`${API}/ecommerce/v1/cart/remove-item/${id}`, {
            method: 'DELETE'
        })
    }
}

export default cartService