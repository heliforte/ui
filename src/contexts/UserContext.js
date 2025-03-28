import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({});
	const [searchUser, setSearchUser] = useState([]);
	const [users, setUsers] = useState([]);
	const [totalUser, setTotalUser] = useState(0);
	const [usersResp, setUsersResp] = useState([]);

	const resetUserStates = () => {
		setUser({});
		setSearchUser([]);
		setUsers([]);
		setTotalUser(0);
		setUsersResp([]);
	};

	return (
		<UserContext.Provider value={{ user, setUser, searchUser, setSearchUser, users, setUsers, totalUser, setTotalUser, usersResp, setUsersResp, resetUserStates }}>{children}</UserContext.Provider>
	);
};

UserProvider.propTypes = {
	children: PropTypes.node,
};

export default UserContext;
