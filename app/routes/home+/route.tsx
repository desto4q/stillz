import { Outlet } from "react-router";
import NavBar from "~/components/NavBar";

function route() {
	return (
		<>
			<NavBar />
            <Outlet/>
		</>
	);
}

export default route;
