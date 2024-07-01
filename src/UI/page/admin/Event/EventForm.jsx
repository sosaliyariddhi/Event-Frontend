import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getAllOrganizer } from "../../../api/service/user";
import { createEvent, updateEvent } from "../../../api/service/event";

const intialState = {
  name: "",
  attendee: "",
  date: "",
};

export default function EventForm() {
  const [event, setEvent] = useState(intialState);
  const [organizer, setOrganizer] = useState([]);

  const [{ token, user }] = useCookies(["token"]);

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      let data = {
        ...state,
        date: new Date(state.date).toISOString().split("T")[0],
      };

      reset(data);
    }
    (async function fetchdata() {
      if (user.userType === "admin") {
        const { data, error } = await getAllOrganizer(token);
        if (error) toast.error(error.message);
        else
          setOrganizer(
            data?.data.map((e) => {
              return { label: e.name, value: e };
            })
          );
      }
    })();
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: intialState,
  });

  const submitHandler = async (inputData) => {
    if (user.userType !== "admin") inputData.organizer = user._id;

    if (state) {
      const { data, error } = await updateEvent(inputData, token);
      if (error) toast.error(error.message);
      else navigate("/event");
    } else {
      const { data, error } = await createEvent(token, inputData);
      if (error) toast.error(error.message);
      else navigate("/event");
    }
  };

  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-3xl my-5">
        {state ? "UPDATE YOUR EVENT" : "REGISTER YOUR EVENT"}
      </h1>

      <div className="w-1/2 px-7 my-4">
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mt-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Event Name <span className="text-red-500">*</span>
            </label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <>
                  <input
                    value={event.name}
                    {...field}
                    type="text"
                    id="name"
                    placeholder="Enter your event name"
                    className="mt-1 p-2 focus:!ring-gray-600  focus:!border-gray-600  w-full border rounded-md"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date <span className="text-red-500">*</span>
            </label>

            <Controller
              name="date"
              control={control}
              rules={{ required: "Date is required" }}
              render={({ field }) => (
                <>
                  <input
                    value={event.date}
                    {...field}
                    type="date"
                    id="date"
                    placeholder="Enter date of event"
                    className="mt-1 p-2 focus:!ring-gray-600  focus:!border-gray-600  w-full border rounded-md"
                  />
                  {errors.date && (
                    <span className="text-red-500 text-sm">
                      {errors.date.message}
                    </span>
                  )}
                </>
              )}
            />
            {/* </div> */}
          </div>
          <div className="mt-4">
            <label
              htmlFor="attendee"
              className="block text-sm font-medium text-gray-700"
            >
              Attendee <span className="text-red-500">*</span>
            </label>
            <Controller
              name="attendee"
              control={control}
              rules={{ required: "Attendee name is required" }}
              render={({ field }) => (
                <>
                  <input
                    value={event.attendee}
                    {...field}
                    type="text"
                    id="attendee"
                    placeholder="Enter Attendee name"
                    className="mt-1 p-2 focus:!ring-gray-600  focus:!border-gray-600  w-full border rounded-md"
                  />
                  {errors.attendee && (
                    <span className="text-red-500 text-sm">
                      {errors.attendee.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>

          <div className="mb-2">
            <div className="mb-2 block">
              <label className="!font-semibold">Organizer</label>
            </div>
            <Controller
              name="organizer"
              control={control}
              render={({ field }) => (
                <>
                  <Select
                    isDisabled={user.userType === "admin" ? false : true}
                    {...field}
                    className="border focus-within:border-none rounded-md border-gray-500 "
                    placeholder="Select organizer"
                    options={organizer}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption?.value?._id)
                    }
                    value={
                      user.userType === "admin"
                        ? organizer.find((e) => {
                            return e.value.name === field._id;
                          })
                        : { label: user.name, value: user._id }
                    }
                  />
                </>
              )}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 text-sm transition-colors duration-500 rounded-md border-gray-600 bg-gray-400 text-gray-600 hover:text-white hover:bg-gray-600 border-2 py-2 px-12 me-3"
          >
            {state ? "Update Event" : "Add Event"}
          </button>
        </form>
      </div>
    </div>
  );
}
