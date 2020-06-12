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
    },
    login(login, password) {
        return instance.post("auth/login", {"email": login, "password": password})
    },
    logout() {
        return instance.delete("auth/logout")
    },
    register(registerForm) {
        return instance.post("auth/register", {...registerForm})
    },
    getLocations() {
        return instance.get("locations").then(response => response.data)
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
    },
    changeProfilePhoto(file) {
        let formData = new FormData()
        formData.append("Files", file)
        return instance.put("profile/photo", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    changeProfileData(profile) {
        return instance.put("profile/", {
            ...profile
        })
    },
    getPosts(id) {
        return instance.get(`posts/${id}`).then(response => response.data)
    },
    addPost(id, postText) {
        return instance.post("posts/", {
            "userId": id,
            "Post": postText
        }).then(response => response.data)
    }
}