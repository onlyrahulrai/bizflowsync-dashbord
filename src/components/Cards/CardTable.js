import React from "react";
import Image from "../../assets/img"
import PropTypes from "prop-types";

// components

import TableDropdown from "components/Dropdowns/TableDropdown.js";

class CardTable extends React.Component {
  render(){
    const records = [
      {
        project: {
          image: Image.Bootstrap,
          name: "Argon Design System"
        },
        budget: "$2,500 USD",
        status: <span><i className="fas fa-circle text-orange-500 mr-2"></i>{" "} pending</span>,
        users: [
          Image.Team1,
          Image.Team2,
          Image.Team3,
          Image.Team4
        ],
        completion: {
          percent: "83%",
          color: "bg-orange-500"
        }
      },
      {
        project: {
          image: Image.Angular,
          name: "Angular Now UI Kit PRO"
        },
        budget: "$1,800 USD",
        status: <span><i className="fas fa-circle text-emerald-500 mr-2"></i>{" "} completed</span>,
        users: [
          Image.Team1,
          Image.Team2,
          Image.Team3,
          Image.Team4
        ],
        completion: {
          percent: "100%",
          color: "bg-emerald-500"
        }
      },
      {
        project: {
          image: Image.Sketch,
          name: "Black Dashboard Sketch"
        },
        budget: "$3,150 USD",
        status: <span><i className="fas fa-circle text-red-500 mr-2"></i>{" "} delayed</span>,
        users: [
          Image.Team1,
          Image.Team2,
          Image.Team3,
          Image.Team4
        ],
        completion: {
          percent: "73%",
          color: "bg-red-500"
        }
      },
      {
        project: {
          image: Image.React,
          name: "React Material Dashboard"
        },
        budget: "$4,400 USD",
        status: <span><i className="fas fa-circle text-teal-500 mr-2"></i> on schedule</span>,
        users: [
          Image.Team1,
          Image.Team2,
          Image.Team3,
          Image.Team4
        ],
        completion: {
          percent: "60%",
          color: "bg-teal-500"
        }
      },
      {
        project: {
          image: Image.Vue,
          name: "Vue Material Dashboard"
        },
        budget: "$2,200 USD",
        status: <span><i className="fas fa-circle text-lightblue-500 mr-2"></i>{" "}completed</span>,
        users: [
          Image.Team1,
          Image.Team2,
          Image.Team3,
          Image.Team4
        ],
        completion: {
          percent: "50%",
          color: "bg-lightBlue-600"
        }
      },
    ]
    return (
      <>
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
            (this.props.color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
          }
        >
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3
                  className={
                    "font-semibold text-lg " +
                    (this.props.color === "light" ? "text-blueGray-700" : "text-white")
                  }
                >
                  Card Tables
                </h3>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (this.props.color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Project
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (this.props.color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Budget
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (this.props.color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Status
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (this.props.color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Users
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (this.props.color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Completion
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (this.props.color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  ></th>
                </tr>
              </thead>
              <tbody>
                {
                  records.map((record, key) => (
                    <tr key={`table-${key}`}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                        <img
                          src={record.project.image}
                          className="h-12 w-12 bg-white rounded-full border"
                          alt="..."
                        ></img>{" "}
                        <span
                          className={
                            "ml-3 font-bold " +
                            +(this.props.color === "light" ? "text-blueGray-600" : "text-white")
                          }
                        >
                          {record.project.name}
                        </span>
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {record.budget}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {record.status}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex">
                          {
                            record.users.map((user, key) => (
                              <img
                                src={user}
                                alt="..."
                                className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
                                key={key}
                              ></img>
                            ))
                          }
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2">{record.completion.percent}</span>
                          <div className="relative w-full">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                              <div
                                style={{ width: record.completion.percent }}
                                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${record.completion.color}`}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <TableDropdown />
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
}

export default CardTable;

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
