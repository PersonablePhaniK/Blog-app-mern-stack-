import React, { useEffect } from "react";
import { connect } from "react-redux";
import Blog from "../components/user/Blog";
import { getPosts, getPostsByAuthor } from "../actions/postActions";

const BlogPage = ({
   isAuthenticated,
   getPostsByAuthor,
   getPosts,
   match,
   posts
}) => {
   useEffect(() => {
      isAuthenticated ? getPosts() : getPostsByAuthor();
   }, [isAuthenticated, getPosts, getPostsByAuthor, match]);

   return <Blog posts={posts} auth={isAuthenticated} />;
};

const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated,
   posts: state.post.posts
});


export default connect(
   mapStateToProps,
   { getPostsByAuthor, getPosts }
)(BlogPage);
