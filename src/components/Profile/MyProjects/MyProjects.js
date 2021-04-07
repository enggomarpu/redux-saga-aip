import React, { useState, useEffect } from 'react'
import HttpService from '../../../shared/http.service'
import PlusCircle from '../../../img/plus-circle.png'
import ProjectsModal from './ProjectsModal';
import { format } from 'date-fns';



const MyProjects = (props) => {

  const [allProjects, setAllProjects] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [modalType, setmodalType] = useState(1);
  const [projectId, setprojectId] = useState(1);
  
  useEffect(() => {
    console.log('useEfffeect callec');
      get();
  }, [openModel]);

    const get = async () => {
    await HttpService.get('affiliate-projects').then(async (res) => {
      if (res) {
        setAllProjects(res.data);
        console.log('heeeeelo projects', res.data);
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleClick = () => {
    setOpenModel(true);
    setmodalType(1)
  }
  const setValues = (idvalue) => {
    setOpenModel(true);  
    setprojectId(idvalue);
  }

  const updateProjects = (valueId) => {
  // const updateProjects = (Cname, PAffiliate, SDate, EDate, StatuS, DescriptioN, valueId) => {
    //result.ClientName, result.StartDate, result.EndDate, result.AffiliateProjectId
    setmodalType(2);
    setValues(valueId);
  }
  
   //const deleteProject = (clinetN, partnerAff, startD, endD, Status, Description, valuId) => {
   const deleteProject = (valuId) => { 
    setmodalType(3);
    setValues(valuId);
      
   }
  
    return (
      <>
        <div className='card custom-card'>
          <div className='card-header d-flex justify-content-between mb-3'>
            <h5 className='card-title align-self-center'>{props.headin5}</h5>
            <div className='header-button align-self-center'>
              <label>
                {props.button}
                <button
                  type='button'
                  className='btn p-1 ms-1'
                  onClick = { handleClick }
                >
                  <img src={PlusCircle} alt='PlusCircle' />
                </button>
              </label>
            </div>
          </div>

          <div className='card-body'>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>Clinet Name</th>
                    <th scope='col'>Partnered Affiliate</th>
                    <th scope='col'>Start Date</th>
                    <th scope='col'> End Date</th>
                    <th scope='col'> Status</th>
                    <th scope='col'  colSpan="2"> Description</th>
                  </tr>
                </thead>
                <tbody>
                  {allProjects && allProjects.map((result) => {
                    console.log('llllllllllllllll', result)
                    return (
                      <tr>
                        <th scope='row'>{result.ClientName}</th>
                        <td>
                          {/* <img src={Icon} alt='Icon' /> Tinted Labs */}
                          {result.PartneredAffiliate && result.PartneredAffiliate.Name}
                        </td>
                        <td>{format(new Date(result.StartDate), 'yyyy-MM-dd')}</td>
                        <td>{format(new Date(result.EndDate), 'yyyy-MM-dd')}</td>
                        <td>
                          <button className='btn btn-success btn-rounded'>
                          {result.ProjectStatus ==  1 ? 'Ongoing' : result.ProjectStatus ==  2 ? 'Completed' : result.ProjectStatus ==  3 ? 'Rejected' : null}
                          </button>
                        </td>
                        <td>{result.Description}</td>
                        
                      
                        <td>
                  <div className='dropdown d-inline-block'>
                  <button
                      className='btn'
                      type='button'
                      id='dropdownMenuButton1'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      <i className='fas fa-ellipsis-v'></i>
                    </button>
                    <ul
                      className='dropdown-menu'
                      aria-labelledby='dropdownMenuButton1'
                    >
                      <li>
                        <button type="button" className='dropdown-item' href='#' onClick ={() => deleteProject(result.AffiliateProjectId)}>
                          Delete Proejct
                        </button>
                      </li>
                      <li>
                        <button className='dropdown-item' href='#' onClick={() => updateProjects(result.AffiliateProjectId)}>
                          Update Project
                        </button>
                      </li>
                    </ul>
                    
                  </div>
                  </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              
            </div>
                   <ProjectsModal
                      show={openModel}
                      idofproject = {projectId}
                      modalType = {modalType}
                      onHide={() => setOpenModel(false)}
                    />
          </div>
        </div>

        {/* <Model /> */}
      </>
    )
}

export default MyProjects;
