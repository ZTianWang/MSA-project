/**
 * 集中式路由管理：自定义路由表
 */

import { ReactNode, Suspense, lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { AuditOutlined, DashboardOutlined, LaptopOutlined, ShopOutlined, ShoppingOutlined, UnorderedListOutlined, UserOutlined, UsergroupAddOutlined, } from "@ant-design/icons";
import { Spin } from "antd";
import AppLayout from "../components/AppLayout";
import Login from "../features/login";
import Dashboard from "../features/dashboard";
// import User from "../features/user";
// import Item from "../features/item";
// import Error from "../features/error";

// 懒加载引用包
const User = lazy(() => import("../features/user"));
const Item = lazy(() => import("../features/item"));
const NotFoundPage = lazy(() => import("../features/error/NotFoundPage"));


export interface IRouter extends RouteObject {
    path: string;
    label?: string;
    hide?: boolean;
    icon?: ReactNode;
    children?: IRouter[];   // children: 定义嵌套路由
}

// 自定义懒加载方法，常配合<Suspense>组件使用
function lazyLoad(children: ReactNode): ReactNode {
    return <Suspense fallback={<Spin />}>{children}</Suspense>
}

const router: IRouter[] = [
    {
        path: '/',
        label: 'Index',
        hide: true,  // 不显示在菜单中，因为直接路由至用户列表
        icon: <LaptopOutlined />,
        // 
        // replace: 与push相反，不会将路径添加到历史栈，点击后退会跳过替换的页面
        element: <Navigate to={"/user/list"} replace={true} />
    },
    {
        path: '/dashboard',
        label: 'Dashboard',
        icon: <DashboardOutlined />,
        element:
            <AppLayout>

                {
                    lazyLoad(<Dashboard />)     // 使用懒加载方法加载页面组件
                }
            </AppLayout>
    },
    {
        path: '/user',
        label: 'User Management',
        icon: <UsergroupAddOutlined />,
        element: <AppLayout />,
        // items ?
        children: [
            {
                path: '/user/list',
                label: 'User List',
                icon: <UnorderedListOutlined />,
                element: lazyLoad(<User />),
            }
        ]
    },
    {
        path: '/role',
        label: 'Item Management',
        icon: <ShopOutlined />,
        element: <AppLayout />,
        children: [
            {
                path: '/role/list',
                label: 'Item List',
                icon: <ShoppingOutlined />,
                element: lazyLoad(<Item />),
            }
        ]
    },
    {
        path: '/admin',
        label: 'Admin Management',
        icon: <UserOutlined />,
        element: <AppLayout />,
        // items ?
        children: [
            {
                path: '/admin/admin/admin/current',
                label: 'Current Permissions',
                icon: <AuditOutlined />,
                element: lazyLoad(<User />),
            }
        ]
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: '*',  // 返回页面未找到
        element: <NotFoundPage />,
    }
];

export default router;