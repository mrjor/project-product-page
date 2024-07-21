import '@/css/index.css'

import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from 'react-redux'
import Axios from "axios";
import { store } from '@/store';

import Products from './pages/products'
import Product from './pages/product'

Axios.defaults.baseURL = 'http://localhost:3000';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Products />,
  },
  {
    path: "/product/:id",
    element: <Product />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
