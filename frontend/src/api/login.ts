import request from '../util/request'

export function doLogin(admin: Login) {
    return request.post<any, ResponseSuccess<{ token: string }>>(
        '/admin/login',
        admin
    );
}