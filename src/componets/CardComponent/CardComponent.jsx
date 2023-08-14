import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperImageStyle, WrapperPriceText, WrapperReportText } from './style'
import {StarFilled} from '@ant-design/icons'
import logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import { convertPrice } from '../../untils'
const CardComponent = (props) => {
  const {countInStock, description, image, name, price, rating, type, discount, selled, id } = props
  const navigate = useNavigate()
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`)
  }
  return (
        <WrapperCardStyle
        hoverable
        headStyle={{width:'200px',height:'200px'}}
        style={{ width: '230px'}}
        bodyStyle={{ padding: '10px' }}
        cover={<img alt="example" src={image} />}
        onClick={() => handleDetailsProduct(id)}
    >
        <WrapperImageStyle src={logo}/>
        <StyleNameProduct style={{ marginBottom: "10px" }}>{name}</StyleNameProduct> 
        <WrapperReportText>
            <span style={{marginRight:'4px'}}>
            <span style={{fontSize:'14px'}}>{rating} </span><span><StarFilled style={{fontSize:'12px',color:'rgb(253,216,54)'}}/></span></span>
            <span style={{fontSize:'14px'}}> | Đã bán {selled || 1000}+</span>
             </WrapperReportText>
            <WrapperPriceText>
                <span style={{ marginRight:'8px'}}>{convertPrice(price)}</span>
                <WrapperDiscountText>
                     -{discount || 5} %
                </WrapperDiscountText>
                </WrapperPriceText>
        
    </WrapperCardStyle>
  )
}

export default CardComponent