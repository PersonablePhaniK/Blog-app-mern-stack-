import React from "react";
import Progress from "../../components/layout/Progress";
import { connect } from "react-redux";

const ProgressBar = ({ loading }) => {
   return loading ? <Progress /> : <div />;
};

const mapStateToProps = state => ({
   loading:
      state.auth.userLoading ||
      state.post.postLoading ||
      state.post.postsLoading
});



export default connect(mapStateToProps)(ProgressBar);