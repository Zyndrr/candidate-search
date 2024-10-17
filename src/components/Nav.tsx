import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <Box
      sx={{
        display: "flex",
        gap: "20px",
        marginLeft: "20px",
      }}
    >
      <Link to="/" style={{ color: "#faf9ec" }}>
        Home
      </Link>
      <Link to="/SavedCandidates" style={{ color: "#faf9ec" }}>
        Potential Candidates
      </Link>
    </Box>
  );
};

export default Nav;
