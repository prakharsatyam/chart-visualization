import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider,createRoutesFromElements, Route} from 'react-router-dom'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import Layout from './components/Layout.jsx'
import  BarChart from './components/BarChart.jsx'


const querycli = new QueryClient();
const router =createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout/>}>
    <Route path='/bar' element={<BarChart/>}/>

  </Route>
))
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <QueryClientProvider client={querycli}>
    <RouterProvider router={router}/>
    </QueryClientProvider>
  </React.StrictMode>
)
