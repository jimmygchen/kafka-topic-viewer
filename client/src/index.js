import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import {Main} from './app/main';

import './index.less';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

fetch('clientConfig.json')
    .then(clientConfig => clientConfig.json())
    .catch(() => {
        console.error('clientConfig.json not found on server.');
    })
    .then((clientConfig) => {
        console.log(`ktvClientConfig ${JSON.stringify(clientConfig)}`);
        window.ktvClientConfig = clientConfig;

        ReactDOM.render(
            <Router history={browserHistory}>
                <Route path="/" component={Main}/>
            </Router>,
            document.getElementById('root')
        );
    });