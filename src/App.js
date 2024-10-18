import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import { withRouter } from "react-router";

// layouts

import { Admin, Auth } from "layouts"

import { Home, Landing, Profile } from "views";
import { connect } from "react-redux";
import { loadUserDetails } from "api/actions/auth";
import { USER_LOADED } from "constants/types";
import Cookies from "js-cookie";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    const userDetails = async () => {
      this.setState({ loading: true })
      await this.props.loadUserDetails()
        .then(({ response, dispatch }) => {
          this.setState({ loading: true }, () => {
            dispatch({
              type: USER_LOADED,
              payload: response.data
            });
          })
        })
        .catch((error) => {
          this.setState({ loading: false });
        })
    }
    const token = Cookies.get("token");

    if(token){
      userDetails()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.auth?.user && this.props.auth?.user) {
      this.props.history.push("/admin");
    }
  }

  render() {
    return (
      <Switch>
        {/* add routes with layouts */}
        {
          (this.props.auth?.user) ? (
            <Route path="/admin" component={Admin} />
          ) : (
            <Route path="/auth" component={Auth} />
          )
        }
        {/* add routes without layouts */}
        <Route path="/landing" exact component={Landing} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/" exact component={Home} />
        {/* add redirect for first page */}
        <Redirect from="*" to="/" />
      </Switch>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { loadUserDetails })(withRouter(App));