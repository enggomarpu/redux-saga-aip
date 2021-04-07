import React, {useState, useEffect} from "react";
import httpService from "../../../shared/http.service";

const FeaturedPosts = () => {

    const [featuredPostsDetail, setPromotionalPost] = useState();

    useEffect(() => {
        get();
    }, []);

    const get = async () => {
      await httpService.get('posts/dashboard-promotional-post').then((res) => {
        if (res) {
        setPromotionalPost(res.data);
        console.log('promotional post data', res.data);
        }
      }).catch((err) => {
        console.log(err)
      })}

    return (
      <>
          { featuredPostsDetail &&
        Object.keys(featuredPostsDetail).length === 0 && featuredPostsDetail.constructor === Object &&
          
              <div className="card simple-card card-border">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <div className="align-self-center">
                        <h4 className="card-title-primary">FEATURED TODAY</h4>
                        <h3 className="card-title">{featuredPostsDetail.PromotionalPost.PostTitle}</h3>
                        <h5 className="card-subtitle">
                        {featuredPostsDetail.PromotionalPost.PostTitle} | 
                        {featuredPostsDetail.PromotionalPost.UpdatedDate} |
                        {featuredPostsDetail.PromotionalPost.CreatedDate}
                        </h5>
                        <p className="card-text">
                        {featuredPostsDetail.PromotionalPost.PostContent}
                        </p>
                      </div>
                    {/* <div className="btn-pane align-self-center">
                            <a href="/" className="card-link">
                              <i className="far fa-hand-point-right"></i>
                            </a>

                            <a href="/" className="card-link">
                              <i className="far fa-star"></i>
                            </a>

                            <a href="/" className="card-link">
                              <i className="fa fa-share-alt"></i>
                            </a>

                            <a href="/" className="card-link">
                              <i className="far fa-comment-alt"></i>
                            </a>
                     </div>*/}
                    </div>

                  </div>
                           {/*<div className="card-footer d-flex justify-content-between">
                             <div className="align-self-center">
                               <a href="/" className="btn btn-primary btn-width">
                                 <i className="fas fa-check"></i> Going
                               </a>
                               <a href="/" className="btn btn-outline-dark">
                                 <i className="fas fa-times"></i> Not Going
                               </a>
                             </div>
                            
                             <div className="right">
                             </div> 
                           </div>*/}
                </div>
            
          
        }
        </>
    );
}

export default FeaturedPosts;