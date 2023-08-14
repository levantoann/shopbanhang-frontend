import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    background-color: rgb(26,148,255);
    algin-items:center;
    gap:16px;
    width:100%;
    flex-wrap:nowrap;
    padding:10px 120px;

`
export const WrapperTextHeader = styled.span`
    font-size:18px;
    color: #fff;
    font-weight: bold;
    text-algin: center;
    padding:10px 0;
    display: flex;
    align-items: center;
    flex-grow: 1;
    justify-content: center;
    
`
export const WrapperHeaderAccount = styled.div`
    display: flex;
    algin-items: center;
    color:#fff;
    font-size:13px;
`
export const WrapperTextHeaderSmall = styled.span`
    font-size:12px;
    color:#fff;
    white-space:nowrap;
`
export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        background: ;
        color: rgb(26, 148, 255);
    }
`
