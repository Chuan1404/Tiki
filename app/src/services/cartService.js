import { API } from "constants"
import { callApiWithToken } from "utils"

const cartService = {
    getCart() {
        return callApiWithToken(`${API}/carts`)
    },
    addCart(id, quantity = 1) {
        return callApiWithToken(`${API}/carts`, {
            method: 'POST',
            body: JSON.stringify({ quantity, productId: id })
        })
    },
    updateCart(id, quantity = 1) {
        return callApiWithToken(`${API}/cart/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ quantity })
        })
    },
    removeCart(id) {
        return callApiWithToken(`${API}/cart/delete/${id}`, {
            method: 'DELETE'
        })
    }
}

export default cartService