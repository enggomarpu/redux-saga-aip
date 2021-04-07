import React, { useEffect, useState } from 'react'
import AwsLogo from '../../../img/aws-logo.png'
import httpService from '../../../shared/http.service'
import { formatDistance } from 'date-fns'

const DashboardPosts = () => {
  const [dashboardPosts, setDashboardPosts] = useState([])

  useEffect(() => {
    get()
  }, [])

  const getTime = (date) => {
    return date.toLocaleTimeString('en-US')
  }

  const get = async () => {
    await httpService.get('posts/current-affiliate').then(async (response) => {
      setDashboardPosts(response.data)
    })
  }

  return (
    <>
      <div className='card'>
        <div className='card-body'>
          <div className='row row-cols-1 row-cols-md-2 g-4'>
            {dashboardPosts &&
              dashboardPosts.map((post) => {
                return (
                  <>
                    {post.Post && (
                      <div className='col'>
                        <div className='card'>
                          <div className='card-body'>
                            <div className='row'>
                              <div className='col-auto d-flex align-items-center'>
                                <img src={AwsLogo} alt='' />
                              </div>
                              <div className='col'>
                                <h5 className='card-title mb-0'>
                                  {post.Post.PostTitle}
                                </h5>
                                <p className='card-text mb-1'>
                                  <small className='text-muted'>
                                    {getTime(
                                      new Date(post.Post.CreatedDate)
                                    ).padStart(3, '0')}{' '}
                                    |{' '}
                                    {formatDistance(
                                      new Date(post.Post.CreatedDate),
                                      new Date()
                                    )}
                                  </small>
                                </p>

                                {post.Post.IsApproved ? (
                                  <tr>
                                    <td>
                                      <h5 className='card-title mb-0'>
                                        Status:
                                      </h5>
                                    </td>
                                    <td>
                                      <div className='ms-3'>
                                        <button className='btn btn-danger btn-sm btn-rounded'>
                                          Rejected
                                        </button>
                                        <button className='btn btn-warning btn-sm btn-rounded'>
                                          warning
                                        </button>
                                        <button className='btn btn-success btn-sm btn-rounded'>
                                          Approved
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ) : post.Post.IsApproved == null ? (
                                  <tr>
                                    <td>
                                      <h5 className='card-title mb-0'>
                                        Status:
                                      </h5>
                                    </td>
                                    <td>
                                      <p className='card-text'>Pending</p>
                                    </td>
                                  </tr>
                                ) : (
                                  <tr>
                                    <td>
                                      <h5 className='card-title mb-0'>
                                        Status:
                                      </h5>
                                    </td>
                                    <td>
                                      <p className='card-text'>Reject</p>
                                    </td>
                                  </tr>
                                )}

                                <p className='card-text'>
                                  {post.Post.PostContent}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardPosts
