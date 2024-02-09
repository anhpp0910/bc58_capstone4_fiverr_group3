import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function Wrapper({ children }) {
    let user = useSelector((state) => state.userSlice.user);

    return user ? children : (window.location.href = '/');
}

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Wrapper;
