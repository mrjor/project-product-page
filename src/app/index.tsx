import '/src/css/index.css'

import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from '@/store';
import App from '@/app/pages/app'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />  
  </Provider>,
)
