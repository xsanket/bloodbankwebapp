import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllDonarsOfAnOrganization, getAllOrganizationsOfDonar, getAllOrganizationsOfHospitals } from '../../../apicalls/users';
import { SetLoading } from '../../../redux/loaderSlice';
import { Modal, Table, message } from 'antd';
import { getDateFormat } from '../../../utils/helpers';
import InventoryTable from '../../../components/InventoryTable';

function Organization({ userType }) {
    const [showHistoryModal, setShowHistoryModal] = React.useState(false);
    const {currentUser} = useSelector((state) => state.users);
    //const currentUser = useSelector((state) => state.users);

    const [selectedOrganization, setSelectedOrganization] = React.useState(null);
    const [data, setData] = React.useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(SetLoading(true));
            // const response = (await userType) === "donar" ? getAllOrganizationsOfDonar() : getAllOrganizationsOfHospitals();
            let response = null;
            if (userType === "donar") {
                response = await getAllOrganizationsOfDonar();
            } else {
                response = await getAllOrganizationsOfHospitals();
            }

            dispatch(SetLoading(false));
            if (response.success) {
                // console.log("hello bro");
                setData(response.data);
            }
            else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
            dispatch(SetLoading(false));

        }
    };
    const columns = [
        {
            title: "Organization Name",
            dataIndex: "organizationName",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
        },
        {
            title: "Address",
            dataIndex: "address",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            render: (text) => getDateFormat(text)
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <span
                    className='underline text-md cursor-pointer'
                    onClick={() => {
                        setSelectedOrganization(record);
                        setShowHistoryModal(true);
                    }}
                > History
                </span>
            )
        },

    ];

    React.useEffect(() => {
        getData();
    }, []);



    return (
        <div>
            <Table columns={columns} dataSource={data} />
            {showHistoryModal && (
                <Modal
                    title={
                       `${
                        userType === "donar" ? "Donations History" : "Consumptions History"
                       } In ${selectedOrganization.organizationName} `
                    }
                    centered
                    open={showHistoryModal}
                    onClose={() => setShowHistoryModal(false)}
                    onCancel={() => setShowHistoryModal(false)}
                    onOk={() => setShowHistoryModal(false)}
                    width={1000}
                >
                    <InventoryTable
                        filters={{
                            organization: selectedOrganization._id,
                            [userType]: currentUser._id,
                        }}
                    />
                </Modal>
            )}

        </div>
    )
}

export default Organization