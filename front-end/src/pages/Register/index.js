import React from 'react';
import { Button, Form, Input, Radio, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom'; 
import OrgHospital from './orgHospital';
import { RegisterUser } from '../../apicalls/users';
import { useDispatch } from 'react-redux';
import { SetLoading } from '../../redux/loaderSlice';
import { getAntdInputValidation } from '../../utils/helpers';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [type, setType] = React.useState('donar');

  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      const response = await RegisterUser({
        ...values,
        userType: type,
      });
      dispatch(SetLoading(false));
      if (response.success) {
        message.success(response.message);
        navigate("/login"); 
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  return (
    <div className='flex h-screen items-center justify-center bg-primary'>
      <Form layout='vertical' className='bg-white rounded shadow grid grid-cols-2 p-5 gap-3 w-1/2' onFinish={onFinish}>
        <h1 className='col-span-2 uppercase text-2xl'>
          <span className='text-Primary'>
            {type.toUpperCase()} - Registration
          </span>
          <hr />
        </h1>

        <Radio.Group onChange={(e) => setType(e.target.value)} value={type} className='col-span-2'>
          <Radio value="donar">Donar</Radio>
          <Radio value="hospital">Hospital</Radio>
          <Radio value="organization">Organization</Radio>
        </Radio.Group>

        {type === 'donar' && (
          <>
            <Form.Item label="Name" name="name" rules={getAntdInputValidation()}>
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={getAntdInputValidation()}>
              <Input />
            </Form.Item>

            <Form.Item label="Phone" name="phone" rules={getAntdInputValidation()}>
              <Input />
            </Form.Item>

            <Form.Item label="password" name="password" rules={getAntdInputValidation()}>
              <Input type='password' />
            </Form.Item>
          </>
        )}

        {type !== "donar" && (type === "hospital" || type === "organization") && (
          <OrgHospital type={type} />
        )}
        <Button type='primary' block className='col-span-2' htmlType='submit'> Register</Button>
        <Link to="/login" className='col-span-2 text-center underline'>
          Already have an account? Login
        </Link>
      </Form>
    </div>
  )
}

export default Register;
