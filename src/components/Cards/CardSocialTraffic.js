import React from "react";

// components

function CardSocialTraffic() {
  const visits = [
    {
      referal: "Facebook",
      visitor: "1,480",
      traffic: {
        percentage: "60%",
        color: "red"
      }
    },
    {
      referal: "LinkedIn",
      visitor: "5,480",
      traffic: {
        percentage: "70%",
        color: "emerald"
      }
    },
    {
      referal: "Google",
      visitor: "4,807",
      traffic: {
        percentage: "80%",
        color: "purple"
      }
    },
    {
      referal: "Instagram",
      visitor: "3,678",
      traffic: {
        percentage: "75%",
        color: "lightBlue"
      }
    },
    {
      referal: "twitter",
      visitor: "2,645",
      traffic: {
        percentage: "35%",
        color: "orange"
      }
    },
  ]

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Social traffic
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                See all
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light">
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Referral
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Visitors
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
              </tr>
            </thead>
            <tbody>
              {
                visits.map((visit, key) => (
                  <tr key={`traffic-${key}`}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {visit.referal}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {visit.visitor}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex items-center">
                        <span className="mr-2">{visit.traffic.percentage}</span>
                        <div className="relative w-full">
                          <div className={`overflow-hidden h-2 text-xs flex rounded bg-${visit.traffic.color}-200`}>
                            <div
                              style={{ width: visit.traffic.percentage }}
                              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${visit.traffic.color}-500`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CardSocialTraffic;