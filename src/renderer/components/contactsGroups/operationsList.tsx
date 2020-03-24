import React from 'react';
import { useHistory } from 'react-router-dom';
import { List } from 'antd';

const { Item: ListItem } = List;

export default function OperationsList() {
    const history = useHistory();
    return (
        <List className="operations" size="small" split={false}>
            <ListItem
                className="operation-item"
                onClick={() => {
                    history.push('/contacts/addContacts');
                }}
            >
                加好友/群
            </ListItem>
            <ListItem
                className="operation-item"
                onClick={() => {
                    history.push('/contacts/createGroup');
                }}
            >
                创群
            </ListItem>
        </List>
    );
}
