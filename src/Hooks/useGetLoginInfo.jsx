import { useSelector } from 'react-redux';
import { selectAuthState } from '../redux/slice/authSlice';

export default function useGetLoginInfo() {
  const { loginInfo, userInfo } = useSelector(selectAuthState);
  return { ...loginInfo, ...userInfo };
}
