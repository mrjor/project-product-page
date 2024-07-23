import Axios from 'axios';

import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { store } from '@/store';
import Products from './pages/products';
import Product from './pages/product';
import NavBar from '@/components/NavBar';

Axios.defaults.baseURL = 'http://localhost:3000';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Products/>}/>
          <Route path="/product/:id" element={<Product/>}/>
        </Routes>
        </>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
)
