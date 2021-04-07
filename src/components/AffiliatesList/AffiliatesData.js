import React, { Component } from "react";
import HttpService from "../../shared/http.service";
import Star from "../../img/star.png";

class AffiliatesData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      results: [],
    };
  }
  async componentDidMount() {
   await HttpService.get("user/all-affiliates")
      .then((res) => {
        this.setState({
          results: res.data,
        });
      })
      .catch((err) => {
        this.setState({ error: err });
      });
  }

  render() {
    const { error, results } = this.state;
    if (error) return <div>Error : {error.message}</div>;

    return (
      <>
        {results.map((result) => {
          return (
            <tr key={result.UserId}>
              <td>
                <img src={Star} alt="star" />
              </td>
              <td>
                <span>{result.Name}</span>
              </td>
              <td>{result.CompanyName}</td>
              <td>{result.Address}</td>
              <td>{result.City}</td>
              {/* <td>Active</td> */}
              <td>
                <div className="d-grid">
                  <button className="btn btn-secondary">View</button>
                </div>
                </td>
                {/* <td>
                <div className=" d-grid dropdown d-inline-block">
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
                    <li>
                      <Link className="dropdown-item" href="#">
                        Resend Invite
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="#">
                        Deactivate Account
                      </Link>
                    </li>
                  </ul>
                </div>
              </td> */}
            </tr>
          );
        })}
      </>
    );
  }
}

export default AffiliatesData;
