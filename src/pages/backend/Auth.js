
import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import Routes from './routes'
import '../../app/App.scss';
import ClientNavbar from '../../app/shared/client/Navbar';
import ClientSidebar from '../../app/shared/client/Sidebar';
import Footer from '../../app/shared/Footer';
import { connect } from "react-redux"

 class Auth extends Component {

  state = {}

    componentDidMount(){
      this.onRouteChanged();
    }
  render() {
    let navbarComponent = !this.state.isFullPageLayout ? <ClientNavbar/> : '';
    let sidebarComponent = !this.state.isFullPageLayout ? <ClientSidebar/> : '';
    let footerComponent = !this.state.isFullPageLayout ? <Footer/> : '';
    return (
      <div className="container-scroller">
      { navbarComponent }
      <div className="container-fluid page-body-wrapper">
        { sidebarComponent }
        <div className="main-panel">
          <div className="content-wrapper">
        <Routes/>
        </div>
            { footerComponent }
          </div>
        </div>
      </div>
    )
  }


  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log("ROUTE CHANGED");
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = ['../app/user-pages/login-1', '../app/user-pages/login-2', '../app/user-pages/register-1', '../app/user-pages/register-2', '../app/user-pages/lockscreen', '../app/error-pages/error-404', '../app/error-pages/error-500', '../app/general-pages/landing-page'];
    for ( let i = 0; i < fullPageLayoutRoutes.length; i++ ) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true
        })
        document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
        break;
      } else {
        this.setState({
          isFullPageLayout: false
        })
        document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
      }
    }
  }
}
const mapStateToProps=(state)=>{
  return{
    usertype:state.Auth.usertype, 
  }
}

export default withRouter(connect(mapStateToProps)(Auth))