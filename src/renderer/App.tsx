import * as React from 'react';
import { Button, Switch } from 'antd';
import './App.scss';

const App = () => {
    const { node, chrome, electron } = process.versions;

    return (
        <div className="app">
            <Button>按钮</Button>
            <Switch />
            <h1>Hello electron!</h1>
            {`We are using node ${node}, Chrome ${chrome}, and Electron ${electron}`}
        </div>
    );
};

export default App;
