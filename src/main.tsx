import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import store from '@/store.ts'
import { Provider } from "react-redux"
import { NavigationProvider } from "@/context/navigationProvider";
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <NavigationProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </NavigationProvider>
  </BrowserRouter>,
)
