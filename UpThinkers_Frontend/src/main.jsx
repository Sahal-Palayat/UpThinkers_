import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './Store/store.js'
import { AuthContext, AuthProvider } from './Context/AuthContext.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { config } from './config.jsx'


const persistor= persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
  
      <Provider store={store}>
        <PersistGate persistor={persistor} >
          <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID ?? import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
          <App />
          </GoogleOAuthProvider>
        </PersistGate>
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
)
