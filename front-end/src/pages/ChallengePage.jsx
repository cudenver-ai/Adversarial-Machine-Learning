import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { API_BASE_URL } from '../config.js';
import Grid from '@mui/material/Grid2';
import Chip from '@mui/material/Chip';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';

const cardData = [
  {
    img: 'https://picsum.photos/800/450?random=1',
    tag: 'Engineering',
    title: 'Revolutionizing software development with cutting-edge tools',
    description:
      'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
  },
  {
    img: 'https://picsum.photos/800/450?random=2',
    title: 'Innovative product features that drive success',
    description:
      'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality, learn why our product stands out.',
  },
  {
    img: 'https://picsum.photos/800/450?random=3',
    title: 'Objective',
    description:
    "The Decoy Challenge focuses on generating adversarial examples that can mislead a machine learning model trained on the CIFAR-10 dataset. Participants will receive a pre-trained, robust classifier and a set of test examples from the CIFAR-10 dataset. Your objective is to create subtle perturbations to these test examples that can fool the classifier while maintaining the images visual integrity.",
  },
  {
    img: 'https://picsum.photos/800/450?random=4',
    title: "Submission",
    description:
      "Participants are required to submit only the perturbed versions of the test images.The perturbed data must be submitted in a text file format as described in the provided starter code.Each submission should include:A text file containing the adversarial examples.Submit the code along with a README describing the method used to generate the adversarial examples.Visual examples comparing original and perturbed images are optional but recommended for clarity.The starter code provided will help you understand how to format your submission and implement various adversarial algorithms. ",
  },
  {
    img: 'https://picsum.photos/800/450?random=45',
    title: 'Rules',
    description: [
      "1) Rule 1",
      "2) Rule 2",
      "3) Rule 3",
      "4) Rule 4"
    ],
  },
  {
    img: 'https://picsum.photos/800/450?random=6',
    title: 'Dataset Description',
    description:
      'You will be provided with a pre-trained CIFAR-10 classifier and a test set of images.       You are free to use any tools or state-of-the-art adversarial attack algorithms (e.g., FGSM, PGD, C&W, etc.) to generate adversarial examples.       There are no specific constraints on perturbation magnitude—your goal is to successfully deceive the classifier, but subtle, effective attacks will likely score higher. ',
  },
];

const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  textOverflow: 'ellipsis',
});

export default function ChallengePage() {
  const [challengeData, setChallengeData] = useState(null);
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };


  useEffect(() => {
    fetch(`${API_BASE_URL}/api/challenge`)
      .then((response) => response.json())
      .then((data) => setChallengeData(data))
      .catch((error) => console.error('Error fetching challenge data:', error));
  }, []);

  if (!challengeData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
          maxWidth: { sm: '100%', md: '1700px' }
      }}
    >
        <Grid container spacing={2} columns={12}>


            <Grid item size={{ xs: 12, sm: 12, lg: 6 }} height={'100%'}>
                <SyledCard
                    sx={{
                        // width: '50%',
                        // maxWidth: '800px', // Set max width
                        padding: '16px',
                        boxShadow: 3,
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                    }}
                >
            <CardMedia
              component="img"
              alt="green iguana"
              image={cardData[0].img}
              sx={{
                height: { sm: 'auto', md: 'auto' },
                aspectRatio: { sm: '16 / 9', md: '' },
              }}
            />
                    <CardContent>
                        <Typography variant={'h4'} component={'h2'} align={'center'}>
                            Objective
                        </Typography>
                        <Typography variant={'body1'}  align={'center'}>
                            {challengeData.objective}
                        </Typography>
                    </CardContent>
                </SyledCard>
            </Grid>
      <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
          <SyledCard
                    sx={{
                      // width: '50%',
                      // maxWidth: '800px', // Set max width
                      padding: '16px',
                      boxShadow: 3,
                      borderRadius: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                  }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={cardData[1].img}
              sx={{
                height: { sm: 'auto', md: 'auto' },
                aspectRatio: { sm: '16 / 9', md: '' },
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {cardData[2].title}
              </Typography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {cardData[2].description}
              </StyledTypography>
            </CardContent>
          </SyledCard>


        </Grid>


        <Grid size={{ xs: 12, md: 4 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(2)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 2 ? 'Mui-focused' : ''}
            sx={{ height: '100%' }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={cardData[2].img}
              sx={{
                height: { sm: 'auto', md: '50%' },
                aspectRatio: { sm: '16 / 9', md: '' },
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                {cardData[2].tag}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {cardData[2].title}
              </Typography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {cardData[2].description}
              </StyledTypography>
            </SyledCardContent>
          </SyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}
          >
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(3)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 3 ? 'Mui-focused' : ''}
              sx={{ height: '100%' }}
            >
              <SyledCardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div>
                  <Typography gutterBottom variant="h6" component="div">
                    {cardData[3].title}
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {cardData[3].description}
                  </StyledTypography>
                </div>
              </SyledCardContent>
            </SyledCard>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(4)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 4 ? 'Mui-focused' : ''}
              sx={{ height: '100%' }}
            >
              <SyledCardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div>
                  <Typography gutterBottom variant="h6" component="div">
                    {cardData[4].title}
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                  {cardData[4].description.map((rule, index) => (
                                <Box key={index}>
                                    <Typography variant={'body2'}>{rule}</Typography>
                                </Box>
                            ))}
                  </StyledTypography>
                </div>
              </SyledCardContent>

            </SyledCard>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(5)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 5 ? 'Mui-focused' : ''}
            sx={{ height: '100%' }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={cardData[5].img}
              sx={{
                height: { sm: 'auto', md: '50%' },
                aspectRatio: { sm: '16 / 9', md: '' },
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="h6" component="div">
                {cardData[5].title}
              </Typography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {cardData[5].description}
              </StyledTypography>
            </SyledCardContent>
          </SyledCard>
        </Grid>
            
            

        </Grid>


    </Box>
  );
}