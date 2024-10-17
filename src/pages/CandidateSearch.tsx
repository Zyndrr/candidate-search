import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface";
import {
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Add, Check, Remove } from "@mui/icons-material";

const addCandidate = (candidate: Candidate) => {
  const savedCandidates = JSON.parse(
    localStorage.getItem("savedCandidates") || "[]"
  );
  const updatedCandidates = [...savedCandidates, candidate];
  localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
};

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState([] as Candidate[]);
  const [loading, setLoading] = useState(true);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [selectedCandidate, setSelectedCandidate] = useState({} as Candidate);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const data = await searchGithub();
      setCandidates(data);
      const candidateData = await searchGithubUser(data[0].login);
      setCandidateIndex(0);
      setSelectedCandidate(candidateData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const advanceCandidate = () => {
    const newIndex = candidateIndex + 1;
    if (newIndex >= candidates.length) {
      setError("No more candidates to show");
      return;
    }
    setCandidateIndex(newIndex);
    setSelectedCandidate(candidates[newIndex]);
  };
  return (
    <div>
      <Typography variant="h1">Candidate Search</Typography>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#faf9ec",
          }}
        >
          {!error ? (
            <Card
              variant="outlined"
              sx={{ width: "50%", backgroundColor: "#faf9ec" }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <CardMedia
                  component="img"
                  height="100px"
                  sx={{ width: "100px" }}
                  image={`${selectedCandidate.avatar_url}`}
                />
                <Typography>
                  {selectedCandidate.name
                    ? selectedCandidate.name
                    : "Name Not Provided"}{" "}
                  ( {selectedCandidate.login} )
                </Typography>
                <Typography>
                  Location:{" "}
                  {selectedCandidate.location
                    ? selectedCandidate.location
                    : "Location not provided"}
                </Typography>
                <Typography>
                  Email:{" "}
                  {selectedCandidate.email
                    ? selectedCandidate.email
                    : "Email not provided"}
                </Typography>
                <Typography>
                  Company:{" "}
                  {selectedCandidate.company
                    ? selectedCandidate.company
                    : "Company not provided"}
                </Typography>
                <Typography>
                  Bio:{" "}
                  {selectedCandidate.bio
                    ? selectedCandidate.bio
                    : "Bio not provided"}
                </Typography>
              </CardContent>
              <CardActions
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <IconButton
                  onClick={() => {
                    advanceCandidate();
                  }}
                >
                  <Remove fontSize="inherit" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    addCandidate(selectedCandidate);
                    advanceCandidate();
                  }}
                >
                  <Add fontSize="inherit" />
                </IconButton>
              </CardActions>
            </Card>
          ) : (
            <Alert icon={<Check fontSize="inherit" />} severity="success">
              {error}
            </Alert>
          )}
        </Box>
      )}
    </div>
  );
};

export default CandidateSearch;
