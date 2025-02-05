import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";
import GridLoading from "@/components/skeleton/Grid";
import TableLoading from "@/components/skeleton/Table";
import { ToastContainer } from "react-toastify";
import { getAllRide, toggleAddModal } from "@/store/ride/ride.reducer";
import AddRide from "./AddRide";
import EditRide from "./EditRide";
import RideList from "./RideList";
import RideGrid from "./RideGrid";
import AssignRide from "./AssignRide";

const RidePostPage = ({ userId }) => {
  const [filler, setfiller] = useState("grid");
  const { width, breakpoints } = useWidth();
  const [isLoaded, setIsLoaded] = useState(false);

  const { rides } = useSelector((state) => state.ride);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoaded(true);
    dispatch(getAllRide());
    setTimeout(() => {
      setIsLoaded(false);
    }, 1500);
  }, [filler]);

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          Rides
        </h4>
        <div
          className={`${
            width < breakpoints.md ? "space-x-rb" : ""
          } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
        >
          <Button
            icon="heroicons:list-bullet"
            text="List view"
            disabled={isLoaded}
            className={`${
              filler === "list"
                ? "bg-slate-900 dark:bg-slate-700  text-white"
                : " bg-white dark:bg-slate-800 dark:text-slate-300"
            }   h-min text-sm font-normal`}
            iconClass=" text-lg"
            onClick={() => setfiller("list")}
          />
          <Button
            icon="heroicons-outline:view-grid"
            text="Grid view"
            disabled={isLoaded}
            className={`${
              filler === "grid"
                ? "bg-slate-900 dark:bg-slate-700 text-white"
                : " bg-white dark:bg-slate-800 dark:text-slate-300"
            }   h-min text-sm font-normal`}
            iconClass=" text-lg"
            onClick={() => setfiller("grid")}
          />

          {userId && (
            <Button
              icon="heroicons-outline:plus"
              text="Add Ride"
              className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
              iconClass=" text-lg"
              onClick={() => dispatch(toggleAddModal(true))}
            />
          )}
        </div>
      </div>
      {isLoaded && filler === "grid" && <GridLoading count={rides?.length} />}
      {isLoaded && filler === "list" && <TableLoading count={rides?.length} />}
      {filler === "grid" && !isLoaded && (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {rides.map((ride, index) => (
            <RideGrid ride={ride} key={index} />
          ))}
        </div>
      )}
      {filler === "list" && !isLoaded && (
        <div>
          <RideList rides={rides} />
        </div>
      )}
      <AddRide userId={userId} />
      <EditRide />
      <AssignRide/>
    </div>
  );
};

export default RidePostPage;
