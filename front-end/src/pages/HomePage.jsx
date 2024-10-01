import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import CardMedia from '@mui/material/CardMedia';
import panda from '../assets/panda.png';
import gibbon from '../assets/gibbon.png';
import Button from '@mui/material/Button';
import { useInView } from 'react-intersection-observer';
import Copyright from '../components/Copyright.jsx';
import micdrop from '../assets/micdrop.gif';
import HeroBanner from '../components/HeroBanner.jsx';

export default function HomePage() {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [openGif, setOpenGif] = useState(false);

  const handleOpenGif = () => setOpenGif(true);
  const handleCloseGif = () => setOpenGif(false);

  return (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 0.6s ease',
        width: '100%',
        maxWidth: {
          xs: '100%',
          sm: '100%',
          md: '1700px',
          lg: '1900px',
          xl: '2100px',
        },
        mx: 'auto',
        px: 2,
        overflow: 'hidden',
      }}
    >
      <HeroBanner
        title="Welcome to the Decoy Challenge"
        subtitle="Compete, learn, and outsmart AI models in this exciting challenge."
        imageUrl="https://picsum.photos/1200/600?image=442"
        color="black"
      />
      {/* Text on Left, Image on Right */}
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ sm: 12, md: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, mt: 4 }}>
            Challenge Overview
          </Typography>

          <Typography
            variant="body1"
            fontSize={18}
            lineHeight={1.8}
            sx={{ mt: 2 }}
          >
            We are excited to introduce the{' '}
            <strong>
              Decoy Challenge: Deceptive Examples to Confuse and Outsmart an AI
            </strong>
            . This challenge is part of the{' '}
            <strong>CU Denver Data Science and AI Symposium.</strong>
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, mt: 4 }}>
            Example:
          </Typography>
          <Typography
            variant="body1"
            fontSize={18}
            lineHeight={1.8}
            sx={{ mt: 2 }}
          >
            <strong>Top</strong> picture clearly shows a <strong>Panda</strong>,
            right? A fancy Machine Learning Model{' '}
            <strong>incorrectly classified</strong> this <strong>Panda</strong>{' '}
            as a <strong>Gibbon</strong> with over{' '}
            <strong>99% confidence</strong>.
          </Typography>
          <Typography
            variant="body1"
            fontSize={18}
            lineHeight={1.6}
            sx={{ mt: 2 }}
          >
            For those who do not know, the <strong>bottom</strong> image is what
            an actual <strong>Gibbon</strong> looks like. See, not a{' '}
            <strong>Panda</strong>.{' '}
            <span
              onClick={handleOpenGif}
              role="button"
              aria-label="Show surprise GIF"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleOpenGif();
                }
              }}
              style={{
                color: 'blue',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '1em',
              }}
            >
              AI Tricked 
            </span>
          </Typography>
          <Typography
            variant="body1"
            fontSize={18}
            lineHeight={1.6}
            sx={{ mt: 2 }}
          >
            The <strong>challenge</strong> is simple, we give a{' '}
            <strong>pre-trained model</strong> and a set of images. Your job is
            to <strong>trick the model</strong>trick the model into making
            incorrect predictions. Trick the model, and win{' '}
            <strong>money</strong>.
          </Typography>
        </Grid>
        <Grid size={{ sm: 12, md: 6 }}>
          <Box
            sx={{
              my: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              height: '100%',
            }}
          >
            <CardMedia
              component="img"
              image={panda}
              alt="Panda image"
              sx={{
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                width: '100%',
                maxWidth: '500px',
                height: 'auto',
                objectFit: 'cover',
              }}
            />

            <CardMedia
              component="img"
              image={gibbon}
              alt="Gibbon image"
              sx={{
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                width: '100%',
                maxWidth: '300px',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              Introduction
            </Typography>
            <Typography variant="body1" fontSize={18} lineHeight={1.8}>
              This challenge invites <strong>all CU Denver students</strong> to
              dive into the intriguing world of{' '}
              <strong>adversarial machine learning</strong> by crafting
              adversarial examples that can deceive a robust machine learning
              classifier trained on the <strong>CIFAR-10 dataset</strong>. Your
              mission is to create subtle but effective modifications to a set
              of test images, fooling the classifier into making incorrect
              predictions. This challenge is a perfect opportunity for students
              to explore model vulnerabilities, gain hands-on experience with
              adversarial techniques, and contribute to ongoing research in AI
              robustness and security.
            </Typography>

            <Typography
              variant="body1"
              fontSize={18}
              lineHeight={1.8}
              sx={{ mt: 2 }}
            >
              The <strong>CIFAR-10 dataset</strong> is a well-known benchmark
              for image classification tasks, consisting of 10 classes such as
              airplanes, dogs, and ships. Although deep learning models have
              achieved impressive accuracy on this dataset, they remain
              vulnerable to <strong>adversarial examples</strong>—inputs that
              have been carefully manipulated to mislead models while appearing
              almost identical to the human eye.
            </Typography>

            <Typography
              variant="body1"
              fontSize={18}
              lineHeight={1.8}
              sx={{ mt: 2 }}
            >
              In the <strong>Decoy Challenge</strong>, CU Denver students will
              have the chance to exploit these vulnerabilities. You will be
              provided with a <strong>robust classifier</strong> trained on
              CIFAR-10 and a set of test images. Your task is to generate small
              perturbations to these test images that fool the classifier,
              forcing it to make incorrect predictions. By participating, you’ll
              be engaging in cutting-edge research that explores the limits of
              AI systems and helps to improve future defenses against
              adversarial attacks.
            </Typography>

            <Typography
              variant="body1"
              fontSize={18}
              lineHeight={1.8}
              sx={{ mt: 2 }}
            >
              This challenge offers a unique opportunity to apply theoretical
              knowledge in a practical setting, gain exposure to adversarial
              machine learning techniques, and contribute to building more
              robust AI systems that can better withstand adversarial attacks in
              real-world applications.
            </Typography>

            <Box sx={{ mt: 'auto', pt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ boxShadow: '0 3px 10px rgba(0,0,0,0.2)' }}
                href="https://forms.office.com/r/Xb3MZjTibT"
              >
                Join the Challenge
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              Prizes
            </Typography>
            <Typography variant="body1" fontSize={18} lineHeight={1.8}>
              <ul style={{ paddingLeft: '20px' }}>
                <li>
                  <strong>1st Place:</strong> $250
                </li>
                <li>
                  <strong>2nd Place:</strong> $150
                </li>
                <li>
                  <strong>3rd Place:</strong> $100
                </li>
                <li>
                  <strong>Top 10:</strong> Certificates of participation.
                  ​Winners will present their solutions at the CU Denver AI
                  Symposium on November 1st, 2024.
                </li>
              </ul>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              mt: 2,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              Key Dates
            </Typography>
            <Typography variant="body1" fontSize={18} lineHeight={1.8}>
              <ul style={{ paddingLeft: '20px' }}>
                <li>
                  <strong>Challenge Start:</strong> October 1st, 2024
                </li>
                <li>
                  <strong>Submission Deadline:</strong> October 29th, 2024,
                  11:59 PM (CET)
                </li>
                <li>
                  <strong>CU Denver Data Science and AI Symposium:</strong>{' '}
                  November 1st, 2024
                </li>
                <li>
                  <strong>Winners Notified:</strong> October 30th, 2024. Their
                  solutions will be presented during the symposium.
                </li>
              </ul>
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={openGif}
        onClose={handleCloseGif}
        aria-labelledby="gif-modal-title"
        aria-describedby="gif-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            outline: 'none',
            borderRadius: '8px',
            maxWidth: '90%',
            maxHeight: '90%',
            overflow: 'auto',
          }}
        >
          <Box sx={{ textAlign: 'right' }}>
            <Button onClick={handleCloseGif} variant="contained" size="small">
              Close
            </Button>
          </Box>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <img
              src={micdrop}
              alt="Surprise GIF"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
