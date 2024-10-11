import { API } from "constants"
import { callApiWithToken } from "utils"


const userService = {
    getInfo() {
        return callApiWithToken(`${API}/user/get-info`);
    },
    getUser(queryString) {
        return callApiWithToken(`${API}/user/?${queryString}`);
    },
    updateUser(id, form) {
        return callApiWithToken(`${API}/user/update/${id}`, {
            body: JSON.stringify(form),
            method: 'PUT'
        });
    },
    deleteUser(id) {
        return callApiWithToken(`${API}/user/delete/${id}`, {
            method: 'DELETE'
        });
    },
}

export default userService