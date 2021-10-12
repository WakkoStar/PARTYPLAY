import { useSelector } from 'react-redux';

/*
Custom Route compoenent to select path dynamically
*/
const Route = ({ path, children }) => {
  const history = useSelector(state => state.history.value);
  return history === path ? children : null;
};

export default Route;
