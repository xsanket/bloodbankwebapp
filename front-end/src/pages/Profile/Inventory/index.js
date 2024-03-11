import { Button, Table, message } from 'antd';
import React from 'react'
import InventoryForm from './inventoryForm';
import { useDispatch } from 'react-redux';
import { SetLoading } from '../../../redux/loaderSlice';
import { GetInventory } from '../../../apicalls/inventory';
import { getDateFormat } from '../../../utils/helpers';

function Inventory() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const dispatch = useDispatch();

  // inventory table
  const colomns = [
    {
      title: "Inventory Type",
      dataIndex: "inventoryType",
      render: (text) => text.toUpperCase()
    },
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
      render: (text) => text.toUpperCase()
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (text) => text + " ML"
    },
    {
      title: "Reference",
      dataIndex: "reference",
      render: (text, record) => {
        if (record.inventoryType === "in") {
          return record.donar.name;
        } else {
          return record.hospital.hospitalName;
        }
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text),
    }
  ]

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetInventory();
      dispatch(SetLoading(false));
      if (response.success) {
        setData(response.data);
      }
      else {
        throw new Error(Error.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));

    }
  };

  React.useEffect(() => {
    getData();
  }, [])



  return (
    <div>
      <div className='flex justify-end'>
        <Button type='primary' onClick={() => setOpen(true)}>
          Add Inventory
        </Button>
      </div>

      <Table columns={colomns} dataSource={data}  className='mt-3'/>





      {open && <InventoryForm open={open} setOpen={setOpen}
      reloadData={getData}
       />}
    </div>
  )
}

export default Inventory