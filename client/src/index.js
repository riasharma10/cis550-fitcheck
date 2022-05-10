import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import GraphPage from './pages/Graphs';
import ProductInfoPage from './pages/ProductInfoPage';
import ProductSuggestionsPage from './pages/ProductSuggestionsPage';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact
							path="/"
							render={() => (
								<HomePage />
							)}/>
		<Route exact
							path="/product_info"
							render={() => (
								<ProductInfoPage />
							)}/>
        <Route exact
							path="/clothing_suggest"
							render={() => (
								<ProductSuggestionsPage />
							)}/>
		<Route exact
							path="/graph_page"
							render={() => (
								<GraphPage />
							)}/>					
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

