import React, { useEffect } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../componets/InputForm/InputForm'
import ButtonComponent from '../../componets/ButtonComponent/ButtonComponent'
import imageLogo from '../../assets/images/logo-login.png'
import { Image } from 'antd'
import { useState } from 'react'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../componets/LoadingComponent/Loading'
import jwt_decode from "jwt-decode"
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide'

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const location = useLocation()
  const [email, setEmail ] = useState('')
  const [password, setPassword ] = useState('')
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const mutation = useMutationHooks(
    data => UserService.loginUser(data)
  )
  const {data, isLoading, isSuccess, isError} = mutation

  useEffect(() => {
    if (isSuccess){
      if(location?.state){
        navigate(location?.state)
      } else {
        navigate('/')
      }
      localStorage.setItem('access_token',JSON.stringify(data?.access_token))
      localStorage.setItem('refresh_token',JSON.stringify(data?.refresh_token))
      if (data?.access_token) {
        const decode = jwt_decode(data?.access_token)
        if(decode?.id){
          handleGetDetailsUser(decode?.id, data?.access_token)
        }
      }
    }
  },[isSuccess])

  const handleGetDetailsUser = async (id, token) => {
    const storage = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storage)
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({...res?.data, access_token:token, refreshToken}))
  }


  const handleNavigateSigUp = () => {
    navigate('/sign-up')
  }

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleSigIn = () => {
    mutation.mutate({
      email,
      password 
    })
  }

  return (
   <div style={{display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,0.53)',height:'100vh'}}>
     <div style={{ width:'800px',height:'445px',borderRadius:'6px',background:'#fff',display:'flex'}}>
     <WrapperContainerLeft>
      <h1>Xin Chào</h1>
      <p style={{fontSize:'13px'}}>Đăng nhâp vào tạo tài khoản</p>
      <InputForm style={{ marginBottom: '10px'}} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail}/>
      <div style={{ position: 'relative'}}>
        <span 
        onClick={() => setIsShowPassword(!isShowPassword)}
          style={{
            zIndex: 10,
            position: 'absolute',
            top: '4px',
            right: '8px'
          }}
        >{
            isShowPassword ? (
              <EyeFilled />
            ) : (
              <EyeInvisibleFilled />
            )
          }
        </span>
      <InputForm  placeholder="password" 
      type={isShowPassword ? "text" : "password"} 
      value={password} 
      onChange={handleOnchangePassword}
      />
      </div>
      {data?.status == 'ERR' && <span style={{color:'red'}}>{data?.message}</span>}
      <Loading isLoading={isLoading}>
      <ButtonComponent
                disabled={!email.length || !password.length}
                onClick={handleSigIn}
                size={40} 
                styleButton={{
                    backgroundColor:'rgb(255,57,69)',
                    height:'48px',
                    width:'100%',
                    border:'none',
                    borderRadius:'4px',
                    margin:'26px 0 10px'
                }}
                textbutton={'Đăng Nhập'}
                styleTextButton={{ color:'#fff',fontSize:'15px',fontWeight:'700'}}
                >
                </ButtonComponent>
                </Loading>
                <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
                <p style={{fontSize:'14px'}}>Chưa có tài khoản? <span><WrapperTextLight onClick={handleNavigateSigUp}> Tạo tài khoản</WrapperTextLight></span></p>
                </WrapperContainerLeft>
      <WrapperContainerRight>
        <Image src={imageLogo} preview={false} alt="image-logo" height="203px" width="203px"/>
        <h4>Mua Sắm Tại Webbanhang</h4>
      </WrapperContainerRight>
    </div>
   </div>
  )
}

export default SignInPage