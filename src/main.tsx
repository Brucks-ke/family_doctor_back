
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.less'
import {Provider} from "react-redux"
import store from './stores/index.ts'
import {PersistGate} from "redux-persist/lib/integration/react"
import {persistStore} from "redux-persist"
const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}> 
            <App />
        </PersistGate>
    </Provider>
)
