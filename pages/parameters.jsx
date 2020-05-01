import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { Table } from "react-bootstrap";
import { locationOptions, diseaseOptions, monthOptions } from "./index.jsx";

const weatherParams = [
  { id: 1, name: "Humidity" },
  { id: 2, name: "Max Temperature" },
  { id: 3, name: "Mean Temperature" },
  { id: 4, name: "Min Temperature" },
  { id: 5, name: "Min Wind Speed" },
  { id: 6, name: "Pressure" },
  { id: 7, name: "Rain" },
  { id: 8, name: "Sun" },
  { id: 9, name: "Wind Gust" }
];
export default function parameters() {
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <h6>Months</h6>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>District</th>
              </tr>
            </thead>
            <tbody>
              {monthOptions.map((val, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{val.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-3">
          <h6>Weather</h6>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Parameter</th>
              </tr>
            </thead>
            <tbody>
              {weatherParams.map((val, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{val.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-3">
          <h6>Districts</h6>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>District</th>
              </tr>
            </thead>
            <tbody>
              {locationOptions.map((val, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{val.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-3">
          <h6>Diseases</h6>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Disease</th>
              </tr>
            </thead>
            <tbody>
              {diseaseOptions.map((val, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{val.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <style jsx>{`
          table td,
          table th {
            font-size: 0.8rem;
            padding: 5px 5px;
            margin: 0px 0px;
          }
        `}</style>
      </div>
    </Layout>
  );
}
