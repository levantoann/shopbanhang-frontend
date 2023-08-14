import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DefaultComponent from './componets/DefaultComponent/DefaultComponent'
import { isJsonString } from './untils'
import jwt_decode from "jwt-decode"
import * as UserService from './services/UserService'
import { useDispatch, useSelector } from 'react-redux'
import { resetUser, updateUser } from './redux/slides/userSlide'
import axios from 'axios'
import { routes } from './routes'
import { useState } from 'react'
import Loading from './componets/LoadingComponent/Loading'


function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    setIsLoading(true)
    const {storageData, decoded} = handleDecoded()
        if(decoded?.id){
          handleGetDetailsUser(decoded?.id, storageData)
        }
    setIsLoading(false)
  },[])

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if(storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      decoded = jwt_decode(storageData)
    }
    return { decoded, storageData}
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    // Do something before request is sent
    const currenTime = new Date()
    const { decoded} = handleDecoded()
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const decodedRefreshToken = jwt_decode(refreshToken)
    if (decoded?.exp < currenTime.getTime() / 1000){
      if(decodedRefreshToken?.exp > currenTime.getTime() / 1000){
        const data = await UserService.refreshToken(refreshToken)
        config.headers['token'] = `Bearer ${data?.access_token}`
      } else {
        dispatch(resetUser())
      }
    }
    return config;
  },(err) => {
    return Promise.reject(err);
  });
  
  const handleGetDetailsUser = async (id, token) => {
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({...res?.data, access_token:token, refreshToken: refreshToken}))
  }
  return (
    <div style={{height: '100vh', width: '100%'}}>
      <Loading isLoading={isLoading}>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const Layout = route.isShowHeader ? DefaultComponent:Fragment
            return (
              <Route key={route.path} path={route.path} element={
                <Layout>
                <Page/>
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
      </Loading>
    </div>
  )
}
export default App