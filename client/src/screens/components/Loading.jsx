import React from 'react';
import loading from "./loading.gif";

const Loading = () => {
  return (
    <div style={{marginLeft:"35vw",marginTop:"15vh"}}>
        <img src={loading} alt='loading' />
    </div>
  )
}

export default Loading