import React from 'react'

const LikeButtonComponent = (props) => {
    const {dataHref,width} = props
    return (
      <div style={{marginTop: '8px'}}>
        <div className="fb-like" data-href={dataHref} data-width={width} data-layout="" data-action="" data-size="" data-share="true"></div>
  
      </div>
    )
  }

export default LikeButtonComponent