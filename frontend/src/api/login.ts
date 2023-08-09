import request from '../util/request'

export function doLogin(admin: Login) {
    // 通过全局约束（react-app-env.d.ts）定义response类型
    return request.post<any, ResponseSuccess<{ token: string }>>(
        '/admin/login',
        admin
    );
}