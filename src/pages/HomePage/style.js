import styled from "styled-components";
import ButtonComponent from "../../componets/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 44px;
    font-size:30px;
`
export const WrapperButtonMore = styled(ButtonComponent)`
    background: white;
    color: rgb(11, 116, 229); 
    &:hover {
       color: #fff;
       background: rgb(13 ,92 ,182);
       span {
         color:#fff;
       }
    }
    width: 100%;
    text-align: center;
    cursor:${(props) => props.disabled ? 'not-allowed' : 'pointers'}
    
`
export const WrapperProducts = styled.div`
    display:flex;
    justify-content:flex-star;
    gap:48px;
    margin-top:20px;
    flex-wrap:wrap;
`