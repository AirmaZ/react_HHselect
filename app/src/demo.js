/**
 * Created by Airma on 2016/8/18.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory ,IndexRoute,Link} from 'react-router';

const app = React.createClass({
    render:function () {
        return <div>app</div>
    }

});

const haha = React.createClass({
    render:function () {
        return (
            <div>
                <ul role="nav">
                    <li><Link to="/app">app</Link></li>
                    <li><Link to="/app">app</Link></li>
                </ul>
                <div>{this.props.children || "Welcome to your haha"}</div>
            </div>
        )
    }

});

const index = React.createClass({
    render:function () {
        return (
            <div>
                <div>index</div>
                <div>{this.props.children}</div>
            </div>
        )
    }

});

const home = React.createClass({
    render:function () {
        return <div>home</div>
    }

});

const Dashboard = React.createClass({
   render:function () {
       return (
           <div>Dashboard</div>
       )
   }
});

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={index}>
            <IndexRoute component={Dashboard} />
            <Route path="/hello/:name" component={haha}>
                <Route path="/hello/:name/home" component={home}/>
            </Route>
            <Route path="/app" name="app" component={app}/>
        </Route>
    </Router>
), document.getElementById('example'));