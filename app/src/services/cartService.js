import { API } from "constants"
import { callApiWithToken } from "utils"

const cartService = {
    getCart() {
        return callApiWithToken(`${API}/carts/me`)
    },
    addCart(id, quantity = 1) {
        return callApiWithToken(`${API}/carts`, {
            method: 'POST',
            body: JSON.stringify({ quantity, productId: id })
        })
    },
    updateCart(id, quantity = 1) {
        return callApiWithToken(`${API}/carts/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ quantity })
        })
    },
    removeCart(id) {
        return callApiWithToken(`${API}/carts/${id}`, {
            method: 'DELETE'
        })
    }
}

export default cartService