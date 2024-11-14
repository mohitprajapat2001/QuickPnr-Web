/**Home page Component to Provide React-App Introduction */
import Context from "./context/Contexts";
import { useContext } from "react";
import PnrDetail from "./apps/pnr/PnrDetail";
function Home() {
  /**Home Page with DaisyUI */
  const { fetchPnrDetails } = useContext(Context.PnrContext);
  const handleSubmit = (event) => {
    /**Handle PNR Form Submit */
    event.preventDefault();
    let pnr = event.target.pnr.value;
    fetchPnrDetails(pnr);
  };
  return (
    <>
      <div className="min-h-screen pt-5">
        <div className="container mx-auto flex w-full flex-col justify-center items-center text-center">
          <div className="w-10/12">
            <h1 className="text-5xl font-bold">PNR Enquiry</h1>
            <div className="py-6">
              <div className="mb-5">
                Enter the PNR for your booking below to get the current status.
                <form method="POST" className="mt-5" onSubmit={handleSubmit}>
                  <label className="form-control w-full">
                    <input
                      type="text"
                      placeholder="Enter Your 10 digits PNR Number"
                      name="pnr"
                      defaultValue="8725278573"
                      className="input input-bordered w-full"
                    />
                  </label>
                  <button className="mt-5 btn btn-primary">Get Started</button>
                </form>
              </div>
              <PnrDetail />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
