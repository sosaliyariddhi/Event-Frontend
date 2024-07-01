import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useApi } from "../../../api/useAPI";
import { useCookies } from "react-cookie";
import { getAllOrganizer } from "../../../api/service/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
const TableHeadRow = ["Sr.", "Name", "Email"];

export default function Organizers() {
  const [organizer, setOrganizer] = useState([]);

  const [{ token }] = useCookies(["token"]);
  useEffect(() => {
    (async function fetchdata() {
      const { data, error } = await getAllOrganizer(token);
      if (error) toast.error(error.message);
      else setOrganizer(data?.data);
    })();
  }, []);

  return (
    <>
      {organizer.length > 0 ? (
        <>
          <div className="flex border-b-2 justify-center mt-5">
            <h1 className="text-3xl mb-5">ORGANIZERS</h1>
          </div>
          <div className="overflow-x-auto border-2 m-10 rounded-lg">
            <Table>
              <TableHead>
                {TableHeadRow?.map((e, i) => {
                  return (
                    <TableHeadCell key={i} className="bg-[#dbe3fda3]">
                      {e}
                    </TableHeadCell>
                  );
                })}
              </TableHead>
              <TableBody className="divide-y">
                {organizer?.map?.((bussiness, i) => {
                  return (
                    <TableRow
                      key={i}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {i + 1}
                      </TableCell>
                      <TableCell>{bussiness?.name}</TableCell>
                      <TableCell>+{bussiness?.email}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <div className="flex justify-center">
          <h1>Data is not available</h1>
        </div>
      )}
    </>
  );
}
