import request from "../util/request";

export function getCurrent() {
    return request.get<
        any,
        ResponseSuccess<{ admin: Admin; permissionList: Permission[] }>
    >("/admin/admin/admin/current");
}