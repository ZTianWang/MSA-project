import request from "../util/request";

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