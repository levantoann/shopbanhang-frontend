import React, { useState } from "react";
import TypeProduct from "../../componets/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from "./style";
import SliderComponent from "../../componets/SliderComponent/SliderComponent";
import slider1  from "../../assets/images/slider1.png"
import slider2  from "../../assets/images/slider2.png"
import slider3  from "../../assets/images/slider3.png"
import CardComponent from "../../componets/CardComponent/CardComponent";
import FooterComponent from "../../componets/FooterComponent/FooterComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductSerVice from '../../services/ProductService'
import { useSelector } from "react-redux";
import Loading from "../../componets/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect } from "react";

const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 1000)
    const [loading, setLoading] = useState(false)
    const [limit, setLimit] = useState(6)
    const [typeProducts, setTypeProducts] = useState([])
    const fetchProductAll = async(context) => {
        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context?.queryKey[2]
        const res = await ProductSerVice.getAllProduct(search, limit)
            return res
    }

    const fetchAllTypeProduct = async () => {
        const res = await ProductSerVice.getAllTypeProduct()
        if(res?.status === 'OK'){
            setTypeProducts(res?.data)
        }
    }

    const {isLoading, data: products, isPreviousData} = useQuery(['products',limit,searchDebounce], fetchProductAll, {retry: 3, retryDelay: 1000,keepPreviousData:true})

    useEffect(() => {
        fetchAllTypeProduct()
    },[])

    return (
        <Loading isLoading={isLoading || loading}>
        <div style={{width:'1640px',margin:'0 auto'}}>
            <WrapperTypeProduct>
                {typeProducts.map((item) => {
                    return (
                        <TypeProduct name={item} key={item} />
                    )
                })}
            </WrapperTypeProduct>
        </div>
        <div className="body" style={{width:'100%',backgroundColor:'#efefef'}}>
        <div id="container" style={{backgroundColor:'#efefef',height:'1100px',width:'1620px',margin:'0 auto'}}>
        <SliderComponent arrImages={[slider1,slider2,slider3]}/>
        <WrapperProducts>
            {products?.data?.map((product) => {
                return (
                    <CardComponent 
                    key={product._id} 
                    countInStock={product.countInStock} 
                    description={product.description} 
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    type={product.type}
                    selled={product.selled}
                    discount={product.discount}
                    id={product._id}
                    />
                )
            })}
        </WrapperProducts>
        <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'10px'}}>
        <WrapperButtonMore textbutton={isPreviousData ? 'Load more' : "Xem Thêm"} type="outline" styleButton={{
            border:'1px solid rgb(11,116,229)',color: `${products?.total === products?.data?.length ? '#ccc' : 'rgb(11,116,229)'}`,
            width:'240px',height:'38px',borderRadius:'4px'
        }}
        disabled={products?.total === products?.data?.length || products?.totalPage === 1}
        styleTextButton={{fontWeight:500,color: products?.total === products?.data?.length && '#fff' }}
        onClick={() => setLimit((prev) => prev + 6)}
        />
        </div>
        </div>
        <FooterComponent />
        </div>
        </Loading>
    )
}
export default HomePage