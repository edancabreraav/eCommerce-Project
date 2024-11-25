import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './share/css/allPages.css'
import AppAllModules from './AppAllModules'

import { Provider } from 'react-redux'
import store from './ecommerce/redux/store/store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AppAllModules />
    </Provider>
  </StrictMode>,
)