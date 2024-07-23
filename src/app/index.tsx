import Axios from 'axios';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { store } from '@/store';
import Products from './pages/Products';
import Product from './pages/ProductDetail';
import NavBar from '@/components/NavBar';

// Set the base URL for Axios HTTP requests
Axios.defaults.baseURL = 'http://localhost:3000';

// Create a dark theme for the Material-UI components
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

// Render the React application
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>  {/* Provide the Redux store to the application */}
    <ThemeProvider theme={darkTheme}>  {/* Apply the dark theme */}
      <CssBaseline />  {/* Normalize CSS styles across browsers */}
      <BrowserRouter>  {/* Enable routing in the application */}
        <>
          <NavBar/>  {/* Render the navigation bar */}
          <Routes>  {/* Define the application's routes */}
            <Route path="/" element={<Products/>}/>  {/* Route to the Products page */}
            <Route path="/product/:id" element={<Product/>}/>  {/* Route to the ProductDetail page with dynamic ID */}
          </Routes>
        </>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
