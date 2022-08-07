import React,  { useEffect, useState } from "react";
import { HStack, Text } from "@chakra-ui/react";

const ItemDetail = (props) =>{
  const {item} = props
  console.log('item detail', item)
  return ( 
    <>
      <HStack marginTop={2} padding={2} borderBottom={"1px solid #CBD5E0"} alignItems={"center"} justifyContent="space-between">
        <Text width={"80%"} noOfLines={2} fontWeight ={item?.TENTHUOCTINH?.trim() === "TỔNG THU NHẬP" ? 'bold': 'normal'}>{item?.TENTHUOCTINH}</Text>
        <Text fontWeight ={item?.TENTHUOCTINH?.trim() === "TỔNG THU NHẬP" ? 'bold': 'normal'}>{Number(item?.GIATRITHUOCTINH).toLocaleString('pl-PL')}</Text>
      </HStack>
    </>
   );
}

export default ItemDetail;