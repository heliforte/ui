import { useMemo } from "react";

// material-ui
import { Box, useMediaQuery } from "@mui/material";

// project import
import Search from "./Search";
import Message from "./Message";
import Profile from "./Profile";
import Localization from "./Localization";
import Notification from "./Notification";
import Customization from "./Customization";
import MobileSection from "./MobileSection";
import MegaMenuSection from "./MegaMenuSection";

import { MenuOrientation } from "config";
import useConfig from "hooks/useConfig";
import DrawerHeader from "layout/MainLayout/Drawer/DrawerHeader";

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
	const { i18n, menuOrientation } = useConfig();

	const downLG = useMediaQuery((theme) => theme.breakpoints.down("lg"));

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const localization = useMemo(() => <Localization />, [i18n]);

	const megaMenu = useMemo(() => <MegaMenuSection />, []);

	return (
		<>
			<Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
				{/* Esquerda */}
				{menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
				{downLG && <Box sx={{ flexGrow: 1 }} />}

				{/* Direita */}
				<Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
					<Notification />
					{!downLG && <Profile />}
					{downLG && <MobileSection />}
				</Box>
			</Box>
		</>
	);
};

export default HeaderContent;
