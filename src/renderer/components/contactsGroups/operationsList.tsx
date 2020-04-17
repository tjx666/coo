import React, { memo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { List } from 'antd';

const { Item: ListItem } = List;

function OperationsList() {
    const history = useHistory();

    return (
        <List className="operations" size="small" split={false}>
            <ListItem
                className="operation-item"
                onClick={useCallback(() => {
                    if (window.location.pathname !== '/contacts/addContacts') {
                        history.push('/contacts/addContacts');
                    }
                }, [history])}
            >
                加好友/群
            </ListItem>
            <ListItem
                className="operation-item"
                onClick={useCallback(() => {
                    if (window.location.pathname !== '/contacts/createGroup') {
                        history.push('/contacts/createGroup');
                    }
                }, [history])}
            >
                创群
            </ListItem>
        </List>
    );
}

export default memo(OperationsList);
