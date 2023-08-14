import { Col, Image, InputNumber, Row } from 'antd'
import React, { useEffect } from 'react'
import imageProductSmall from '../../assets/images/small.webp'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from './style'
import {PlusOutlined, MinusOutlined} from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from "@tanstack/react-query";
import Loading from '../LoadingComponent/Loading'
import { Rate } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import * as message from '../Message/Message'
import { addOrderProduct, resetOrder } from '../../redux/slides/orderSlide'
import { convertPrice, initFacebookSDK } from '../../untils'
import LikeButtonComponent from '../LikeButtonComponent/LikeButtonComponent'
import CommentButtonComponent from '../CommentButtonComponent/CommentButtonComponent'

const ProductDetailsComponent = ({idProduct}) => {
    const [numProduct, setNumProduct] = useState(1)
    const user = useSelector((state) => state.user)
    const order = useSelector((state) => state.order)
    const [errorLimitOrder,setErrorLimitOrder] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const onChange = (value) => { 
        setNumProduct(Number(value))
    }
    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if(id){
            const res = await ProductService.getDetailsProduct(id)
            return res.data
        }
    }
    
    useEffect(() => {
        initFacebookSDK()
    },[])

    useEffect(() => {
        const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id) 
        if((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
            setErrorLimitOrder(false)
        } else if(productDetails?.countInStock === 0){
            setErrorLimitOrder(true)
        }
    },[numProduct])

    useEffect(() => {
        if(order.isSucessOrder) {
            message.success('Đã thêm vào giỏ hàng')
        }
        return () => {
            dispatch(resetOrder())
        }
    }, [order.isSucessOrder])

    const handleChangeCount = (type, limited) => {
        if(type === 'increase') {
            if(!limited) {
                setNumProduct(numProduct + 1)
            }
        }else {
            if(!limited) {
                setNumProduct(numProduct - 1)
            }
        }
    }

    const { isLoading, data: productDetails } = useQuery(['product-details', idProduct], fetchGetDetailsProduct, { enabled : !!idProduct})
    const handleAddOrderProduct = () => {
        if(!user?.id) {
            navigate('/sign-in', {state: location?.pathname})
        }else {
            // {
            //     name: { type: String, required: true },
            //     amount: { type: Number, required: true },
            //     image: { type: String, required: true },
            //     price: { type: Number, required: true },
            //     product: {
            //         type: mongoose.Schema.Types.ObjectId,
            //         ref: 'Product',
            //         required: true,
            //     },
            // },
            const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
            if((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
                dispatch(addOrderProduct({
                    orderItem: {
                        name: productDetails?.name,
                        amount: numProduct,
                        image: productDetails?.image,
                        price: productDetails?.price,
                        product: productDetails?._id,
                        discount: productDetails?.discount,
                        countInstock: productDetails?.countInStock
                    }
                }))
            } else {
                setErrorLimitOrder(true)
            }
        }
    }






  return (
    <Loading isLoading={isLoading}>
    <Row style={{padding:'16px',background:'#fff',borderRadius:'4px'}}>
        <Col span={10} style={{borderRight:'1px solid #e5e5e5',paddingRight:'8px'}}>
            <Image src={productDetails?.image} alt="image product" preview={false} />
            <Row style={{paddingTop:'10px',justifyContent:'space-between'}}>
                <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall src={productDetails?.image} alt="image small" preview={true} />
                </WrapperStyleColImage>

                <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall src={productDetails?.image} alt="image small" preview={true} />
                </WrapperStyleColImage>

                <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall src={productDetails?.image} alt="image small" preview={true} />
                </WrapperStyleColImage>

                <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall src={productDetails?.image} alt="image small" preview={true} />
                </WrapperStyleColImage>

                <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall src={productDetails?.image} alt="image small" preview={true} />
                </WrapperStyleColImage>

                <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall src={productDetails?.image} alt="image small" preview={true} />
                </WrapperStyleColImage>

            </Row>
        </Col>
        <Col span={14} style={{paddingLeft:'10px'}}>
            <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
            <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating}/>
            <WrapperStyleTextSell> | Đã bán 1000</WrapperStyleTextSell>
            <WrapperPriceProduct>
                <WrapperPriceTextProduct>{convertPrice(productDetails?.price)}</WrapperPriceTextProduct>
            </WrapperPriceProduct>
            <WrapperAddressProduct>
                <span>Giao đến </span>
                <span className='address'>{user?.address}</span>
                <span className='change-address'> Đổi địa chỉ</span>
            </WrapperAddressProduct>
            <LikeButtonComponent 
                dataHref={ process.env.REACT_APP_IS_LOCAL 
                    ? "https://developers.facebook.com/docs/plugins/" 
                    : window.location.href
                } 
            />
            <div style={{margin:'10px 0 20px',padding:'10px 0',borderTop:'1px solid #e5e5e5',borderBottom:'1px solid #ccc'}}>
                <div style={{marginBottom:'10px'}}>Số lượng</div>
                <WrapperQualityProduct>
                    <button style={{border:'none',background:'transparent',cursor:'pointer'}} onClick={() => 
                        handleChangeCount('decrease',numProduct === 1)}>
                        <MinusOutlined style={{color:'#000',fontSize:'20px'}} />
                    </button>
                    <WrapperInputNumber onChange={onChange} defaultValue={1} max={productDetails?.countInStock} min={1} value={numProduct} size="small" />
                     <button style={{border:'none',background:'transparent' ,cursor:'pointer'}} onClick={() => handleChangeCount('increase',numProduct === productDetails?.countInStock)}>
                        <PlusOutlined style={{color:'#000',fontSize:'20px'}} /> 
                    </button>   
                    
                </WrapperQualityProduct>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                <div>
                <ButtonComponent
                size={40} 
                styleButton={{
                    backgroundColor:'rgb(255,57,69)',
                    height:'48px',
                    width:'220px',
                    border:'none',
                    borderRadius:'4px'
                }}
                onClick={handleAddOrderProduct}
                textbutton={'Chọn mua'}
                styleTextButton={{ color:'#fff',fontSize:'15px',fontWeight:'700'}}
                >
                </ButtonComponent>
                {errorLimitOrder && <div style={{color: 'red'}}>San pham het hang</div>}
                </div>
                <ButtonComponent
                size={40} 
                styleButton={{
                    backgroundColor:'#fff',
                    height:'48px',
                    width:'220px',
                    border:'1px solid rgb(13,92,182)',
                    borderRadius:'4px'
                }}
                textbutton={'Mua Trả Sau'}
                styleTextButton={{ color:'rgb(13,92,182)',fontSize:'15px'}}
                >
                </ButtonComponent>
            </div>
        </Col>
        <CommentButtonComponent 
            dataHref={"https://developers.facebook.com/docs/plugins/comments#configurator"
            } 
            width="1600"
        />
    </Row>
    </Loading>
  )
}

export default ProductDetailsComponent