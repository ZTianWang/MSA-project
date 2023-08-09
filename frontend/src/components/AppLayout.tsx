import { ReactNode, useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Alert, Breadcrumb, Col, Layout, Menu, Row, Spin, message, theme } from 'antd';
import { Outlet, matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import { Footer } from 'antd/es/layout/layout';
import { MenuInfo } from "rc-menu/lib/interface";
import router, { IRouter } from '../router/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

const { Header, Content, Sider } = Layout;

const headeItems = ['Management', 'Log out'];

export default function AppLayout({ children }: { children?: ReactNode }) {

    const { loading, admin } = useSelector(
        (state: RootState) => state.admin
    );
    const dispatch: AppDispatch = useDispatch();

    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>([])

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        checkToken();

        window.logout = () => {
            localStorage.clear();
            navigate('/login');
        }
    }, [])

    // Set the dynamic highlighting mode of the menu bar
    useEffect(() => {
        // Find a route that matches the current pathname
        const routerList = matchRoutes(router, location.pathname);
        if (routerList) {
            setDefaultSelectedKeys(routerList.map((r) => r.pathname));
        }
    }, [location.pathname])

    // Check whether the token exists
    function checkToken() {
        const token = localStorage.getItem("token");
        if (!token && location.pathname !== "/login") {
            message.error('Please login!');
            navigate("/login");
        }
        return true;
    }

    // Dynamic routes table management：
    // Generate a sidebar
    // Computate routes
    function getMenuList(routers: IRouter[]): MenuProps['items'] {
        let menuList: MenuProps['items'] = [];
        for (let router of routers) {

            if (router.hide) {
                continue;
            }

            let tmp = {
                key: router.path,
                label: router.label,
                icon: router.icon
            } as MenuProps;
            if (router.children) {
                // pass children route
                // @ts-ignore
                tmp.children = getMenuList(router.children)
            }
            // @ts-ignore
            menuList.push(tmp);
        }
        return menuList
    }

    function go2Page(info: MenuInfo) {
        navigate(info.key);
    }

    if (loading) {
        return (
            <Spin tip="Loading...">
                <Alert
                    message="Waiting for loading"
                    description="We are Waiting for loading"
                    type="info"
                />
            </Spin>
        );
    }

    // There is no defaultSelectedKeys when the component is first loaded, so prevent it from rendering
    if (defaultSelectedKeys.length === 0) {
        return null;
    }

    return (
        <Layout className="layout">
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                <Row>
                    <Col span={22}>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['0']}
                            items={headeItems.map((item, index) => {
                                return {
                                    key: index,
                                    label: `${item}`,
                                    onClick: index === 1 ? () => window.logout() : () => { }
                                };
                            })}
                        />
                    </Col>
                </Row>
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
                        <Breadcrumb.Item>Items</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
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
