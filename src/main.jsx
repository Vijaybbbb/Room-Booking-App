import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import {store,persistor} from './Redux/Store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { SearchContextProvider } from './context/SearchContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <SearchContextProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
       
           <App />
        
      </PersistGate>
    </Provider>
    </SearchContextProvider>
  </React.StrictMode>,
)
