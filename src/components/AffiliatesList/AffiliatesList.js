import React from "react";
import "./AffiliatesList.scss";
import AffiliatesData from "./AffiliatesData";

const AffiliatesList = () => {
  return (
    <>
      <div className="list-container">
        <div className="row g-0 justify-content-between mb-3">
          <div className="col">
            <h2 className="custom-heading">Affiliates List</h2>
          </div>
          <div className="col-auto">
            <ul className="nav">
              
              <li className="nav-item">
                <div className="d-grid">
                  <button className="btn btn-secondary">
                    Collaboration Request
                  </button>
                </div>
              </li>

              <li className="nav-item ps-3">
                <div className="input-group search-group">
                  <button className="btn btn-outline-secondary" type="submit">
                    <i className="fas fa-search" />
                  </button>
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search affiliate"
                    aria-label="Search"
                  />
                </div>
              </li>

              <li className="nav-item">
                <a className="navlink" href="/">
                  <i className="fas fa-sort-amount-up" />
                  Sort
                </a>
              </li>
              <li className="nav-item">
                <a className="navlink" href="/">
                  <i className="fas fa-filter" />
                  Filter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col" />
              <th scope="col">Affiliate Name</th>
              <th scope="col">Industry</th>
              <th scope="col">Location</th>
              <th scope="col">Skills</th>
              {/* <th scope="col">Status</th> */}
              {/* <th scope="col" /> */}
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            <AffiliatesData />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AffiliatesList;
