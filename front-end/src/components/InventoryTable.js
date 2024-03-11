import React from 'react'
import { GetInventoryWithFilters } from '../apicalls/inventory';
import { useDispatch } from 'react-redux';
import { getDateFormat } from '../utils/helpers';
import { Table, message } from 'antd';
import { SetLoading } from '../redux/loaderSlice';


function InventoryTable({ filters, userType, limit }) {

  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const dispatch = useDispatch();

  // inventory table
  const columns = [
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
        if(userType === "organization"){
          return record.inventoryType === "in" ? record.donar?.name : record.hospital?.hospitalName
        }
        else{
          return record.organization.organizationName
        }

      }
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text),
    }
  ]


  // change columns/table for a hospital and Donar
  if (userType !== "organization") {
    // for removing column
    columns.splice(0, 1);
    // changing column name
    columns[2].title = "Organization Name";

    columns[3].title = userType ===  "hospital" ? "Taken Date" : "Donated Date";
  }






  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetInventoryWithFilters(filters, limit);
      if (response.success) {
        setData(response.data);
        dispatch(SetLoading(false));
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
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default InventoryTable