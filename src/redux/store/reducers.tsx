import { combineReducers  } from 'redux';
import { connectRouter } from 'connected-react-router';
import Settings from "../settings/reducers";
import Common from "../common/reducers";
import Auth from "../auth/reducers";
import Players from "../players/reducers"
import Collections from '../collections/reducers'
import Battles from 'redux/battles/reducers';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth: Auth,
  players:Players,
  collections:Collections,
  battles:Battles,
  settings: Settings,
  common: Common,
});

export default rootReducer as any;
