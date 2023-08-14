import React from 'react'

const CommentButtonComponent = (props) => {
    const {dataHref,width} = props
    return (
      <div style={{marginTop: '-5px -12px 0'}} className="testt">
        <div class="fb-comments" data-href={dataHref} data-width={width} data-numposts="5"></div>
  
      </div>
    )
  }

export default CommentButtonComponent