import React from 'react'
import { useDispatch } from 'react-redux';
import { getAllDonarsOfAnOrganization } from "../../../apicalls/users"
import { SetLoading } from '../../../redux/loaderSlice';
import { Table, message } from 'antd';
import { getDateFormat } from '../../../utils/helpers';

function Donars() {
    const [data, setData] = React.useState([]);
    const dispatch = useDispatch();
    const getData = async () => {
        try {
            dispatch(SetLoading(true));
            const response = await getAllDonarsOfAnOrganization()
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
const columns =[
    {
        title:"Name",
        dataIndex:"name",
    },
    {
        title:"Email",
        dataIndex:"email",
    },
    {
        title:"Phone",
        dataIndex:"phone",
    },
    {
        title:"Created At",
        dataIndex:"createdAt",
        render: (text)=> getDateFormat(text)
    },
    
];





    React.useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <Table columns={columns} dataSource={data}/>
        </div>
    )
}

export default Donars