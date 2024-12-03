import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { postSchema } from "../../lib/validations";
import { addPost, deletePost, fetchPosts } from "./postsSlice";
import "./style.css";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsData.posts);

  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
  });

  const [formErros, setFormErros] = useState({
    titleError: "",
    bodyError: ""
  })

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleAddPost = () => {
    const validationResult = postSchema.safeParse(newPost)
    if (!validationResult.success) {
      const errors = validationResult.error.format()
      setFormErros({
        titleError: errors.title?._errors[0],
        bodyError: errors.body?._errors[0]
      })
      return
    }
    dispatch(addPost(newPost)).then(() => {
      setNewPost({ title: "", body: "" });
      toast.success("Post added successfully");
    });
  };

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId))
    toast.error("Post deleted successfully");
  }

  return (
    <>
      <div className="posts-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {posts &&
                posts.map((post) => (
                  <div className="card post-item" key={post.id}>
                    <div className="card-body">
                      <Link to={`${post.id}`}>
                        <h5>
                          {post.id} - {post.title}
                        </h5>
                      </Link>
                      <p className="card-text">{post.body}</p>
                      <div className="postControlButtons">
                        <button className="btn btn-primary">
                          <FontAwesomeIcon icon={faEdit} />
                          Update
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDeletePost(post.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="col-lg-4">
              <div className="add-post-form">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Title"
                  value={newPost.title}
                  onChange={(e) => {
                    setNewPost({ ...newPost, title: e.target.value });
                  }}
                />
                {
                  formErros.titleError && (
                    <p className="text-danger">{formErros.titleError}</p>
                  )
                }
                <textarea
                  className="form-control mb-2"
                  placeholder="Body"
                  rows="4"
                  value={newPost.body}
                  onChange={(e) => {
                    setNewPost({ ...newPost, body: e.target.value });
                  }}
                />
                {formErros.bodyError && (
                  <p className="text-danger">{formErros.bodyError}</p>
                )}
                <button className="btn btn-success" onClick={handleAddPost}>
                  <FontAwesomeIcon icon={faPlus} /> Add Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div >

      <ToastContainer />
    </>
  );
};

export default PostsList;
