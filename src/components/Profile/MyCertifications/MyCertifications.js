import React, { useState, useEffect } from "react";
import HttpService from "../../../shared/http.service";
import CertificationModal from "./CertificationModal";
import PlusCircle from "../../../img/plus-circle.png";
import { format } from "date-fns";

const Bio = (props) => {
  const [certification, setcertification] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [certificationId, setCertificationId] = useState(0);

  useEffect(() => {
    get();
  }, [openModel]);

  //getting data in table
  const get = async () => {
    await HttpService.get("affiliate-certification")
      .then((res) => {
        if (res) {
          setcertification(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //open create modal
  const onAdd = () => {
    setOpenModel(true);
  };

  //open update modal
  const onEdit = ( id ) => {
    setCertificationId(id);
    setOpenModel(true);
  };

  return (
    <>
      <div className="card custom-card">
        <div className="card-header d-flex justify-content-between mb-3">
          <h5 className="card-title align-self-center">{props.heading5}</h5>
          <div className="header-button align-self-center">
            <label>
              {props.button}
              <button
                type="button"
                className="btn p-1 ms-1"
                data-bs-toggle="modal"
                data-bs-target="#CertificateModal"
              >
                <img
                  src={PlusCircle}
                  alt="PlusCircle"
                  onClick={onAdd}
                />
              </button>
            </label>
          </div>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Provider</th>
                  <th scope="col">Issue Date</th>
                  <th scope="col"> Expiry Date</th>
                  <th scope="col"> Certification URL</th>
                  <th scope="col" colSpan="2">
                    {" "}
                    Team Memebr
                  </th>
                </tr>
              </thead>
              <tbody>
                {certification.map((result) => {
                  return (
                    <tr>
                      <th scope="row">{result.Title}</th>
                      <td>{result.Provider}</td>
                      <td>
                        {format(new Date(result.IssueDate), "yyyy-MM-dd")}
                      </td>
                      <td>
                        {format(new Date(result.DateCompleted), "yyyy-MM-dd")}
                      </td>
                      <td>{result.CertificationUrl}</td>
                      <td>
                        {result.TeamMembers &&
                          result.TeamMembers.map((member, index) => {
                            if (index === result.TeamMembers.length - 1) {
                              return member.Name;
                            }
                            return member.Name + ",";
                          })}
                      </td>
                      <td>
                        <div className="dropdown d-inline-block">
                          <button
                            className="btn"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="fas fa-ellipsis-v"></i>
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            {/* <li>
                              <button
                                type="button"
                                className="dropdown-item"
                                href="#"
                                onClick={() =>
                                  deleteTeamMember(
                                    result.Title,
                                    result.Provider,
                                    result.DateCompleted,
                                    result.AffiliateCertificationId,
                                    result.TeamMembers,
                                    result.IssueDate,
                                    result.CertificationUrl
                                  )
                                }
                              >
                                Delete Certification
                              </button>
                            </li> */}
                            <li>
                              <button
                                className="dropdown-item"
                                href="#"
                                onClick={() =>
                                  onEdit(result.AffiliateCertificationId) //form parent-id / primary-key
                                }
                              >
                                Update Changes
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CertificationModal
        certificationId={certificationId}
        show={openModel}
        onHide={() => setOpenModel(false)}
      />
    </>
  );
};

export default Bio;
