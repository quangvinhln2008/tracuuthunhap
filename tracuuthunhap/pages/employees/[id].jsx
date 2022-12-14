import React, {useEffect, useState} from 'react';
import { Button, Form, Input, Select } from 'antd';
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import style from './index.module.css'
import { Donvi, NgachNV } from './constant';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const EmployeesEdit =()=>{
  const [form] = Form.useForm();
  const router = useRouter()
  const [rToken, setrToken] = useState()
  const [dataEdit, setDataEdit] = useState()

  useEffect(()=>{
    getDataEdit()
    setrToken(window.localStorage.getItem('rTokenTracuu'))
  },[]) 

  useEffect(()=>{
    form.setFieldsValue({
        MANV: dataEdit?.MANV,
        HOLOT: dataEdit?.HOLOT,
        TENNV: dataEdit?.TENNV,
        EMAIL: dataEdit?.EMAILNV,
        MADONVI: dataEdit?.MADONVI,
        MANGACH: dataEdit?.MANGACH,
    })
  }, [dataEdit])

  async function getDataEdit(){
    await axios
      .get(`http://localhost:3001/employees/${router.query.id}`)
      .then((res) => {
        const result = {
          status: res.status,
          data: res.data.result.recordset,
        }
        console.log('res', res)
        console.log('result', result)

        setDataEdit(result.data[0])
        return(result)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
        toast.error(error?.response)
      })
  };

  async function onFinish(values){
    console.log(values);
    return await axios
      .post(`http://localhost:3001/employees/update/${router.query.id}`, {token: rToken, manv: values.MANV, holot :values.HOLOT, tennv: values.TENNV, email: values.EMAIL, madonvi: values.MADONVI , mangach: values.MANGACH})
      .then((res) => {
        const result = {
          status: res.status,
          data: res.data.result.recordset,
        }
        result?.data[0].status === 200 ? toast.success(result?.data[0].message): toast.error(result?.data[0].message)
        // router.reload()
        return(result)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response)
        toast.error(error?.response)
      })
  };

  function onReset () {
    form.resetFields();
  };

  function backToList() {
    router.push("/employees")
  };

  function onMaNvChange(value){
    form.setFieldsValue({
      EMAIL: value.target.value.toLowerCase() + '@ufm.edu.vn'
    })
  }
  function onGenderChange (value)  {
    switch (value) {
      case 'male':
        form.setFieldsValue({
          note: 'Hi, man!',
        });
        return;

      case 'female':
        form.setFieldsValue({
          note: 'Hi, lady!',
        });
        return;

      case 'other':
        form.setFieldsValue({
          note: 'Hi there!',
        });
    }
  };

  return(
  <>
      <Head>
        <title>Th??m m???i nh??n vi??n</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon-16x16.png" />
      </Head>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="MANV"
          label="M?? nh??n vi??n"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input onChange={onMaNvChange} readOnly />
        </Form.Item>
        <Form.Item
        name="HOLOT"
        label="H??? l??t"
        rules={[
          {
            required: true,
          },
        ]}
      >
          <Input />
        </Form.Item>
        <Form.Item
          name="TENNV"
          label="T??n"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="EMAIL"
          label="Email"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="MADONVI"
          label="????n v???"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Ch???n ????n v???"
            allowClear
          >
            {Donvi}
          </Select>
        </Form.Item>
        <Form.Item
          name="MANGACH"
          label="Ng???ch"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Ch???n ng???ch nh??n vi??n"
            allowClear
          >
            {NgachNV}
          </Select>
      </Form.Item>
      
      <Form.Item {...tailLayout}>
        <Button className={style.button} type="primary"  htmlType="submit">
          C???p nh???t
        </Button>
        <Button className={style.button} htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button type="link" htmlType="button" onClick={backToList}>
          Tr??? v??? danh m???c nh??n vi??n
        </Button>
      </Form.Item>
    </Form>
    <ToastContainer />
  </>)
}


export default EmployeesEdit;