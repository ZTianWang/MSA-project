import request from "../util/request";

// IPagination：全局分页设置
export function getUserList(current = 1, pageSize = 15) {
    return request.get<any, IPagination<User>>("/admin/user", {
        params: {
            current,
            pageSize,
        }
    })
}

export function deleteUserById(id: number) {
    return request.delete<any, ResponseSuccess>('/admin/user/' + id);
}

export function updateUser(user: User) {
    return request.patch<any, ResponseSuccess>('/admin/user/' + user.id, user);
}

export function createUser(user: User) {
    return request.post<any, ResponseSuccess>('/admin/user', user);
}