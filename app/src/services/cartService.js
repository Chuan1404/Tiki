import { API } from "constants"
import { callApiWithToken } from "utils"

const cartService = {
    getCart() {
        return callApiWithToken(`${API}/cart`)
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