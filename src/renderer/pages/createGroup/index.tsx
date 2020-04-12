import React, { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import debounce from 'lodash/debounce';

import api from 'api';
import { fetchGroups } from 'reducers/group';
import storage from 'utils/storage';

import './style.scss';

const { Item: FormItem } = Form;

function CreateGroupSubPage() {
    const dispatch = useDispatch();

    const submit = useCallback(
        async (values: any) => {
            const { name } = values;
            try {
                await api('createGroup', {
                    data: {
                        master: storage.get('id'),
                        name,
                    },
                });
            } catch (error) {
                console.error(error);
                const code = error?.response?.data?.code;
                if (code === 2) {
                    message.error('您创建的群数量已达上限！');
                } else {
                    message.error('创建失败！');
                }
                return;
            }

            dispatch(fetchGroups());
            message.success('创建成功！');
        },
        [dispatch],
    );

    return (
        <div className="create-group-sub-page">
            <h2 className="title">新建群</h2>
            <Form
                className="create-group-form"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={debounce(submit, 200)}
            >
                <FormItem
                    name="name"
                    label="群名称"
                    rules={[{ required: true, message: '必须指定群名称' }]}
                >
                    <Input placeholder="请输入群名称" />
                </FormItem>
                <FormItem wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        创建
                    </Button>
                </FormItem>
            </Form>
        </div>
    );
}

export default memo(CreateGroupSubPage);
