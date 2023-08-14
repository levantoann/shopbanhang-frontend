import React, { useEffect } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../componets/InputForm/InputForm'
import ButtonComponent from '../../componets/ButtonComponent/ButtonComponent'
import imageLogo from '../../assets/images/logo-login.png'
import { Image } from 'antd'
import { useState } from 'react'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../componets/LoadingComponent/Loading'
import * as message from '../../componets/Message/Message'

const SignUpPage = () => {
  const navigate = useNavigate()
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const [email, setEmail ] = useState('')
  const [password, setPassword ] = useState('')
  const [confirmPassword, setConfirmPassword ] = useState('')

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }

  const mutation = useMutationHooks(
    data => UserService.signupUser(data)
  )

  const {data,isLoading,isSuccess,isError} = mutation
  
  useEffect(() => {
    if(isSuccess){
      message.success()
      handleNavigateSigIn()
    } else if (isError){
      message.error()
    }
  },[isSuccess,isError])

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }

  const handleNavigateSigIn = () =>{
    navigate('/sign-in')
  }

  const handleSignup = () => {
    mutation.mutate({ email,password,confirmPassword })
  }

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,0.53)',height:'100vh'}}>
     <div style={{ width:'800px',height:'445px',borderRadius:'6px',background:'#fff',display:'flex'}}>
     <WrapperContainerLeft>
      <h1>Xin Chào</h1>
      <p style={{fontSize:'13px'}}>Đăng nhâp vào tạo tài khoản</p>
      <InputForm style={{ marginBottom: '10px'}} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail}/>
      <div style={{ position: 'relative' }}>
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
      <InputForm style={{ marginBottom: '10px'}}  placeholder="password" type={isShowPassword ? "text" : "password"} 
      value={password} onChange={handleOnchangePassword}/>
      </div>
      <div style={{ position: 'relative' }}>
            <span
            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
            style={{
              zIndex: 10,
              position: 'absolute',
              top: '4px',
              right: '8px'
            }}
          >{
              isShowConfirmPassword ? (
                <EyeFilled />
              ) : (
                <EyeInvisibleFilled />
              )
            }
          </span>
      <InputForm  placeholder="comfirm password" type={isShowConfirmPassword ? "text" : "password"}
      value={confirmPassword} onChange={handleOnchangeConfirmPassword}/>
          </div>
          {data?.status === 'ERR' && <span style={{color:'red'}}>{data?.message}</span>}
          <Loading isLoading={isLoading}>
      <ButtonComponent
                disabled={!email.length || !password.length || !confirmPassword.length}
                onClick={handleSignup}
                size={40} 
                styleButton={{
                    backgroundColor:'rgb(255,57,69)',
                    height:'48px',
                    width:'100%',
                    border:'none',
                    borderRadius:'4px',
                    margin:'26px 0 10px'
                }}
                textbutton={'Đăng Ký'}
                styleTextButton={{ color:'#fff',fontSize:'15px',fontWeight:'700'}}
                >
                </ButtonComponent>
                </Loading>
                <p style={{fontSize:'14px'}}>Bạn đã có tài khoản? <span><WrapperTextLight onClick={handleNavigateSigIn}> Đăng nhập</WrapperTextLight></span></p>
                </WrapperContainerLeft>
      <WrapperContainerRight>
        <Image src={imageLogo} preview={false} alt="image-logo" height="203px" width="203px"/>
        <h4>Mua Sắm Tại Webbanhang</h4>
      </WrapperContainerRight>
    </div>
   </div>
  )
}

export default SignUpPage