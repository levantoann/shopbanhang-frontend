import { Button } from "antd"
import React from "react"
import {SearchOutlined} from '@ant-design/icons';
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
    const {size,placeholder,textbutton,
        bordered,backgroundColorInput='#fff',
        backgroundColorButton='rgb(13,92,182)',
        colorButton = '#fff'
    } 
    = props
    return(
        <div style={{display:'flex'}}>
            <InputComponent size={size} 
                placeholder={placeholder} 
                bordered={bordered} 
                style={{backgroundColor: backgroundColorInput, borderRadius: 0 } }
                {...props}/>
            <ButtonComponent size={size} 
                bordered={bordered} 
                styleButton={{backgroundColor: backgroundColorButton,color:colorButton, border:!bordered && 'none',borderRadius: 0 } }
                icon={<SearchOutlined color={colorButton} style={{color:'#fff'}} />}
                textbutton={textbutton}
                styleTextButton={{ color:colorButton}}
            />

        </div>
    )
}
export default ButtonInputSearch