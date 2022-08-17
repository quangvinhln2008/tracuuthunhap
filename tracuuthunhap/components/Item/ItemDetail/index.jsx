import React,  { useEffect, useState } from "react";
import { HStack, Text } from "@chakra-ui/react";
import {includeString, removeString} from './constants'
const ItemDetail = (props) =>{
  const {item} = props

  const contains = includeString.some(element => {
    if (item?.TENTHUOCTINH.indexOf(element) !== -1) {
      return true;
    }
  
    return false;
  });
  
  const replaceString = (() =>{
    debugger
    if(item?.TENTHUOCTINH.indexOf(removeString) !== -1){
      return true;
    }
    return false
  })
  return ( 
    <>
      <HStack marginTop={2} padding={2} borderBottom={"1px solid #CBD5E0"} alignItems={"center"} justifyContent="space-between">
        <Text width={"80%"} noOfLines={2} fontWeight = {contains ? 'bold': 'normal'}>{replaceString? item?.TENTHUOCTINH.replace(removeString ,""): item?.TENTHUOCTINH}</Text>
        <Text fontWeight ={contains ? 'bold': 'normal'}>{Number(item?.GIATRITHUOCTINH).toLocaleString('pl-PL')}</Text>
      </HStack>
    </>
   );
}

export default ItemDetail;