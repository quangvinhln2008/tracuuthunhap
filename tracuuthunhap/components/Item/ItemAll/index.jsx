import React,  { useEffect, useState } from "react";
import { Wrap } from "@chakra-ui/react";
import Item from "../index";

const ItemAll =(props)=>{
  const {data, nam, loading} = props
  return(
    <>
    <Wrap>
      {data?.map((item, index) =>(
          <Item title ={`Thu nhập tháng ${index + 1} năm ${nam}`}  loading ={loading} thang ={index + 1} nam ={nam} data ={item} />
        ))}
    </Wrap>
    </>
  )
}

export default ItemAll;