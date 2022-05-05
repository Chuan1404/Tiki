import { API } from "constants"
import { callApiWithToken } from "utils"

const orderService = {
    order(orderObj) {
        return callApiWithToken(`${API}/ecommerce/v1/order`, {
            method: 'POST',
            body: JSON.stringify(orderObj)
        })
    },
    getAllOrder() {
        return callApiWithToken(`${API}/ecommerce/v1/order`);
    }
}

export default orderService