/// <reference types="react-scripts" />

// 定义全局约束
declare global {
    interface ResponseSuccess<T = {}> {
        success: boolean;
        errorMessage?: string;
        data: T;
    }
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
    interface Window {
        logout(): void;
    }
}
export { };
