import { Input, Form } from 'antd';
import React from 'react';
import { getAntdInputValidation } from '../../utils/helpers';

function OrgHospital({type}) {
  return (
    <>
      <Form.Item
        label={type === 'hospital' ? 'hospitalName' : 'organizationName'}
        name={type === 'hospital' ? 'hospitalName' : 'organizationName'}
        rules={getAntdInputValidation()}
      >
        <Input />
      </Form.Item>

      <Form.Item name="owner" label="Owner" rules={getAntdInputValidation()}> 
        <Input />
      </Form.Item>

      <Form.Item label="Email" name ="email" rules={getAntdInputValidation()}>
        <Input />
      </Form.Item>

      <Form.Item label="Phone" name= "phone" rules={getAntdInputValidation()}>
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password"rules={getAntdInputValidation()}>
        <Input />
      </Form.Item>
      <Form.Item label="Website" name="website" rules={getAntdInputValidation()}>
        <Input />
      </Form.Item>
      <Form.Item label="Address" className='col-span-2' name="address" rules={getAntdInputValidation()}>
        <textarea/>
      </Form.Item>
    </>
  );
}

export default OrgHospital;
