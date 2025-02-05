import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Dropdown from "@/components/ui/Dropdown";
// import menu form headless ui
import { Menu } from "@headlessui/react";
import Icon from "@/components/ui/Icon";
import ProgressBar from "@/components/ui/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateRide, assignRide } from "@/store/ride/ride.reducer";

const RideGrid = ({ ride }) => {
  const { fare, dropoffLocation, status, pickupLocation } = ride;
  const dispatch = useDispatch();

  const [totaldays, setTotaldays] = useState(0);

  const navigate = useNavigate();
  // handleClick to view project single page
  // const handleClick = (ride) => {
  //   navigate(`/user/${user._id}`);
  // };

  return (
    <Card>
      {/* header */}
      <header className="flex justify-between items-end mb-3">
        <div className="flex space-x-4 items-center rtl:space-x-reverse">
          {/* <div className="flex-none">
            <div className="h-10 w-10 rounded-md text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal capitalize">
              {dropoffLocation}
            </div>
          </div> */}
          <div className="font-medium text-base leading-6">
            <span className="block date-label">Pick Up</span>
            <div className="dark:text-slate-200 text-slate-900 max-w-[160px] truncate">
              {pickupLocation}
            </div>
            <span className="block date-label">DropOff</span>

            <div className="dark:text-slate-200 text-slate-900 max-w-[160px] truncate">
              {dropoffLocation}
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
              {ride?.status == "pending" && (
                <div>
                  <Menu.Item onClick={() => dispatch(assignRide(ride))}>
                    <div
                      className="hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-70 hover:text-white
                  w-full border-b border-b-gray-500 border-opacity-10   px-4 py-2 text-sm dark:text-slate-300  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center
                  capitalize rtl:space-x-reverse"
                    >
                      <span className="text-base">
                        <Icon icon="heroicons:eye" />
                      </span>
                      <span>Assign</span>
                    </div>
                  </Menu.Item>
                </div>
              )}

              <Menu.Item onClick={() => dispatch(updateRide(ride))}>
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

      <div className="flex space-x-4  rtl:space-x-reverse">
        <div>
          <span className="block date-label">FARE</span>
          <span className="block date-text">{fare}</span>
        </div>
        {/* <div>
          <span className="block date-label">DropOff</span>
          <span className="block date-text">{dropoffLocation}</span>
        </div> */}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {/* assignee */}

        {/* total date */}
        <div className="">
          <span className="block w-full">
            <span
              className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
                status === "completed" ? "text-success-500 bg-success-500" : ""
              } 
            ${status === "pending" ? "text-warning-500 bg-warning-500" : ""}
            ${status === "cancelled" ? "text-danger-500 bg-danger-500" : ""}
            ${status === "assigned" ? "text-primary-500 bg-primary-500" : ""}
            
             `}
            >
              {status}
            </span>
          </span>
        </div>
        <div className="">
          <span className="block w-full">
            <span
              className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
                status === "completed" ? "text-success-500 bg-success-500" : ""
              } 
            ${status === "pending" ? "text-warning-500 bg-warning-500" : ""}
            ${status === "cancelled" ? "text-danger-500 bg-danger-500" : ""}
                        ${
                          status === "assigned"
                            ? "text-primary-500 bg-primary-500"
                            : ""
                        }

             `}
            >
              {status}
            </span>
          </span>
        </div>
      </div>
    </Card>
  );
};

export default RideGrid;
