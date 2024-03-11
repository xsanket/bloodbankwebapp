import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '../../redux/loaderSlice';
import { GetAllBloodGroupInventory } from '../../apicalls/dashboard';
import { message } from "antd";
import InventoryTable from '../../components/InventoryTable';
import { getLoggedInUserName } from '../../utils/helpers';


function Home() {
  const { currentUser } = useSelector((state) => state.users);

  const [bloodGroupData = [], setBloodGroupData] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllBloodGroupInventory();
      dispatch(SetLoading(false));
      if (response.success) {
        setBloodGroupData(response.data);
      }
      else {
        throw new Error(response.message);
      }


    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const colours = [
    "#2B3467",
    "#1A5F7A",
    "#B8621B",
    "#245953",
    "#2C3333",
    "#804674",
    "#A84448",
    "#635985",
  ];

  return (
    <div>

      {currentUser.userType === "organization" && (
        <>
          <span className='text-gray-700 font-semibold text-2xl'>
            Welcome {getLoggedInUserName(currentUser)}
          </span>
          <div className="grid grid-cols-4 gap-5 mb-5 mt-2">
            {bloodGroupData.map((bloodGroup, index) => {
              const color = colours[index];
              return (
                <div
                  className={`p-5 flex justify-between text-white rounded items-center`}
                  style={{ backgroundColor: color }}
                >
                  <h1 className="text-5xl uppercase">
                    {bloodGroup.bloodGroup}
                  </h1>

                  <div className="flex flex-col justify-between gap-2">
                    <div className="flex justify-between gap-5">
                      <span>Total In</span>
                      <span>{bloodGroup.totalIn} ML</span>
                    </div>
                    <div className="flex justify-between gap-5">
                      <span>Total Out</span>
                      <span>{bloodGroup.totalOut} ML</span>
                    </div>

                    <div className="flex justify-between 5 font-bold">
                      <span>Available</span>
                      <span>{bloodGroup.available} ML</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <span className="text-xl text-gray-700 font-semibold">
            Recent Inventory
          </span>
          <InventoryTable
            filters={{
              organization: currentUser._id,
            }}
            limit={5}
            userType={currentUser.userType}
          />
        </>
      )}

      {currentUser.userType === "donar" && (
        <div>
          <span className="text-xl text-gray-700 font-semibold">
            Your Recent Donations
          </span>
          <InventoryTable
            filters={{
              donar: currentUser._id,
            }}
            limit={5}
            userType={currentUser.userType}
          />
        </div>
      )}

      {currentUser.userType === "hospital" && (
        <div>
          <span className="text-xl text-gray-700 font-semibold">
            Your Recent Requests / Consumptions
          </span>
          <InventoryTable
            filters={{
              hospital: currentUser._id,
            }}
            limit={5}
            userType={currentUser.userType}
          />
        </div>
      )}
    </div>
  )
}

export default Home;
