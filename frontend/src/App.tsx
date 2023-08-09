import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { Spin } from 'antd';
import router from './router/router';

function App() {
  return (
    <>
      <Suspense fallback={<Spin />}>
        {
          useRoutes(router)
        }
      </Suspense>
    </>
  );
}

export default App;
