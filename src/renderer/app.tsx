import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import omit from 'lodash/omit';

import { RegisterPage, LoginPage } from 'pages';
import { ContainerWithNavbar } from '@/layouts';

import { GetUserResponse } from './api/user';
import api, { AxiosResponse } from './api';
import { updateUser } from './reducers/user';
import storage from './utils/storage';
import './app.scss';

function App() {
    const dispatch = useDispatch();

    const syncProfile = React.useCallback(async () => {
        let resp: AxiosResponse<GetUserResponse> | undefined;
        try {
            resp = await api<GetUserResponse>('getUser', {
                pathParams: { id: storage.get('id')! },
            });
        } catch (error) {
            message.error('获取用户信息出错！');
            return;
        }

        const userInfo = resp.data.data;
        dispatch(
            updateUser({
                id: userInfo._id,
                ...omit(userInfo, ['_id']),
            }),
        );
    }, [dispatch]);

    React.useEffect(() => {
        const { href } = window.location;
        if (!href.endsWith('/login') && !href.endsWith('/register')) {
            syncProfile();
        }
    }, [syncProfile]);

    return (
        <div className="app">
            <Switch>
                <Route path="/register" component={RegisterPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/profile" component={ContainerWithNavbar} />
                <Route path="/message" component={ContainerWithNavbar} />
                <Route path="/contacts" component={ContainerWithNavbar} />
                <Redirect to="/login" />
            </Switch>
        </div>
    );
}

export default hot(App);
