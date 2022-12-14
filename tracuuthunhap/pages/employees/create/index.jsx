import React, {useEffect, useState} from 'react';
import { Button, Form, Input, Select } from 'antd';
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import style from '../index.module.css'
import { Donvi, NgachNV } from '../../../constants/constant';
const { Option } = Select;

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

const EmployeesCreate =()=>{
  const [form] = Form.useForm();
  const router = useRouter()
  const [rToken, setrToken] = useState()
  let token

  useEffect(()=>{
    token = window.localStorage.getItem('rTokenTracuu')
  },[]) 

  async function onFinish(values){
    console.log(values);
    return await axios
      .post('http://localhost:3001/employees/create', {token: token, manv: values.MANV, holot :values.HOLOT, tennv: values.TENNV, email: values.EMAIL, madonvi: values.MADONVI , mangach: values.MANGACH})
      .then((res) => {
        const result = {
          status: res.status,
          data: res.data.result.recordset,
        }
        console.log('res', res)
        console.log('result', result)
        result?.data[0].status === 200 ? toast.success(result?.data[0].message): toast.error(result?.data[0].message)
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
        <title>Thêm mới nhân viên</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon-16x16.png" />
      </Head>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="MANV"
          label="Mã nhân viên"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input onChange={onMaNvChange} />
        </Form.Item>
        <Form.Item
        name="HOLOT"
        label="Họ lót"
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
          label="Tên"
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
          label="Đơn vị"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Chọn đơn vị"
            allowClear
          >
            {Donvi}
          </Select>
        </Form.Item>
        <Form.Item
          name="MANGACH"
          label="Ngạch"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Chọn ngạch nhân viên"
            allowClear
          >
            {NgachNV}
          </Select>
      </Form.Item>
      
      <Form.Item {...tailLayout}>
        <Button className={style.button} type="primary"  htmlType="submit">
          Lưu
        </Button>
        <Button className={style.button} htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button type="link" htmlType="button" onClick={backToList}>
          Trở về danh mục nhân viên
        </Button>
      </Form.Item>
    </Form>
    <ToastContainer />
  </>
  )
}

export default EmployeesCreate;