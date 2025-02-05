import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";
import GridLoading from "@/components/skeleton/Grid";
import TableLoading from "@/components/skeleton/Table";
import { ToastContainer } from "react-toastify";

import { toggleAddModal, getAllCaptains } from "@/store/user/user.reducer";
import AddCaptain from "./AddCaptain";
import EditCaptain from "./EditCaptain";
import CaptainList from "./CaptainList";
import CaptainGrid from "./CaptainGrid";

const CaptainPostPage = () => {
  const [filler, setfiller] = useState("list");
  const { width, breakpoints } = useWidth();
  const [isLoaded, setIsLoaded] = useState(false);

  const { captains } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoaded(true);
    dispatch(getAllCaptains())
    setTimeout(() => {
      setIsLoaded(false);

    }, 1500);
  }, [filler]);


  

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          Captains
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
          <Button
            icon="heroicons-outline:filter"
            text="On going"
            className="bg-white dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-900 hover:text-white btn-md  h-min text-sm font-normal"
            iconClass=" text-lg"
          />
          <Button
            icon="heroicons-outline:plus"
            text="Add Captain"
            className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
            iconClass=" text-lg"
            onClick={() => dispatch(toggleAddModal(true))}
          />
        </div>
      </div>
      {isLoaded && filler === "grid" && <GridLoading count={captains?.length} />}
      {isLoaded && filler === "list" && <TableLoading count={captains?.length} />}

      {filler === "grid" && !isLoaded && (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {captains.map((user, userIndex) => (
            <CaptainGrid user={user} key={userIndex} />
          ))}
        </div>
      )}
      {filler === "list" && !isLoaded && (
        <div>
          <CaptainList captains={captains} />
        </div>
      )}
      <AddCaptain />
      <EditCaptain />
    </div>
  );
};

export default CaptainPostPage;
