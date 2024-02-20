import { Box, Link, Tooltip } from "@chakra-ui/react";
import { MdOutlineRssFeed } from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
	return (
		<Tooltip
			hasArrow
			label={"Home"}
			placement='right'
			ml={1}
			openDelay={500}
			display={{ base: "block", md: "none" }}
		>
			<Link
				display={"flex"}
				to={"/"}
				as={RouterLink}
				alignItems={"center"}
				gap={4}
				_hover={{ bg: "whiteAlpha.400" }}
				borderRadius={6}
				p={2}
				w={{ base: 10, md: "full" }}
				justifyContent={{ base: "center", md: "flex-start" }}
			>
				<MdOutlineRssFeed   size={"30"} />
				<Box display={{ base: "none", md: "block" }}>Feed</Box>
			</Link>
		</Tooltip>
	);
};

export default Home;