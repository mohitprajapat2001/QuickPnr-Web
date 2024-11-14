/**Pnr Details Component */
import Context from "../../context/Contexts";
import { useContext } from "react";
function PnrDetail() {
  /**PNR Detail Daisy UI Component */
  const { pnrDetails, handlePnrUpdate, handlePnrDetailsMail } = useContext(
    Context.PnrContext
  );
  return (
    <>
      {pnrDetails && (
        <div>
          <div className="text-left text-xs italic mb-3 flex gap-5 justify-between">
            <button className="btn">
              Last Modified:
              <div className="badge badge-secondary">
                {new Date(pnrDetails.modified).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })}
              </div>
            </button>
            <div className="flex justify-end gap-5">
              <button className="btn" onClick={handlePnrUpdate}>
                Update Details
              </button>
              <button className="btn" onClick={handlePnrDetailsMail}>
                Mail Details
              </button>
            </div>
          </div>
          <div className="w-full rounded-lg shadow-md overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr className="capitalize">
                  <th>PNR Number</th>
                  <td>Train Number</td>
                  <td>Train Name</td>
                  <td>Reservation class</td>
                </tr>
              </thead>
              <tbody className="capitalize">
                <tr>
                  <th>{pnrDetails.pnr}</th>
                  <td>{pnrDetails.train_number}</td>
                  <td>{pnrDetails.train_name}</td>
                  <td>{pnrDetails.reserved_class}</td>
                </tr>
                <tr>
                  <th>Boarding Date</th>
                  <td>Reserved From</td>
                  <td>Reserved To</td>
                  <td>Boarding From</td>
                </tr>
                <tr>
                  <th>
                    {new Date(pnrDetails.boarding_date).toLocaleDateString()}
                  </th>
                  <td>{pnrDetails.reserved_from}</td>
                  <td>{pnrDetails.reserved_to}</td>
                  <td>
                    {pnrDetails.boarding_point || pnrDetails.reserved_from}
                  </td>
                </tr>
                <tr className="text-center">
                  <th colSpan={4}>Passengers Details</th>
                </tr>
                <tr>
                  <td className="text-center" colSpan={4}>
                    {pnrDetails.passengers_details.map((passenger, index) => (
                      <ul
                        key={index}
                        className="menu menu-horizontal mb-3 flex justify-between w-full bg-base-200 rounded px-3"
                      >
                        <li>Name: {passenger.name}</li>
                        <li>Booking: {passenger.booking_status}</li>
                        <li>Current: {passenger.current_status}</li>
                      </ul>
                    ))}
                  </td>
                </tr>
                <tr className="text-center">
                  <th colSpan={4}>Other Details</th>
                </tr>
                <tr>
                  <th>Fare: {pnrDetails.fare}</th>
                  <td>Remark: {pnrDetails.remark || "No Remarks Available"}</td>
                  <td>
                    Status: {pnrDetails.train_status || "No Status Available"}
                  </td>
                  <td>Charting: {pnrDetails.charting_status}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-left text-xs mt-3 italic">
            Note: This API uses scrapping of PNR status from the official
            website. Please cross check the data before using it.
          </p>
        </div>
      )}
    </>
  );
}

export default PnrDetail;
