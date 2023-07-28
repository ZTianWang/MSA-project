import React, { Suspense } from 'react';
import './App.css';
import Login from './features/login';
import { Route, Routes, useRoutes } from 'react-router-dom';
import User from './features/user';
import AppLayout from './components/AppLayout';
import Item from './features/item';
import { Spin } from 'antd';
import router from './router/router';

function App() {
  return (
    <>
      {/* 在App组件中管理路由不方便，应使用集中管理 */}
      {/* <Routes>
        <Route path='/' element={<AppLayout />} >
          <Route path='/user/list' element={<User />} />
          <Route path='/item/list' element={<Item />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes> */}

      {/* 使用hook useRoutes() 获取路由表中的路由信息 */}
      <Suspense fallback={<Spin />}>
        {
          useRoutes(router)
        }
      </Suspense>
    </>
  );
}

export default App;
