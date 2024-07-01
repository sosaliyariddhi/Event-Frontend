import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { generateDate } from "../../../../helper/helperFun";

const TableHeadRow = [
  "Sr.",
  "Name",
  "Date",
  "Organizer",
  "attendee",
  "Created On",
  "Action",
];

export default function EventTable({ data, deleteHandler, editHandler }) {
  return (
    <>
      {data?.length > 0 ? (
        <div className="overflow-x-auto border-2 rounded-lg">
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
              {data?.map?.((event, i) => {
                return (
                  <TableRow
                    key={i}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {i + 1}
                    </TableCell>

                    <TableCell>{event?.name}</TableCell>
                    <TableCell>{generateDate(event?.date)}</TableCell>
                    <TableCell>{event?.organizer?.name}</TableCell>
                    <TableCell>{event?.attendee}</TableCell>
                    <TableCell>{generateDate(event?.createdAt)}</TableCell>
                    <TableCell>
                      <div className="flex gap-3 [&_p]:underline [&_p]:cursor-pointer">
                        <p
                          onClick={() => editHandler(event)}
                          className="text-blue-400 hover:text-blue-700"
                        >
                          Edit
                        </p>
                        <p
                          onClick={() => deleteHandler(event?._id)}
                          className="text-red-400 hover:text-red-700"
                        >
                          delete
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex justify-center">
          <h1>Data is not available</h1>
        </div>
      )}
    </>
  );
}
