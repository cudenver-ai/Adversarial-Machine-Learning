import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import StarIcon from '@mui/icons-material/Star';
import GradeIcon from '@mui/icons-material/Grade';
import { API_BASE_URL } from '../config.js';

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/topTen`)
      .then((response) => response.json())
      .then((data) => setLeaderboardData(data))
      .catch((error) => console.error('Error fetching topTen:', error));
  }, []);

  const getRankIcon = (rank) => {
    if (rank === 1) {
      return <EmojiEventsIcon sx={{ color: 'gold' }} />;
    } else if (rank === 2) {
      return <MilitaryTechIcon sx={{ color: 'silver' }} />;
    } else if (rank === 3) {
      return <MilitaryTechIcon sx={{ color: 'bronze' }} />;
    } else if (rank === 4) {
      return <StarIcon sx={{ color: 'purple' }} />;
    } else if (rank === 5) {
      return <GradeIcon sx={{ color: 'blue' }} />;
    }else if (rank === 6) {
      return <GradeIcon sx={{ color: 'blue' }} />;
    }else if (rank === 7) {
      return <GradeIcon sx={{ color: 'blue' }} />;
    }else if (rank === 8) {
      return <GradeIcon sx={{ color: 'blue' }} />;
    }else if (rank === 9) {
      return <GradeIcon sx={{ color: 'blue' }} />;
    }else if (rank === 10) {
      return <GradeIcon sx={{ color: 'blue' }} />;
    }
    return null;
  };

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle" gutterBottom>
          Top 10
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Team</TableCell>
                <TableCell align="right">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboardData.map((row) => (
                <TableRow key={row.rank}>
                  <TableCell component="th" scope="row">
                    {getRankIcon(row.rank)} {row.rank}
                  </TableCell>
                  <TableCell>{row.team}</TableCell>
                  <TableCell align="right">{row.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
