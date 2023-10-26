import PropTypes from "prop-types";

const Alert = ({ children }) => {
	Alert.propTypes = {
		children: PropTypes.node,
	};
	return <div className="alert alert-primary">{children}</div>;
};

export default Alert;
