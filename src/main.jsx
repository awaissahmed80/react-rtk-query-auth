import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { AppStore, persistor } from './redux'
import { ToastContainer } from './ui-components'
import { ToastProvider } from './contexts/toast.context'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.jsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={AppStore}>
            <PersistGate loading={null} persistor={persistor}>
                <ToastProvider>
                    <ToastContainer />
                    <App /> 
                </ToastProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
)
