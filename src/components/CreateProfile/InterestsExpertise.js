import React, { Component } from "react";
import BackButton from "../BackButton/BackButton";
import "./InterestsExpertise.scss";
import Logo from "../../img/logo.png";
import HttpService from './../../shared/http.service';
import Swal from 'sweetalert2'
import { StateContext } from "./Context/GlobalProvider";
import { data } from "jquery";


class InterestsExpertise extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getUser = this.getUser.bind(this);

    this.state = {
      isErrorInterests: false,
      isErrorSkills: false,
      allInterests: [],
      allSkills: [],
      userSkills: [],
      userInterests: [],
      userInterestsNamesArr: [],
      userSkillsNamesArr: [],
      requestFail: false,
      adminSelected: true,
      errorResponse: ''
    };
  }
  
  static contextType = StateContext;

  
  componentDidMount(){
    this.getUser();
  }
  getUser = async () => {
    await HttpService.get("user/profile").then(async(res) => {
      Object.assign(data, res.data);
      this.setState((prevState) => ({...prevState, userSkills: res.data.Skills}));
      this.setState((prevState) => ({...prevState, userInterests: res.data.Interests}));
      await HttpService.get('all-skills').then(async(resp) => {
        this.setState((prevState) => ({...prevState, allSkills: resp.data}));
        await HttpService.get('all-interests').then((respo) => {
          this.setState((prevState) => ({...prevState, allInterests: respo.data}));
        })
      })
    }).catch((err) => {
      console.log(err);
    })

  }
  
  
  //Interests Checkbox
  handleInterestsChange = async (event) => {

    this.setState((prevState) => ({...prevState,  isErrorInterests: false}), () => {console.log('on handle change', this.state.isErrorInterests)});
    const {checked, id  } = event.target;

    const selectedInterest = this.state.allInterests.filter(element => element.InterestName === id );
    let newIntererestsArray = []; 
    let newIntererestsNamesArray = [];
    newIntererestsArray = [...this.state.userInterests];

    if (checked) {
        
        newIntererestsArray.push(selectedInterest[0]);
        
        await this.setState((prevState) => ({...prevState, userInterests: newIntererestsArray, 
          adminSelected: !this.state.adminSelected }));
    } else {

        newIntererestsArray.pop(selectedInterest);
        

        await this.setState((prevState) => ({...prevState, userInterests: newIntererestsArray, 
          adminSelected: !this.state.adminSelected }));

    }


    newIntererestsArray.map((tag)=>{newIntererestsNamesArray.push(tag.InterestName)});
    this.setState((prevState) => ({...prevState, userInterestsNamesArr: newIntererestsNamesArray}));
    console.log('interests',  this.state.userInterests);
  };

   //Skills Checkbox
   handleSkillsChange = async (event) => {

    this.setState((prevState) => ({...prevState, isErrorSkills: false}), () => {console.log('on handle change', this.state.isErrorInterests)});
    const {checked, id  } = event.target;

    const selectedSkill = this.state.allSkills.filter(element => element.SkillName === id );

    let newSkillsArray = []; 
    let newSkillsNamesArray = [];
    newSkillsArray = [...this.state.userSkills];

    if (checked) {
        
        newSkillsArray.push(selectedSkill[0]);
        await this.setState((prevState) => ({...prevState, userSkills: newSkillsArray, 
          adminSelected: !this.state.adminSelected }));
    } else {

        newSkillsArray.pop(selectedSkill);
        this.setState((prevState) => ({...prevState, userSkills: newSkillsArray, 
          adminSelected: !this.state.adminSelected }));

    }


    newSkillsArray.map((tag)=>{newSkillsNamesArray.push(tag.SkillName)});
    await this.setState((prevState) => ({...prevState, userSkillsNamesArr: newSkillsNamesArray}));
    console.log('skilsss', this.state.userSkills);
  };

  handleSubmit = async (e) => {

    const {isErrorInterests, isErrorSkills} = this.state;
    if (this.state.userInterests.length === 0) {
      this.setState({ isErrorInterests: true });
    }
    if (this.state.userSkills.length === 0) {
      this.setState({ isErrorSkills: true });
    }

    const user = JSON.parse(localStorage.getItem('user-info'));
    if(!isErrorInterests && !isErrorSkills){
      let allData = {
        Email: user.username,
        interests: this.state.userInterestsNamesArr,
        skills: this.state.userSkillsNamesArr,
    }
    await HttpService.put("user/profile", allData)
        .then((res) => {
          //console.log('statu code', res.status);
          if( res.status  === 200 || res.status  === 201){
            console.log('statu code', res.status);
             this.props.history.push("/allset")
        }
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: error.response.status,
            html: error.response.data.message,
          });
        });
        
      }
     if (!this.state.isErrorInterests && !this.state.isErrorSkills && this.state.requestFail) {
         //this.props.nextStep();
     }


  };
  render() {
    const { userSkills, allSkills, allInterests, userInterests, requestFail, errorResponse, isErrorInterests } = this.state;
    return (
      <>
          <BackButton />
          <div className="text-center mt-5 mb-5">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="container bg-white">
            <div className="row justify-content-center pt-5 pb-5">
              <div className="col-md-8"> 
              {requestFail && <div className="alert alert-danger">Server Issue: {errorResponse}</div>}
              <h2 className="text-center mb-5">Interests &amp; Skills</h2>
              <div className="form-group">
              {isErrorInterests && (
                    <div className="alert alert-danger">
                      At least one interest required
                    </div>
                  )}
                  <h3>Interests</h3>
                  <p>
                    Please select all the relevant industries that you are
                    interested in learning more about.
                  </p>
                  <div className="checkbox-group mb-5" role="group" aria-label="Basic checkbox toggle button group">
                    
                        {
                        allInterests.map(parentinterest => {
                          let inter =  userInterests.filter(item => item.InterestName === parentinterest.InterestName);
                          let valueFound =  inter.length > 0 ? inter[0].InterestName === parentinterest.InterestName ? true : false : null;
                          
                              return (
                              <>
                                <input
                                  type="checkbox"
                                  className="btn-check"
                                  id={parentinterest.InterestName}
                                  autoComplete="off"
                                  defaultChecked = {valueFound ? this.state.adminSelected: !this.state.adminSelected} 
                                  name={parentinterest.InterestName}
                                  onChange={this.handleInterestsChange}
                                />
                                <label
                                  className="btn btn-outline-primary"
                                  htmlFor={parentinterest.InterestName}
                                >
                                  {parentinterest.InterestName}
                                </label>
                              </>
                            ) 
                            
                          }) //courseData...map()
                        }                     
                      
                  </div>
              </div>

              
              <div className="form-group">
              {this.state.isErrorSkills && (
                    <div className="alert alert-danger">
                      At least one interest required
                    </div>
                  )}
                  <h3>Skills</h3>
                  <p>
                    Please select all the relevant industries that you are
                    interested in learning more about.
                  </p>
                  <div className="checkbox-group mb-5" role="group" aria-label="Basic checkbox toggle button group">
                  {
                        allSkills.map(itemskill => {
                          let inter =  userSkills.filter(item => item.SkillName === itemskill.SkillName);
                          let valueFound =  inter.length > 0 ? inter[0].SkillName === itemskill.SkillName ? true : false : null;
                          
                              return (
                              <>
                                <input
                                  type="checkbox"
                                  className="btn-check"
                                  id={itemskill.SkillName}
                                  autoComplete="off"
                                  defaultChecked = {valueFound ? this.state.adminSelected: !this.state.adminSelected} 
                                  name={itemskill.SkillName}
                                  onChange={this.handleSkillsChange}
                                />
                                <label
                                  className="btn btn-outline-primary"
                                  htmlFor={itemskill.SkillName}
                                >
                                  {itemskill.SkillName}
                                </label>
                              </>
                            ) 
                            
                          }) //courseData...map()
                        }                     
                  
                 

                    

                  </div>
              </div>

              <div className="form-group d-grid mt-5">
                  <button
                    type="button"
                    className="btn btn-primary btn-block btn-height"
                    onClick={this.handleSubmit}
                   // disabled={this.state.requestFail}
                  >
                    Complete
                  </button>
                </div>
               
              </div>
            </div>
          </div>  
           
      </>
    );
  }
}

export default InterestsExpertise;
