import * as axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:2669/api/"
})

export const usersAPI = {
    getUsers(pageSize, currentPage) {
        return instance.get("users?pageSize=" + pageSize + "&pageNumber=" + currentPage).then(response => response.data)
    }
}

export const followAPI = {
    follow(id) {
        return instance.post("follow/" + id).then(response => response.data)
    },
    unfollow(id) {
        return instance.delete("follow/" + id).then(response => response.data)
    }
}

export const authAPI = {
    me() {
        return instance.get("auth/me").then(response => response.data)
    }
}

export const profileAPI = {
    profileInfo(id) {
        return instance.get("profile/" + id).then(response => response.data)
    },
    changeStatus(status) {
        return instance.put("profile/status/", {
            status
        })
    }
}