import { useState } from "react";
import { Box, Button, FormControl, OutlinedInput, useTheme } from "@mui/material";
import { SearchOutlined, CloseCircleOutlined } from "@ant-design/icons";

const SearchUserByAdmin = ({ setSearch }) => {
	const [inputValue, setInputValue] = useState("");
	const [hover, setHover] = useState(false);

	const theme = useTheme();

	const handleChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleClick = (event) => {
		event.preventDefault();
		const searchValue = inputValue.trim();
		if (searchValue.length > 3 || searchValue.length === 0) {
			setSearch(searchValue);
		}
	};

	return (
		<Box sx={{ width: "100%", mb: 1 }}>
			<FormControl component="form" onSubmit={handleClick} sx={{ display: "flex", flexDirection: "row", gap: 1, width: "100%" }}>
				<OutlinedInput
					size="small"
					id="header-search"
					fullWidth
					endAdornment={
						<CloseCircleOutlined
							style={{
								cursor: "pointer",
								fontSize: 15,
								color: hover ? theme.palette.error.main : "inherit",
							}}
							onClick={() => {
								setSearch("");
								setInputValue("");
							}}
							onMouseEnter={() => setHover(true)}
							onMouseLeave={() => setHover(false)}
						/>
					}
					aria-describedby="header-search-text"
					placeholder="Pesquisar usuário por nome, email ou registro de piloto..."
					value={inputValue}
					onChange={handleChange}
					sx={{ height: 40, paddingY: 0 }}
				/>
				<Button variant="contained" type="submit" sx={{ height: 40 }}>
					<SearchOutlined style={{ fontSize: 18 }} />
				</Button>
			</FormControl>
		</Box>
	);
};

export default SearchUserByAdmin;
