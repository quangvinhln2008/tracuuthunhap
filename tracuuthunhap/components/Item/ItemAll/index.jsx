import React,  { useEffect, useState } from "react";
import { Wrap } from "@chakra-ui/react";
import Item from "../index";

const ItemAll =(props)=>{
  const {data, nam, loading} = props
  console.log('data item all', data)
  return(
    <>
    <Wrap>
      {data?.map((item, index) =>(
          <Item loading ={loading} thang ={index + 1} nam ={nam} data ={item} />
        ))}
    </Wrap>
    </>
  )
}

export default ItemAll;