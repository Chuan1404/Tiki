import { API } from "constants"
import { callApiWithToken } from "utils"

const orderService = {
    order(orderObj) {
        return callApiWithToken(`${API}/order/add`, {
            method: 'POST',
            body: JSON.stringify(orderObj)
        })
    },
    getAllOrder() {
        return callApiWithToken(`${API}/order`);
    }
}

export default orderService