import React,{useState} from "react";
import { useRouter } from 'next/router'
import HeaderApp from '../Header'
import Navbar from "../Navbar";
import Footer from "../Footer";

import { Layout } from 'antd';

const { Header, Content } = Layout;

const LayoutApp = (props) => {
  const {children} = props
  const [collapsed, setCollapsed] = useState(false);
  
  function toogleMenu(){
    setCollapsed(!collapsed)
  }
  return ( 
    <Layout>
    <Navbar collapsed ={collapsed} />
    <Layout className="site-layout" style={{width: "auto"}} >
        <HeaderApp collapsed = {collapsed} onClickHandle = {toogleMenu} />
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background:'#fff'
          }}
        >
         {children}
        </Content>
        
      <Footer />
    </Layout>
  </Layout> 
   );
}

export default LayoutApp;