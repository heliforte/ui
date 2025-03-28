import PropTypes from "prop-types";
import { useContext } from "react";
// material-ui
import { Button, DialogActions, DialogTitle, Divider, Grid, Stack } from "@mui/material";

// third-party.png
import AddLinkUserAircraftTable from "sections/tables/aircrafts/AddLinkUserAircraft";
import AircraftContext from "contexts/AircraftContext";
import UserContext from "contexts/UserContext";

// ==============================|| CUSTOMER ADD / EDIT / DELETE ||============================== //

const AddLinkUserAircraft = ({ setOpen }) => {
	const { setUserAircraftLink } = useContext(AircraftContext);
	const { setSearchUser } = useContext(UserContext);

	return (
		<>
			<DialogTitle>Adicionar vínculo</DialogTitle>
			<Divider />
			<Grid>
				<AddLinkUserAircraftTable />
			</Grid>
			<Divider />
			<DialogActions sx={{ p: 2.5 }}>
				<Grid container justifyContent="flex-end" alignItems="center">
					<Grid item>
						<Stack direction="row" spacing={2} alignItems="center">
							<Button
								color="error"
								onClick={() => {
									setOpen(false);
									setUserAircraftLink("");
									setSearchUser([]);
								}}
							>
								Fechar
							</Button>
						</Stack>
					</Grid>
				</Grid>
			</DialogActions>
		</>
	);
};

AddLinkUserAircraft.propTypes = {
	helicopter: PropTypes.any,
	onCancel: PropTypes.func,
};

export default AddLinkUserAircraft;
