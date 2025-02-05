import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Dropdown from "@/components/ui/Dropdown";
// import menu form headless ui
import { Menu } from "@headlessui/react";
import Icon from "@/components/ui/Icon";
import ProgressBar from "@/components/ui/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserGrid = ({ user }) => {
  const { username, fullname,  } =
    user;
  const dispatch = useDispatch();

  const [totaldays, setTotaldays] = useState(0);

 

  const navigate = useNavigate();
  // handleClick to view project single page
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
              {username.charAt(0) + username.charAt(1)}
            </div>
          </div>
          <div className="font-medium text-base leading-6">
            <div className="dark:text-slate-200 text-slate-900 max-w-[160px] truncate">
              {fullname?.firstname + " " + fullname?.lastname}
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
              <Menu.Item onClick={() => handleClick(user)}>
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
      {/* description */}
      <div className="text-slate-600 dark:text-slate-400 text-sm pt-4 pb-8">
        {/* {des} */}
      </div>
      {/* assignee */}
      <div className="flex space-x-4 rtl:space-x-reverse">
        {/* start date */}
        {/* <div>
          <span className="block date-label">Start date</span>
          <span className="block date-text">{startDate}</span>
        </div> */}
        {/* end date */}
        {/* <div>
          <span className="block date-label">Start date</span>
          <span className="block date-text">{endDate}</span>
        </div> */}
      </div>
      {/* progress bar */}
      {/* <div className="ltr:text-right rtl:text-left text-xs text-slate-600 dark:text-slate-300 mb-1 font-medium">
        {progress}%
      </div> */}
      <ProgressBar value={20} className="bg-primary-500" />
      {/* assignee and total date */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {/* assignee */}
        
        {/* total date */}
        <div className="ltr:text-right rtl:text-left">
          <span className="inline-flex items-center space-x-1 bg-danger-500 bg-opacity-[0.16] text-danger-500 text-xs font-normal px-2 py-1 rounded-full rtl:space-x-reverse">
            <span>
              {" "}
              <Icon icon="heroicons-outline:clock" />
            </span>
            <span>{totaldays}</span>
            <span>days left</span>
          </span>
        </div>
      </div>
    </Card>
  );
};

export default UserGrid;
