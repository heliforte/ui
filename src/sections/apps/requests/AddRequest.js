import PropTypes from "prop-types";
import { useContext, useEffect } from "react";

// material-ui
import { Box, Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, InputLabel, Stack, TextField, Typography, Autocomplete } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers";

// third-party.png
import _ from "lodash";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";

import { dispatch } from "store";
import { openSnackbar } from "store/reducers/snackbar";

// assets
import LandingSiteContext from "contexts/LandingSiteContext";
import useLandingSite from "hooks/useLandingSite";
import useRequest from "hooks/useRequest";

// constant
const getInitialValues = (aircraft) => {
	const newRequest = {
		id_aircraft: aircraft.id_aircraft,
		id_landing_site: "",
		amount: "",
		schedule_date: "",
		rab: aircraft.rab,
		category: aircraft.category,
		image: aircraft.image,
	};

	return newRequest;
};

// ==============================|| CUSTOMER ADD / EDIT / DELETE ||============================== //

const AddRequest = ({ aircraft, handleAddRequest }) => {
	const { createRequest } = useRequest();

	const { searchAllLandingSites } = useLandingSite();

	const { searchLandingSites } = useContext(LandingSiteContext);

	useEffect(() => {
		searchAllLandingSites();
	}, []);

	const RequestSchema = Yup.object().shape({
		id_aircraft: Yup.number(),
		id_landing_site: Yup.number(),
		amount: Yup.number().min(1, "Número de passageiros tem que ser maior que 0").required("Número de passageiros é obrigatório"),
		schedule_date: Yup.date().required("Data e hora previstos é obrigatório"),
	});

	//TODO: Pergunta se vai querer agendar a decolagem. Se sim, mostrar outro input de data
	//TODO: Necessidade de abastecimento? (Sim/Não). Se sim, mostrar um input de number para digitar a quantidade de litros
	const formik = useFormik({
		initialValues: getInitialValues(aircraft),
		validationSchema: RequestSchema,
		onSubmit: async (values, { setSubmitting, setErrors, setStatus }) => {
			const { id_aircraft, id_landing_site, amount, schedule_date } = values;
			try {
				const newRequest = {
					aircraftId: id_aircraft,
					landingSiteId: id_landing_site,
					amount: amount,
					schedule_date: schedule_date,
				};
				console.log(newRequest);
				const response = await createRequest(newRequest);
				if (response) {
					dispatch(
						openSnackbar({
							open: true,
							message: response.message,
							variant: "alert",
							alert: {
								color: "success",
							},
							close: false,
						})
					);
					setStatus({ success: true });
					setSubmitting(false);
					handleAddRequest();
				}
			} catch (error) {
				console.error(error);
			}
		},
	});

	const { errors, touched, handleSubmit, isSubmitting, getFieldProps, values } = formik;

	return (
		<>
			<FormikProvider value={formik}>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
						<DialogTitle>Solicitar pouso</DialogTitle>
						<Divider />
						<DialogContent sx={{ p: 2.5 }}>
							<Grid container spacing={3}>
								<Grid item xs={12} md={3} sx={{ alignItems: "center", display: "flex", flexDirection: "column", gap: 2 }}>
									<Box
										sx={{
											width: "144px",
											height: "144px",
											borderRadius: "50%",
											overflow: "hidden",
											border: "2px solid #ccc",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											backgroundColor: "#f0f0f0",
										}}
									>
										<img
											src={`data:image/jpeg;base64,${values.image}`}
											alt="Helicopter"
											style={{
												width: "100%",
												height: "100%",
												objectFit: "fill",
											}}
										/>
									</Box>

									<Typography>{values.rab}</Typography>
									<Typography>Categoria {values.category}</Typography>
								</Grid>
								<Grid item xs={12} md={8}>
									<Grid container spacing={3}>
										<Grid item xs={12}>
											<Stack spacing={1.25}>
												<InputLabel htmlFor="Aeródromo">Aeródromo</InputLabel>
												<Autocomplete
													options={searchLandingSites}
													getOptionLabel={(option) => option.label}
													isOptionEqualToValue={(option, value) => option.value === value.value}
													renderInput={(params) => <TextField {...params} />}
													onChange={(event, value) => formik.setFieldValue("id_landing_site", value.value)}
												/>
											</Stack>
										</Grid>
										<Grid item xs={12}>
											<Stack spacing={1.25}>
												<InputLabel>Previsão de chegada</InputLabel>
												<DateTimePicker
													value={formik.values.schedule_date}
													onChange={(date) => formik.setFieldValue("schedule_date", date)}
													format="dd/MM/yyyy HH:mm"
													slotProps={{
														textField: {
															error: Boolean(formik.touched.schedule_date && formik.errors.schedule_date),
															helperText: formik.touched.schedule_date && formik.errors.schedule_date,
														},
													}}
												/>
											</Stack>
										</Grid>
										<Grid item xs={12}>
											<Stack spacing={1.25}>
												<InputLabel htmlFor="Número de passageiros">Número de passageiros</InputLabel>
												<TextField
													fullWidth
													id="amount"
													type="number"
													placeholder="Quantidade de passageiros..."
													{...getFieldProps("amount")}
													error={Boolean(touched.amount && errors.amount)}
													helperText={touched.amount && errors.amount}
													inputProps={{ min: 0 }}
												/>
											</Stack>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</DialogContent>
						<Divider />
						<DialogActions sx={{ p: 2.5 }}>
							<Grid container justifyContent="flex-end" alignItems="center">
								<Grid item>
									<Stack direction="row" spacing={2} alignItems="center">
										<Button color="error" onClick={handleAddRequest}>
											Fechar
										</Button>
										<Button type="submit" variant="contained" disabled={isSubmitting}>
											Agendar
										</Button>
									</Stack>
								</Grid>
							</Grid>
						</DialogActions>
					</Form>
				</LocalizationProvider>
			</FormikProvider>
		</>
	);
};

AddRequest.propTypes = {
	aircraft: PropTypes.any,
	onCancel: PropTypes.func,
};

export default AddRequest;
