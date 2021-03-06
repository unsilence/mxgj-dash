import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Users from "./routes/Users.js";
import Attributes from "./routes/Attributes";
import Countrys from "./routes/Countrys";
import Orders from "./routes/Orders.js";
import Categorys from "./routes/Categorys";
import Colors from "./routes/Color.js";
import Serials from "./routes/Serials";
import Brands from "./routes/Brands.js";
import Cases from "./routes/Cases.js";
import Tests from "./routes/Tests.js";
import Login from "./routes/login.js";
import * as Recommend from './routes/Recommends';
import * as CaseManages from './routes/CaseManages';
import * as HotProducts from './routes/HotProducts';
import * as NavManages from "./routes/NavManages"
import Spu from "./routes/Spu";
import Sku from "./routes/Sku";
import Stock from "./routes/Stock";
import * as Banner  from "./routes/Banners.js";
import HistoryBanners  from "./routes/HistoryBanners.js";


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/banners" component={Banner.banners} />
      <Route path="/historybanners" component={HistoryBanners} />
      <Route path="/casemanages" component={CaseManages.CaseManages} />
      <Route path="/casemanages/historyrecoms" component={CaseManages.CaseManagesHistory} />
      <Route path="/hotproducts" component={HotProducts.HotProducts} />
      <Route path="/hotproducts/historyrecoms" component={HotProducts.HotProductsHistory} />
      <Route path="/navmanages" component={NavManages.NavManage} />
      <Route path="/navmanages/historyrecoms" component={NavManages.NavProductsHistory} />
      <Route path="/brands" component={Brands} />
      <Route path="/cases" component={Cases} />
      <Route path="/tests" component={Tests} />
      <Route path="/users" component={Users} />
      <Route path="/attributes" component={Attributes} />
      <Route path="/countrys" component={Countrys} />
      <Route path="/spus" component={Spu} />
      <Route path="/skus" component={Sku} />
      <Route path="/stocks" component={Stock} />
      <Route path="/orders" component={Orders} />
      <Route path="/categorys" component={Categorys} />
      <Route path="/colors" component={Colors} />
      <Route path="/serials" component={Serials} />
      <Route path="/login" component={Login} />
      <Route path="/recoms" component={Recommend.Recommends} />
      <Route path="/recoms/historyrecoms" component={Recommend.RecommendsHistory} />
    </Router>
  );
}

export default RouterConfig;
