import React, { useState, useEffect } from "react";
import httpService from "../../../shared/http.service";
import CardImg from "../../../img/card-img.png";
import PostComments from "./post-comment-modal";
import PostModel from "./post-modal";
import { formatDistance } from "date-fns";

const Posts = () => {
  const [Posts, setPosts] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [index, setIndex] = useState(0);
  const [openPostModel, setOpenPostModel] = useState(false);
  const [modalType, setmodalType] = useState(1);
  const [postId, setpostId] = useState(1);
  const [postContent, setpostContent] = useState();
  const [createdDate, setcreatedDate] = useState();
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [postTags, setPostTags] = useState(null);

  var userId = JSON.parse(localStorage.getItem("user-info")).userId;

  useEffect(
    () => {
      get();
    },
    [openPostModel],
    [Posts]
  );

  const get = async () => {
    await httpService.get("posts/dashboard").then((res) => {
      if (res) {
        setPosts(res.data);
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  const getTime = (date) => {
    return date.toLocaleTimeString("en-US");
  };

  const setValues = (content, date, idvalue) => {
    setOpenModel(true);
    setpostContent(content);
    setcreatedDate(date);
    setpostId(idvalue);
  };
  const ViewComments = (content, date, valueId, modaltype, index) => {
    setmodalType(modaltype);
    setIndex(index);
    setValues(content, date, valueId);
  };

  const handleModelOpen = (event, idvalue, postTags) => {
    event.preventDefault();
    setOpenPostModel(true);
    setSelectedPostId(idvalue);
    setPostTags(postTags);
  };

  const LikePost = async (id, IsUserLiked, index) => {
    const postObject = {
      PostId: id,
    };
    let items = [...Posts];
    let item = { ...items[index] };

    if (IsUserLiked) {
      await httpService
        .delete("post-like/" + id)
        .then(() => {
          item.PostAnalytics.TotalLikes = item.PostAnalytics.TotalLikes - 1;
          item.IsUserLiked = !item.IsUserLiked;
          items[index] = item;
          setPosts(items);
          console.log("successfully unlike the post");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await httpService
        .post("post-like", postObject)
        .then((res) => {
          if (res) {
            item.PostAnalytics.TotalLikes = item.PostAnalytics.TotalLikes + 1;
            item.IsUserLiked = !item.IsUserLiked;
            items[index] = item;
            setPosts(items);
            console.log("successfully like the post");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const FavouritePost = async (id, IsUserFavourite, index) => {
    const postObject = {
      PostId: id,
    };
    let items = [...Posts];
    let item = { ...items[index] };

    if (IsUserFavourite) {
      await httpService
        .delete("post-favourite/" + id)
        .then(() => {
          item.PostAnalytics.TotalFavourities =
            item.PostAnalytics.TotalFavourities - 1;
          item.IsUserFavourite = !item.IsUserFavourite;
          items[index] = item;
          setPosts(items);
          console.log("successfully unfavourite the post");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await httpService
        .post("post-favourite", postObject)
        .then((res) => {
          if (res) {
            item.PostAnalytics.TotalFavourities =
              item.PostAnalytics.TotalLikes + 1;
            item.IsUserFavourite = !item.IsUserFavourite;
            items[index] = item;
            setPosts(items);
            console.log("Post is now your favourite");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onModalClose = (added) => {
    setOpenModel(false);
    if (added) {
      let items = [...Posts];
      let item = { ...items[index] };
      item.PostAnalytics.TotalComments = item.PostAnalytics.TotalComments + 1;
      items[index] = item;
      setPosts(items);
    }
  };

  return (
    <>
      {Posts &&
        Posts.map((post, index) => {
          return (
            <div className="card simple-card">
              <div className="row">
                <div className="col-md-3">
                  <img className="card-img" src={CardImg} alt="..." />
                </div>
                <div className="col-md-9">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <div className="align-self-center">
                        <h3 className="card-title">{post.Post.PostTitle}</h3>
                        <h5 className="card-subtitle">
                          {getTime(new Date(post.Post.CreatedDate)).padStart(
                            3,
                            "0"
                          )}{" "}
                          {formatDistance(
                            new Date(post.Post.CreatedDate),
                            new Date()
                          )}
                        </h5>
                      </div>

                      <div className="btn-pane align-self-center">

                        {/* -------------------------
                              Like Post
                        -------------------------*/}
                        <a
                          type="button"
                          onClick={() =>
                            LikePost(post.Post.PostId, post.IsUserLiked, index)
                          }
                          className="card-link"
                        >
                          {post.IsUserLiked ? (
                            <i className="fa fa-hand-point-right"></i>
                          ) : (
                            <i className="far fa-hand-point-right"></i>
                          )}
                        </a>

                        {/* -------------------------
                            Favourite Post
                       -------------------------*/}
                        <a
                          type="button"
                          onClick={() =>
                            FavouritePost(
                              post.Post.PostId,
                              post.IsUserFavourite,
                              index
                            )
                          }
                          className="card-link"
                        >
                          {post.IsUserFavourite ? (
                            <i className="fa fa-star"></i>
                          ) : (
                            <i className="far fa-star"></i>
                          )}
                        </a>
                        {/* -------------------------
                            share Post
                       -------------------------*/}
                        <a type="button" className="card-link">
                          <i className="fa fa-share-alt"></i>
                        </a>

                        {/* -------------------------
                            comment Post
                       -------------------------*/}
                        <a type="button" className="card-link">
                          <i
                            className="far fa-comment-alt"
                            aria-hidden="true"
                            onClick={(e) =>
                              ViewComments(
                                post.Post.PostContent,
                                post.Post.CreatedDate,
                                post.Post.PostId,
                                0,
                                index
                              )
                            }
                          ></i>
                        </a>

                        {/* -------------------------
                            Statistics of Post
                       -------------------------*/}

                        <span className="card-link dropdown">
                          <a
                            className="card-link"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="fas fa-tachometer-alt"></i>
                          </a>

                          <div
                            className="dropdown-menu toggle-menu border-0"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <div className="card custom-card">
                              <div className="card-header">Post Insights</div>
                              <div className="card-body">
                                <ol className="list-group list-group-numbered">
                                  <li className="list-group-item d-flex justify-content-between align-items-start">
                                    <div className="ms-2 me-auto">
                                      <div className="fw-bold">Likes:</div>
                                    </div>
                                    <span className="text-secondary fs-5">
                                      {post.PostAnalytics.TotalLikes}
                                    </span>
                                  </li>
                                  <li className="list-group-item d-flex justify-content-between align-items-start">
                                    <div className="ms-2 me-auto">
                                      <div className="fw-bold">Comments:</div>
                                    </div>
                                    <span className="text-secondary fs-5">
                                      {post.PostAnalytics.TotalComments}
                                    </span>
                                  </li>
                                  <li className="list-group-item d-flex justify-content-between align-items-start">
                                    <div className="ms-2 me-auto">
                                      <div className="fw-bold">Shares:</div>
                                    </div>
                                    <span className="text-secondary fs-5">
                                      {post.PostAnalytics.TotalShare}
                                    </span>
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </span>

                        {userId == post.Post.CreatedUserId && (
                          <a type="button" className="card-link">
                            <i
                              className="fas fa-pen"
                              aria-hidden="true"
                              onClick={(e) =>
                                handleModelOpen(
                                  e,
                                  post.Post.PostId,
                                  post.Post.PostTags
                                )
                              }
                            ></i>
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="card-text">{post.Post.PostContent}</p>
                    <div className="checkbox-group">
                      {post.Post.PostTags &&
                        post.Post.PostTags.map((tag) => {
                          return (
                            <label className="btn btn-primary">
                              {tag.TagName}
                            </label>
                          );
                        })}
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    <div className="align-self-center">
                      <button
                        href="/"
                        type="button"
                        className="btn btn-primary btn-width p-1 ms-1"
                        data-bs-toggle="modal"
                        data-bs-target="#PostComments"
                        onClick={() =>
                          ViewComments(
                            post.Post.PostContent,
                            post.Post.CreatedDate,
                            post.Post.PostId,
                            1,
                            index
                          )
                        }
                      >
                        View comments ({post.PostAnalytics.TotalComments})
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      <PostComments
        idValue={postId}
        show={openModel}
        onHide={onModalClose}
        postDescription={postContent}
        Datecreated={createdDate}
        modalType={modalType}
      />
      {selectedPostId && (
        <PostModel
          show={openPostModel}
          postselectid={selectedPostId}
          PostTags={postTags}
          onHide={() => setOpenPostModel(false)}
        />
      )}
    </>
  );
};

export default Posts;
