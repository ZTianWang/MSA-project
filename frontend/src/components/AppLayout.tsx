import React, { ReactNode, useEffect, useState } from 'react';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import { Footer } from 'antd/es/layout/layout';
import { MenuInfo } from "rc-menu/lib/interface";
import router, { IRouter } from '../router/router';

const { Header, Content, Sider } = Layout;

const headeItems = ['管理', '推广', '仓库'];

// 定义侧边栏内容: 非集中管理的方式
// const siderItems: MenuProps['items'] = [
//     {
//         key: 'userMenu',
//         icon: <UserOutlined />,
//         label: 'User',
//         children: [
//             {
//                 key: '/user/list',
//                 label: '用户管理',
//             },
//         ]
//     },
//     {
//         key: 'itemMenu',
//         icon: <ShoppingCartOutlined />,
//         label: 'Item',
//         children: [
//             {
//                 key: '/role/list',
//                 label: '商品管理',
//             }
//         ]
//     }
// ]

export default function AppLayout({ children }: { children?: ReactNode }) {

    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>([])

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate();
    const location = useLocation();

    // 设置菜单栏动态高亮的方式
    useEffect(() => {
        // 找到匹配当前路径名的路由对象， 返回一个数组
        const routerList = matchRoutes(router, location.pathname);
        if (routerList) {
            setDefaultSelectedKeys(routerList.map((r) => r.pathname));
        }
    }, [location.pathname])

    // 首次加载组件时还没有defaultSelectedKeys，阻止其渲染
    if (defaultSelectedKeys.length === 0) {
        return null;
    }


    // 通过定义好的路由表动态地：
    // 生成侧边栏
    // 计算路由
    function getMenuList(routers: IRouter[]): MenuProps['items'] {
        let menuList: MenuProps['items'] = [];
        for (let router of routers) {

            // 不显示侧边栏的首页标签
            if (router.hide) {
                continue;
            }

            let tmp = {
                key: router.path,
                label: router.label,
                icon: router.icon
            } as MenuProps;
            if (router.children) {
                // 使用递归将子路由传入
                // @ts-ignore
                tmp.children = getMenuList(router.children)
            }
            // @ts-ignore
            menuList.push(tmp);
        }
        return menuList
    }

    // 设置Menu的onClick事件，参数类型需手动引入
    function go2Page(info: MenuInfo) {
        navigate(info.key);
    }

    return (
        <Layout className="layout">
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={headeItems.map((item, index) => {
                        return {
                            key: index,
                            label: `${item}`,
                        };
                    })}
                />
            </Header>
            <Layout>
                <Sider
                    width={200}
                    style={{
                        background: colorBgContainer,
                        overflow: 'auto',
                        height: '100vh',
                        position: 'relative',
                        left: 0,
                        top: 0,
                        bottom: 0,
                    }}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={defaultSelectedKeys}
                        defaultOpenKeys={defaultSelectedKeys}
                        style={{ height: '100%', borderRight: 0 }}
                        items={getMenuList(router)}
                        onClick={go2Page}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        {children}
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
    );
};