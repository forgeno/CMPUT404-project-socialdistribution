import React from "react";
import SideBar from "../SideBar";
import {AppContainer as BaseAppContainer, ExampleBody as Body} from "../../containers";
import {Redirect} from "react-router-dom";
import styled from "styled-components";
import Cookies from 'js-cookie';
import store from '../../store/index.js';

const AppContainer = styled(BaseAppContainer)`
  height: calc(100vh - 40px);
`;

export default function withAuth(Component, navId) {
    return class extends Component {
        render() {
            let isLoggedIn = store.getState().loginReducers.isLoggedIn || Cookies.get("userPass");
            if (isLoggedIn) {
                return (
                    <AppContainer>
                        <SideBar navId={navId}/>
                        <Body>
                            <Component {...this.props} />
                        </Body>
                    </AppContainer>
                );
            } else {
                return (
                    <Redirect to={"/"}/>
                );
            }
        }
    };
}
