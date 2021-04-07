import React, { useState, useEffect } from "react";
import profile_img from "../../../img/profile-image.png";
import HttpService from "../../../shared/http.service";
import { useForm } from "react-hook-form";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import countryList from "react-select-country-list";
import { useToasts } from "react-toast-notifications";
import { ErrorMessage } from "../../sharedError/error.messages";
//import { connect } from "react-redux";
import "./ProfileForm.scss";

import BeatLoader from "react-spinners/BeatLoader";

const ProfileForm = ({ data, skills, interests }) => {
  const { addToast } = useToasts();
  const [userDetail, setUser] = useState({});
  let [formData, setFormData] = useState({});
  const [isLoading, setLoading] = useState(false);
  // const [userInfo, setInfo] = useState();
  const [isEdit, setEdit] = useState(false);
  // const [fullUser, setFullUser] = useState();

  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();

  const [selectedInterests, setSelectedInterests] = useState();
  const [allInterests, setAllInterests] = useState([]);
  const [interestsArr, setInterestsArr] = useState([]);

  const [selectedSkills, setSelectedSkills] = useState();
  const [allSkills, setAllSkills] = useState([]);
  const [skillsArr, setSkillsArr] = useState([]);

  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const phoneRegex = [0 - 9][0 - 9];

  const { register, handleSubmit, errors, formState, reset } = useForm();

  useEffect(() => {
    get();
  }, []);

  const onSubmit = async (data) => {
    if (!isEdit) {
      return;
    }

    await HttpService.put("user/profile", data)
      .then((res) => {
        onEdit();
        get();
        addToast("Profile Updated Successfully", {
          appearance: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // props.addPost(data.content);
  };

  const get = async () => {
    setLoading(true);
    await HttpService.get("user/profile")
      .then(async (res) => {
        reset(res.data);
        formData = res.data;
        setFormData(formData);
        selectRegion(res.data.State);
        selectCountry(res.data.Country);
        setSelectedInterests(res.data.Interests);
        setSelectedSkills(res.data.Skills);
      })
      .catch((err) => {
        console.log(err);
      });

    await HttpService.get("all-interests").then(async (response) => {
      setAllInterests(response.data);
      await HttpService.get("all-skills").then((skillres) => {
        setAllSkills(skillres.data);
      });
    });
  };

  const onEdit = () => {
    setEdit(!isEdit);
  };

  const selectCountry = (val) => {
    setSelectedCountry(val);
  };

  const selectRegion = (val) => {
    setSelectedState(val);
  };

  const onSelectSkillChange = (e) => {
    let skillsArray = [];
    const newValues = allSkills.filter(
      (selected) => selected.SkillId === parseInt(e.target.value)
    );
    const selectedTags = selectedInterests.filter(
      (selected) => selected.SkillId === parseInt(e.target.value)
    );

    if (selectedTags[0]) {
      return;
    }

    let alltags = [...selectedSkills, ...newValues];

    alltags.map((tag) => {
      return skillsArray.push(tag.SkillName);
      //console.log(tag.InterestName)
    });
    setSelectedSkills(alltags);
    setSkillsArr(skillsArray);
  };

  const deleteTag = (e, id) => {
    let interestsArray = [];
    const newValues = selectedInterests.filter(
      (selected) => selected.InterestId !== id
    );

    newValues.map((tag) => {
      return interestsArray.push(tag.InterestName);
      //console.log(tag.InterestName)
    });

    setSelectedInterests(newValues);
    setInterestsArr(interestsArray);
    //window.location.reload()
  };
  const deleteSkillTag = (e, id) => {
    let skillsArray = [];
    const newValues = selectedSkills.filter(
      (selected) => selected.SkillId !== id
    );
    //const allTags = [...selectedInterests, ...newValues];

    newValues.map((tag) => {
      return skillsArray.push(tag.SkillName);
    });

    setSelectedSkills(newValues);
    setSkillsArr(skillsArray);
  };

  return (
    <>
      <div className="card custom-card border-top-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card-header text-end border-bottom-0">
            <div className="header-button align-self-center">
              {isEdit ? (
                <>
                  <button
                    className="btn"
                    type="button"
                    onClick={() => {
                      onEdit();
                    }}
                  >
                    <i className="fas fa-times" aria-hidden="true"></i>
                  </button>
                  <button className="btn" type="submit">
                    <i className="fas fa-save" aria-hidden="true"></i>{" "}
                  </button>
                </>
              ) : (
                <button
                  className="btn"
                  type="button"
                  onClick={() => {
                    onEdit();
                  }}
                >
                  {" "}
                  <i className="fas fa-pen" aria-hidden="true"></i>{" "}
                </button>
              )}
            </div>
          </div>

          <div className="profile-img">
            <img src={profile_img} alt="" />
          </div>
          {!isLoading && (
            <BeatLoader
              css={`
                text-align: center;
                margin-left: 50%;
              `}
              color={"#2f3272"}
              loading={!isLoading}
              size={10}
              margin={2}
            />
          )}

          {isLoading && (
            <div className="card-body">
              <div className="form-group">
                <label> First Name</label>
                {!isEdit ? (
                  <p>{formData.Name}</p>
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    name="Name"
                    placeholder="Enter First Name!"
                    ref={register({ required: true })}
                  />
                )}
                <ErrorMessage type={errors.Name && errors.Name.type} />
              </div>

              <div className="form-group">
                <label> Last Name</label>
                {!isEdit ? (
                  <p>{formData.LastName}</p>
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    name="LastName"
                    placeholder="Enter Last Name!"
                    ref={register({ required: true })}
                  />
                )}
                <ErrorMessage type={errors.LastName && errors.LastName.type} />
              </div>

              <div className="form-group">
                <label>Email</label>
                <p>{formData.Email}</p>
                <input
                  type="text"
                  className="d-none"
                  name="Email"
                  placeholder="Enter Email!"
                  ref={register({ required: true, pattern: emailRegex })}
                />
                <ErrorMessage
                  type={errors.Email && errors.Email.type}
                  patternType={"email"}
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                {!isEdit ? (
                  <p>{formData.PhoneNumber}</p>
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    name="PhoneNumber"
                    placeholder="Enter Phone"
                    ref={register({ required: true, pattern: phoneRegex })}
                  />
                )}
                <ErrorMessage
                  type={errors.PhoneNumber && errors.PhoneNumber.type}
                  patternType={"phoneNumber"}
                />
              </div>

              <div className="form-group">
                <label>Company Name</label>
                {!isEdit ? (
                  <p>{formData.CompanyName}</p>
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    name="CompanyName"
                    placeholder="Enter Comapnay Name"
                    ref={register({ required: true })}
                  />
                )}
                <ErrorMessage
                  type={errors.CompanyName && errors.CompanyName.type}
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                {!isEdit ? (
                  <p>{formData.Address}</p>
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    name="Address"
                    placeholder="Enter Adress"
                    ref={register({ required: true })}
                  />
                )}
                <ErrorMessage type={errors.Address && errors.Address.type} />
              </div>

              <div className="form-group">
                <label>Address Line 2</label>
                {!isEdit ? (
                  <p>{formData.AddressLine2}</p>
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    name="AddressLine2"
                    placeholder="Enter Adress Line 2"
                    ref={register({ required: true })}
                  />
                )}
                <ErrorMessage
                  type={errors.AddressLine2 && errors.AddressLine2.type}
                />
              </div>

              <div className="form-group">
                <label>City</label>
                {!isEdit ? (
                  <p>{formData.City}</p>
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    name="City"
                    placeholder="Enter City"
                    ref={register({ required: true })}
                  />
                )}
                <ErrorMessage type={errors.City && errors.City.type} />
              </div>

              <div className="form-group">
                <label>Country</label>
                {!isEdit ? (
                  <p>{formData.Country}</p>
                ) : (
                  <>
                    <CountryDropdown
                      className="form-control"
                      value={selectedCountry}
                      onChange={(val) => selectCountry(val)}
                    />
                    <input
                      type="text"
                      className="d-none"
                      value={selectedCountry}
                      name="Country"
                      ref={register({ required: false })}
                    />
                  </>
                )}
                <ErrorMessage type={errors.Country && errors.Country.type} />
              </div>

              <div className="form-group">
                <label>State</label>
                {!isEdit ? (
                  <p>{formData.State}</p>
                ) : (
                  <>
                    <RegionDropdown
                      className="form-control"
                      country={selectedCountry}
                      value={selectedState}
                      onChange={(val) => selectRegion(val)}
                    />
                    <input
                      type="text"
                      className="d-none"
                      name="State"
                      value={selectedState}
                      placeholder="Enter State"
                      ref={register({ required: true })}
                    />
                  </>
                )}
                <ErrorMessage type={errors.State && errors.State.type} />
              </div>

              <div className="checkbox-group mb-5">
                <label className="d-block">Skills</label>
                {selectedInterests &&
                  selectedInterests.map((res) => {
                    return (
                      <label className="btn btn-outline-primary">
                        {res.InterestName}
                        <span
                          className="cross"
                          type="button"
                          onClick={(e) => deleteTag(e, res.InterestId)}
                        >
                          <i className="fa fa-times" aria-hidden="true"></i>
                        </span>
                      </label>
                    );
                  })}
              </div>

              <div className="checkbox-group mb-5">
                <label className="d-block">Skills</label>
                {selectedSkills &&
                  selectedSkills.map((res) => {
                    return (
                      <label className="btn btn-outline-primary">
                        {res.SkillName}
                        <span
                          className="cross"
                          type="button"
                          onClick={(e) => deleteSkillTag(e, res.SkillId)}
                        >
                          <i className="fa fa-times" aria-hidden="true"></i>
                        </span>
                      </label>
                    );
                  })}
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};
export default ProfileForm;
