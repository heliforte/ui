// material-ui
import { Grid, List, ListItem, Stack, Typography, Divider, Box, Button, Chip, Collapse, Table } from "@mui/material";

// project import
import MainCard from "components/MainCard";
import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";
import RequestContext from "contexts/RequestContext";
import useRequest from "hooks/useRequest";
import dayjs from "dayjs";
import { UpOutlined, DownOutlined, EditOutlined } from "@ant-design/icons";

const RequestDetails = () => {
	const { findOneRequestById } = useRequest();

	const { requestDetails, setRequestDetails } = useContext(RequestContext);

	const [openOperations, setOpenOperations] = useState(false);
	const [openProducts, setOpenProducts] = useState(false);

	const { id } = useParams();

	const { id_request, landing_date, takeoff_date, status, created_at, user, type, rab, landing_site, products, services } = requestDetails;
	console.log(requestDetails);
	useEffect(() => {
		if (id) {
			findOneRequestById(id);
		}
	}, [id]);
	return (
		<>
			<Grid item xs={12}>
				<MainCard
					title="Detalhes da solicitação"
					secondary={
						<Chip
							color={status === "A" ? "primary" : status === "F" ? "success" : status === "P" ? "warning" : "error"}
							variant="filled"
							size="medium"
							label={status === "A" ? "Em aberto" : status === "P" ? "Pendente" : status === "F" ? "Finalizado" : "Rejeitado"}
							sx={{ fontWeight: "bold" }}
						/>
					}
				>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<List sx={{ py: 0 }}>
								<ListItem>
									<Grid container spacing={3}>
										<Grid item xs={12} md={6}>
											<Stack spacing={0.5}>
												<Typography color="secondary">Número da solicitação</Typography>
												<Typography>{`# ${id_request}`}</Typography>
											</Stack>
										</Grid>
									</Grid>
								</ListItem>
								<Divider />
								<ListItem>
									<Grid container spacing={3}>
										<Grid item xs={12} md={6}>
											<Stack spacing={0.5}>
												<Typography color="secondary">Aeródromo</Typography>
												<Typography>{landing_site}</Typography>
											</Stack>
										</Grid>
									</Grid>
								</ListItem>
								<Divider />
								<ListItem>
									<Grid container spacing={3}>
										<Grid item xs={12} md={6}>
											<Stack spacing={0.5}>
												<Typography color="secondary">RAB</Typography>
												<Typography>{rab}</Typography>
											</Stack>
										</Grid>
									</Grid>
								</ListItem>
								<Divider />
								<ListItem>
									<Grid container spacing={3}>
										<Grid item xs={12} md={6}>
											<Stack direction="row" alignItems="center" spacing={1}>
												<Stack spacing={0.5}>
													<Typography color="secondary">Data agendada para pouso</Typography>
													<Typography>{dayjs(landing_date).format("DD/MM/YYYY HH:mm")}</Typography>
												</Stack>
											</Stack>
										</Grid>
									</Grid>
								</ListItem>
								<Divider />
								<ListItem>
									<Grid container spacing={3}>
										<Grid item xs={12} md={6}>
											<Stack spacing={0.5}>
												<Typography color="secondary">Data agendada para decolagem</Typography>

												<Typography>{takeoff_date ? dayjs(takeoff_date).format("DD/MM/YYYY HH:mm") : "Não agendado"}</Typography>
											</Stack>
										</Grid>
									</Grid>
								</ListItem>
								<Divider />
								<ListItem>
									<Grid container spacing={3}>
										<Grid item xs={12} md={6}>
											<Stack spacing={0.5}>
												<Typography color="secondary">Solicitado por</Typography>
												<Typography>{user}</Typography>
											</Stack>
										</Grid>
									</Grid>
								</ListItem>
								<Divider />
								<ListItem>
									<Grid container spacing={3}>
										<Grid item xs={12} md={6}>
											<Stack spacing={0.5}>
												<Typography color="secondary">Aberta em</Typography>
												<Typography>{dayjs(created_at).format("DD/MM/YYYY HH:mm")}</Typography>
											</Stack>
										</Grid>
									</Grid>
								</ListItem>
								<Divider />
								{services && services.length > 0 && (
									<>
										<ListItem>
											<Grid container spacing={3} alignItems="center">
												<Grid item xs={6}>
													<Typography color="secondary">Serviços</Typography>
												</Grid>
												<Grid item xs={6} display="flex" justifyContent="flex-end">
													<Button type="secondary" onClick={() => setOpenOperations(!openOperations)} color="secondary">
														{openOperations ? <UpOutlined /> : <DownOutlined />}
													</Button>
												</Grid>
												<Grid item xs={12}>
													<Collapse in={openOperations}>
														<Box sx={{ padding: 0 }}>
															<Table>
																<List sx={{ padding: 0 }}>
																	{services.map((e) => (
																		<ListItem key={e.id_service}>{`${e.name} ${e.amount}L`}</ListItem>
																	))}
																</List>
															</Table>
														</Box>
													</Collapse>
												</Grid>
											</Grid>
										</ListItem>
										<Divider />
									</>
								)}
								{products && products.length > 0 && (
									<>
										<ListItem>
											<Grid container spacing={3} alignItems="center">
												<Grid item xs={6}>
													<Typography color="secondary">Produtos</Typography>
												</Grid>
												<Grid item xs={6} display="flex" justifyContent="flex-end">
													<Button type="secondary" onClick={() => setOpenProducts(!openProducts)} color="secondary">
														{openProducts ? <UpOutlined /> : <DownOutlined />}
													</Button>
												</Grid>
												<Grid item xs={12}>
													<Collapse in={openProducts}>
														<Box sx={{ padding: 0 }}>
															<Table>
																<List sx={{ padding: 0 }}>
																	{products.map((e) => (
																		<ListItem key={e.id_product}>{`${e.amount}x ${e.name}`}</ListItem>
																	))}
																</List>
															</Table>
														</Box>
													</Collapse>
												</Grid>
											</Grid>
										</ListItem>
										<Divider />
									</>
								)}
							</List>
							<Box sx={{ p: 2.5 }}>
								<Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ mt: 2.5 }}>
									<Button
										variant="outlined"
										color="error"
										onClick={() => {
											setRequestDetails({});
											window.history.back();
										}}
									>
										Voltar
									</Button>
								</Stack>
							</Box>
						</Grid>
					</Grid>
				</MainCard>
			</Grid>
		</>
	);
};

export default RequestDetails;
