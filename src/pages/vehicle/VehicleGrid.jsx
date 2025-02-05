import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Dropdown from "@/components/ui/Dropdown";
// import menu form headless ui
import { Menu } from "@headlessui/react";
import Icon from "@/components/ui/Icon";
import ProgressBar from "@/components/ui/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const VehicleGrid = ({ vehicle }) => {
  const {
    ownerId,
    vehicleType,
    plateNumber,
    color,
    model,
    capacity,
    isAvailable,
    createdAt,
  } = vehicle;
  const dispatch = useDispatch();

  const [totaldays, setTotaldays] = useState(0);

  const navigate = useNavigate();
  const handleClick = (user) => {
    navigate(`/user/${user._id}`);
  };

  return (
    <Card>
      {/* header */}
      <header className="flex justify-between items-end">
        <div className="flex space-x-4 items-center rtl:space-x-reverse">
          <div className="flex-none">
            <div className="h-10 w-10 rounded-md text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal capitalize">
              {ownerId?.username?.charAt(0) + ownerId?.username?.charAt(1)}
            </div>
          </div>
          <div className="font-medium text-base leading-6">
            <div className="dark:text-slate-200 text-slate-900 max-w-[160px] truncate">
              {ownerId?.username}
            </div>
          </div>
        </div>
        <div>
          <Dropdown
            classMenuItems=" w-[130px]"
            label={
              <span className="text-lg inline-flex flex-col items-center justify-center h-8 w-8 rounded-full bg-gray-500-f7 dark:bg-slate-900 dark:text-slate-400">
                <Icon icon="heroicons-outline:dots-vertical" />
              </span>
            }
          >
            <div>
              <Menu.Item
              // onClick={() => handleClick(user)}
              >
                <div
                  className="hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-70 hover:text-white
                   w-full border-b border-b-gray-500 border-opacity-10   px-4 py-2 text-sm dark:text-slate-300  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center
                     capitalize rtl:space-x-reverse"
                >
                  <span className="text-base">
                    <Icon icon="heroicons:eye" />
                  </span>
                  <span>View</span>
                </div>
              </Menu.Item>
              <Menu.Item
              // onClick={() => dispatch(updateProject(user))}
              >
                <div
                  className="hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-70 hover:text-white
                   w-full border-b border-b-gray-500 border-opacity-10   px-4 py-2 text-sm dark:text-slate-300  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center
                     capitalize rtl:space-x-reverse"
                >
                  <span className="text-base">
                    <Icon icon="heroicons-outline:pencil-alt" />
                  </span>
                  <span>Edit</span>
                </div>
              </Menu.Item>
              <Menu.Item
              // onClick={() => dispatch(removeProject(user.id))}
              >
                <div
                  className="hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-70 hover:text-white
                   w-full border-b border-b-gray-500 border-opacity-10   px-4 py-2 text-sm dark:text-slate-300  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center
                     capitalize rtl:space-x-reverse"
                >
                  <span className="text-base">
                    <Icon icon="heroicons-outline:trash" />
                  </span>
                  <span>Delete</span>
                </div>
              </Menu.Item>
            </div>
          </Dropdown>
        </div>
      </header>

      {/* assignee */}
      <div className="flex gap-3 w-full flex-wrap space-x-4 rtl:space-x-reverse ">
        <div>
          <span className="block date-label">vehicle</span>
          <span className="block date-text">{vehicleType}</span>
        </div>
        <div>
          <span className="block date-label">color</span>
          <span className="block date-text">{color}</span>
        </div>
        <div>
          <span className="block date-label">model</span>
          <span className="block date-text">{model}</span>
        </div>
        <div>
          <span className="block date-label">plateNumber</span>
          <span className="block date-text">{plateNumber}</span>
        </div>
        <div>
          <span className="block date-label">capacity</span>
          <span className="block date-text">{capacity}</span>
        </div>
      </div>

      {/* assignee and total date */}
      <div className="grid grid-cols-2 gap-4 mt-6">{/* assignee */}</div>
    </Card>
  );
};

export default VehicleGrid;
