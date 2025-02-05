import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";
import GridLoading from "@/components/skeleton/Grid";
import TableLoading from "@/components/skeleton/Table";
import { ToastContainer } from "react-toastify";

import {
  getAllVehicles,
  toggleAddModal,
  getVehicleDetailsById,
} from "@/store/vehicle/vehicle.reducer";
import AddVehicle from "./AddVehicle";
import EditVehicle from "./EditVehicle";
import VehicleList from "./VehicleList";
import VehicleGrid from "./VehicleGrid";

const VehiclePostPage = ({ id }) => {
  const [filler, setfiller] = useState("grid");
  const { width, breakpoints } = useWidth();
  const [isLoaded, setIsLoaded] = useState(false);

  const { vehicles } = useSelector((state) => state.vehicle);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(id);

    setIsLoaded(true);
    if (id !== undefined && id !== null) {
      dispatch(getVehicleDetailsById(id));
    } else {
      dispatch(getAllVehicles());
    }
    setTimeout(() => {
      setIsLoaded(false);
    }, 1500);
  }, [filler]);

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          Vehicle
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
          {id && (
            <Button
              icon="heroicons-outline:plus"
              text="Add vehicle"
              className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
              iconClass=" text-lg"
              onClick={() => dispatch(toggleAddModal(true))}
            />
          )}
        </div>
      </div>
      {isLoaded && filler === "grid" && (
        <GridLoading count={vehicles?.length} />
      )}
      {isLoaded && filler === "list" && (
        <TableLoading count={vehicles?.length} />
      )}

      {filler === "grid" && !isLoaded && (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {vehicles.map((vehicle, userIndex) => (
            <VehicleGrid vehicle={vehicle} key={userIndex} />
          ))}
        </div>
      )}
      {filler === "list" && !isLoaded && (
        <div>
          <VehicleList vehicles={vehicles} />
        </div>
      )}
      <AddVehicle ownerId={id} />
      <EditVehicle />
    </div>
  );
};

export default VehiclePostPage;
