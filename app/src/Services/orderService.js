import { API } from "constants"
import { callApiWithToken } from "utils"

const orderService = {
    order(orderObj) {
        return callApiWithToken(`${API}/order/add`, {
            method: 'POST',
            body: JSON.stringify(orderObj)
        })
    },
    getOrder(queryString) {
        return callApiWithToken(`${API}/order/?${queryString}`);
    },
}

export default orderService