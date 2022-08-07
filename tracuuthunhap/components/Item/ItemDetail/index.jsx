import React,  { useEffect, useState } from "react";
import { HStack, Text } from "@chakra-ui/react";

const ItemDetail = (props) =>{
  const {item} = props
  console.log('item', item)
  return ( 
    <>
      <HStack marginTop={2} padding={2} borderBottom={"1px solid #CBD5E0"} alignItems={"center"} justifyContent="space-between">
        <Text width={"80%"} noOfLines={2} fontWeight ={item?.TenThuocTinh.trim() === "TỔNG THU NHẬP" ? 'bold': 'normal'}>{item?.TenThuocTinh}</Text>
        <Text fontWeight ={item?.TenThuocTinh.trim() === "TỔNG THU NHẬP" ? 'bold': 'normal'}>{Number(item?.GIATRITHUOCTINH).toLocaleString('pl-PL')}</Text>
      </HStack>
    </>
   );
}

export default ItemDetail;