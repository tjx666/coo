import React from 'react';
import { Collapse, List } from 'antd';

import './style.scss';

const { Panel } = Collapse;
const { Item: ListItem } = List;

export default function ContactsGroup() {
    return (
        <Collapse className="contacts-group">
            <Panel header="新的联系人" key="1">
                <List
                    dataSource={['一', '二', '三', '四']}
                    renderItem={item => {
                        return <ListItem>{item}</ListItem>;
                    }}
                />
            </Panel>
        </Collapse>
    );
}
