import React from 'react'
import { getAllHospitalsOfAnOrganization } from '../../../apicalls/users';
import { SetLoading } from '../../../redux/loaderSlice';
import { useDispatch } from 'react-redux';
import { Table, message } from 'antd';
import { getDateFormat } from '../../../utils/helpers';

function Hospitals() {
    const [data, setData] = React.useState([]);
    const dispatch = useDispatch();
    const getData = async () => {
        try {
            dispatch(SetLoading(true));
            const response = await getAllHospitalsOfAnOrganization()
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
        title:"Hospital Name",
        dataIndex:"hospitalName",
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
        title:"Address",
        dataIndex:"address",
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

export default Hospitals