import React, {useEffect, useState} from "react";
import Loading from "../../componets/LoadingComponent/Loading";
import { useQuery } from "@tanstack/react-query";
import * as OrderService from '../../services/OrderService'
import { useSelector } from "react-redux";
import { WrapperContainer, WrapperFooterItem, WrapperHeaderItem, WrapperItemOrder, WrapperListOrder, WrapperStatus } from "./style";
import ButtonComponent from "../../componets/ButtonComponent/ButtonComponent";
import { convertPrice } from "../../untils";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from '../../componets/Message/Message'

const MyOrderPage = () => {
    const location = useLocation()
    const { state } = location
    const navigate = useNavigate()
    const fetchMyOrder = async () => {
        const res = await OrderService.getOrderByUserId(state?.id, state?.token)
        return res.data
    }
    const queryOrder= useQuery({queryKey: ['orders'], queryFn:fetchMyOrder}, {
        enabled: state?.id && state?.access_token
    })
    const {isLoading, data} = queryOrder

    const handleDetailsOrder = (id) => {
        navigate(`/details-order/${id}`,{
            state: {
                token: state?.token
            }
        })
    }

    const mutation = useMutationHooks(
        (data) => {
            const {id, token, orderItems} = data
            const res = OrderService.cancelOrder(id,token,orderItems)
            return res
        }
    )

    const handleCanceOrder = (order) => {
        mutation.mutate({id: order._id, token:state?.token,orderItems: order?.orderItems }, {
            onSuccess: () => {
                queryOrder.refetch()
            }
        })
    }

    const { isLoading: isLoadingCancel, isSuccess: isSuccessCancel, isError: isErrorCancel, data: dataCancel} = mutation

    useEffect(() => {
        if(isSuccessCancel && dataCancel?.status === 'OK'){
            message.success()
        }else if(isErrorCancel){
            message.error()
        }
    },[isErrorCancel,isSuccessCancel])

    const renderProduct = (data) => {
       return data?.map((order) => {
            return <WrapperHeaderItem key={order?._id}> 
            <img src={order?.image} 
                style={{
                width: '70px', 
                height: '70px', 
                objectFit: 'cover',
                border: '1px solid rgb(238, 238, 238)',
                padding: '2px'
                }}
            />
            <div style={{
                width: 260,
                overflow: 'hidden',
                textOverflow:'ellipsis',
                whiteSpace:'nowrap',
                marginLeft: '10px'
            }}>{order?.name}</div>
            <span style={{ fontSize: '13px', color: '#242424',marginLeft: 'auto' }}>{convertPrice(order?.price)}</span>
            </WrapperHeaderItem>
        })
    }

    return (
        <Loading isLoading={isLoading || isLoadingCancel}>
        <WrapperContainer>
        <div style={{height: '100%', width: '1270px', margin: '0 auto'}}>
          <h3 style={{padding: '0 160px'}}>Đơn hàng của tôi</h3>
          <WrapperListOrder>
            {data?.map((order) => {
              return (
                <WrapperItemOrder key={order?._id}>
                  <WrapperStatus>
                    <span style={{fontSize: '14px', fontWeight: 'bold'}}>Trạng thái</span>
                    <div>
                      <span style={{color: 'rgb(255, 66, 78)'}}>Giao hàng: </span>
                      <span style={{color: 'rgb(90, 32, 193)', fontWeight: 'bold'}}>{`${order.isDelivered ? 'Đã giao hàng': 'Chưa giao hàng'}`}</span>
                    </div>
                    <div>
                      <span style={{color: 'rgb(255, 66, 78)'}}>Thanh toán: </span>
                      <span style={{color: 'rgb(90, 32, 193)', fontWeight: 'bold'}}>{`${order.isPaid ? 'Đã thanh toán': 'Chưa thanh toán'}`}</span>
                    </div>
                  </WrapperStatus>
                  {renderProduct(order?.orderItems)}
                  
                  <WrapperFooterItem>
                    <div>
                      <span style={{color: 'rgb(255, 66, 78)'}}>Tổng tiền: </span>
                      <span 
                        style={{ fontSize: '13px', color: 'rgb(56, 56, 61)',fontWeight: 700 }}
                      >{convertPrice(order?.totalPrice)}</span>
                    </div>
                    <div style={{display: 'flex', gap: '10px'}}>
                    <ButtonComponent
                        onClick={() => handleCanceOrder(order)}
                        size={40} 
                        styleButton={{
                            backgroundColor:'#fff',
                            height:'36px',
                            border:'1px solid #9255FD',
                            borderRadius:'4px'
                        }}
                        textbutton={'Hủy đơn hàng'}
                        styleTextButton={{ color:'#9255FD',fontSize:'15px'}}
                      >
                      </ButtonComponent>
                     
                      <ButtonComponent
                      onClick={() => handleDetailsOrder(order?._id)}
                        size={40} 
                        styleButton={{
                            backgroundColor:'#fff',
                            height:'36px',
                            border:'1px solid #9255FD',
                            borderRadius:'4px'
                        }}
                        textbutton={'Xem chi tiết'}
                        styleTextButton={{ color:'#9255FD',fontSize:'15px'}}
                ></ButtonComponent>
                    </div>
                  </WrapperFooterItem>
                </WrapperItemOrder>
              )
            })}
          </WrapperListOrder>
        </div>
        </WrapperContainer>
    </Loading>
    )
}
export default MyOrderPage