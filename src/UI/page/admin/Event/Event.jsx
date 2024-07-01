import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import EventTable from "./EventTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventData } from "../../../../redux/event";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { deleteEvent } from "../../../api/service/event";

export default function Businesses() {
  let [allEvents, setAllEvents] = useState([]);
  let [refetch, setRefetch] = useState(true);

  const refresh = () => setRefetch(!refetch);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [{ token, user }] = useCookies(["token"]);
  useEffect(() => {
    dispatch(fetchEventData(token));
  }, [refetch]);

  const eventSlice = useSelector((store) => store.eventSlice);

  useEffect(() => {
    if (eventSlice.error) toast.error(error.message);
    else setAllEvents(eventSlice?.events);
  }, [eventSlice]);

  const deleteHandler = async (id) => {
    const { error } = await deleteEvent(id, token);
    if (error) toast.error(error.message);
    else {
      navigate("/event");
      refresh();
    }
  };
  const editHandler = async (editData) => {
    navigate("/event/create", { state: editData });
  };

  return (
    <div>
      {/*  -----------------------header sectsion start-------------------- */}
      <div className="sticky top-0 z-20 bg-white pb-5 border ">
        <div className="flex p-[24px]  justify-between">
          <div className="flex">
            <Button
              onClick={() => navigate("create")}
              className="focus:ring-0 text-white bg-[#001E58] font-[500] border-2 border-[#001E58] hover:!bg-white hover:!text-[#001E58]"
            >
              Add New
            </Button>
          </div>
        </div>
      </div>
      {/*  -----------------------table sectsion  start-------------------- */}
      <div className="m-[24px]">
        <EventTable
          data={allEvents}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
        />
      </div>
    </div>
  );
}
