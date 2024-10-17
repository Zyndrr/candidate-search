import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Candidate } from "../interfaces/Candidate.interface";
import { Alert, IconButton, styled } from "@mui/material";
import { Check, Remove } from "@mui/icons-material";
import { useEffect } from "react";

const StyledTableCell = styled(TableCell)(() => ({
  color: "white",
}));

export default function SavedCandidates() {
  const [candidates, setCandidates] = React.useState([] as Candidate[]);
  useEffect(() => {
    const fetchData = async () => {
      const candidateData = JSON.parse(
        localStorage.getItem("savedCandidates") || "[]"
      );
      setCandidates(candidateData);
    };
    fetchData();
  }, []);

  const rejectCandidate = (candidate: Candidate) => {
    const savedCandidates = JSON.parse(
      localStorage.getItem("savedCandidates") || "[]"
    );
    const updatedCandidates = savedCandidates.filter(
      (c: Candidate) => c.id !== candidate.id
    );
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
    setCandidates(updatedCandidates);
  };
  return (
    <TableContainer component={Paper}>
      {candidates.length > 0 ? (
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ color: "white" }}>Image</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }} align="right">
                Name
              </StyledTableCell>
              <StyledTableCell sx={{ color: "white" }} align="right">
                Location
              </StyledTableCell>
              <StyledTableCell sx={{ color: "white" }} align="right">
                Email
              </StyledTableCell>
              <StyledTableCell sx={{ color: "white" }} align="right">
                Company
              </StyledTableCell>
              <StyledTableCell sx={{ color: "white" }} align="right">
                Bio
              </StyledTableCell>
              <StyledTableCell sx={{ color: "white" }} align="right">
                Reject
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow
                key={candidate.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  <img
                    width={"50px"}
                    src={candidate.avatar_url}
                    alt={candidate.name}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  {candidate.name
                    ? `${candidate.name} (${candidate.login})`
                    : "N/A"}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {candidate.location || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {candidate.email || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {candidate.company || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {candidate.bio || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {" "}
                  <IconButton
                    onClick={() => {
                      rejectCandidate(candidate);
                    }}
                  >
                    <Remove sx={{ color: "white" }} fontSize="inherit" />
                  </IconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Alert icon={<Check fontSize="inherit" />} severity="error">
          No candidates have been accepted
        </Alert>
      )}
    </TableContainer>
  );
}
