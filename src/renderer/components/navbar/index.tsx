import React, { useEffect, useMemo, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-use';

import { RootState } from 'reducers';
import { setLatestPathNameInContactsPage } from 'reducers/status';
import emitter from 'utils/emitter';

import NavbarAvatar from './navbarAvatar';
import NavItem from './navItem';
import './style.scss';

function Navbar() {
    const dispatch = useDispatch();

    const location = useLocation();
    const avatar = useSelector((state: RootState) => state.profile.avatar);
    const currentSession = useSelector((state: RootState) => state.session.currentSession);
    const latestPathNameInContactsPage = useSelector(
        (state: RootState) => state.status.latestPathNameInContactsPage,
    );

    // 监听 URL 变化，更新 redux store 中保存的联系人页面最新 pathName
    useEffect(() => {
        const handleUrlChange = () => {
            const { pathname } = window.location;
            if (pathname !== latestPathNameInContactsPage && pathname?.startsWith('/contacts')) {
                dispatch(setLatestPathNameInContactsPage(pathname));
            }
        };
        // 初次进入页面也触发一次
        handleUrlChange();
        emitter.on('urlChange', handleUrlChange);
        return () => {
            emitter.off('urlChange', handleUrlChange);
        };
    }, [dispatch, latestPathNameInContactsPage]);

    // 激活的菜单项根据当前 URL 变化而变化
    const activeIndex = useMemo(() => {
        const pathName = location.pathname;

        if (pathName?.startsWith('/message')) {
            return 0;
        }

        if (pathName?.startsWith('/contacts')) {
            return 1;
        }

        return -1;
    }, [location]);

    const chatUrl = useMemo(() => (currentSession ? '/message/chat' : '/message'), [
        currentSession,
    ]);

    return (
        <aside className="navbar">
            <NavbarAvatar src={avatar} />
            <NavItem to={chatUrl} active={activeIndex === 0} iconType="icon-message-" />
            <NavItem
                to={latestPathNameInContactsPage}
                active={activeIndex === 1}
                iconType="icon-contacts-fill"
            />
        </aside>
    );
}

export default memo(Navbar);
