/**
 * Customised route table
 */
import { ReactNode, Suspense, lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { AuditOutlined, DashboardOutlined, LaptopOutlined, ShopOutlined, ShoppingOutlined, UnorderedListOutlined, UserOutlined, UsergroupAddOutlined, } from "@ant-design/icons";
import { Spin } from "antd";
import AppLayout from "../components/AppLayout";
import Login from "../features/login";
import Dashboard from "../features/dashboard";

// lazy load files
const User = lazy(() => import("../features/user"));
const Item = lazy(() => import("../features/item"));
const NotFoundPage = lazy(() => import("../features/error/NotFoundPage"));


export interface IRouter extends RouteObject {
    path: string;
    label?: string;
    hide?: boolean;
    icon?: ReactNode;
    children?: IRouter[];   // children: customise nested route
}

// Implement lay load
function lazyLoad(children: ReactNode): ReactNode {
    return <Suspense fallback={<Spin />}>{children}</Suspense>
}

const router: IRouter[] = [
    {
        path: '/',
        label: 'Index',
        hide: true,  // Hide in menu
        icon: <LaptopOutlined />,
        element: <Navigate to={"/item/list"} replace={true} />
    },
    {
        path: '/dashboard',
        label: 'Dashboard',
        icon: <DashboardOutlined />,
        element:
            <AppLayout>

                {
                    // Loading page by lazyLoad
                    lazyLoad(<Dashboard />)
                }
            </AppLayout>
    },
    {
        path: '/item',
        label: 'Item Management',
        icon: <ShopOutlined />,
        element: <AppLayout />,
        children: [
            {
                path: "/item/list",
                label: 'Item List',
                icon: <ShoppingOutlined />,
                element: lazyLoad(<Item />),
            }
        ]
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
        path: '*',
        element: <NotFoundPage />,
    }
];

export default router;