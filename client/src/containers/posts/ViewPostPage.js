import React, { useEffect } from "react";
import ViewPost from "../../components/posts/ViewPost";
import { deletePost, getPostByID } from "../../actions/postActions";
import { connect } from "react-redux";

const ViewPostPage = ({
   auth,
   post,
   match,
   history,
   getPostByID,
   deletePost
}) => {
   useEffect(() => {
      getPostByID(match.params.id);
   }, [match, getPostByID]);

   const handleEdit = () => {
      history.push(`/blog/post/update/${post._id}`);
   };

   const handleDelete = () => {
      deletePost(post._id, history);
   };

   if (Object.keys(post).length === 0) return <div />;
   return (
      <ViewPost
         post={post}
         auth={auth}
         onDelete={handleDelete}
         onEdit={handleEdit}
      />
   );
};

const mapStateToProps = state => ({
   auth: state.auth.isAuthenticated,
   post: state.post.post
});


export default connect(
   mapStateToProps,
   { getPostByID, deletePost }
)(ViewPostPage);