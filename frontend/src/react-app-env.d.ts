/// <reference types="react-scripts" />

// 定义全局约束
declare global {

    // 相应体结构
    interface ResponseSuccess<T = {}> {
        success: boolean;
        message?: string;
        data: T;
    }

    // 数据分页
    interface IPagination<T> {
        success: boolean;
        errorMessage?: string;
        data: {
            list: T[];
            current: 1;
            pageSize: number;
            total: number;
            totalPage: number;
        };
    }

    // 登录管理（可用于让非组件对象调用hooks）
    interface Window {
        logout(): void;
    }
}
export { };
