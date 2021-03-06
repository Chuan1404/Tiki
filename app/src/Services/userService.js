import { API } from "constants"
import { callApiWithToken } from "utils"


const userService = {
    getInfo() {
        return callApiWithToken(`${API}/user/get-info`);
    }
}

export default userService