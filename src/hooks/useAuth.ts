import Cookies from 'js-cookie';
import { accessTokenName } from '../utils/constants';

const useAuth = () => {
  return !!Cookies.get(accessTokenName);
};

export default useAuth;
