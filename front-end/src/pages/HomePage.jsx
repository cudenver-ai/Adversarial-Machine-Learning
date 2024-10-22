import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import CardMedia from '@mui/material/CardMedia';
import panda from '../assets/panda.png';
import gibbon from '../assets/gibbon.png';
import Button from '@mui/material/Button';
import { useInView } from 'react-intersection-observer';
import HeroBanner from '../components/HeroBanner.jsx';

export default function HomePage() {
  const { ref, inView } = useInView({ triggerOnce: true });

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
        subtitle="Compete, Learn, and Outsmart AI Models in this Exciting Challenge!"
        imageUrl="https://picsum.photos/1200/600?image=998"
        color="White"
      />
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ sm: 12, md: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
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
          <Typography
            variant="body1"
            fontSize={18}
            lineHeight={1.6}
            sx={{ mt: 2 }}
          >
            The challenge is simple, we give a{' '}
            <strong>pre-trained model</strong> and a set of images. Your job is
            to trick the model into making incorrect predictions. Trick the
            model, and win a <strong>prize!</strong>.
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, mt: 2 }}>
            Example:
          </Typography>
          <Typography
            variant="body1"
            fontSize={18}
            lineHeight={1.8}
            sx={{ mt: 2 }}
          >
            In this example, we see a demonstration of how subtle changes to an
            image can dramatically affect how a machine learning model
            classifies it. On the left, we have an image of a panda that the
            model correctly classifies with 57.7% confidence. However, by adding
            a small amount of adversarial noise, almost imperceptible to the
            human eye, this image is transformed. This noise is carefully
            designed using a technique called gradient-based adversarial
            attacks. The resulting image on the right is almost identical to the
            original for us, but the model is now confidently misclassifying the
            panda as a gibbon with 99.3% confidence. For those who do not know,
            the bottom image is what an actual <strong>Gibbon</strong> looks
            like. Very different from a Panda.{' '}
          </Typography>
        </Grid>

        <Grid size={{ sm: 12, md: 6 }}>
          <Box
            sx={{
              my: 15,
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
                maxWidth: '400px',
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
              This challenge invites{' '}
              <strong>all Auraria Campus students</strong> to dive into the
              intriguing world of <strong>adversarial machine learning</strong>{' '}
              by crafting adversarial examples that can deceive a robust machine
              learning classifier trained on the{' '}
              <strong>CIFAR-10 dataset</strong>. Your mission is to create
              subtle but effective modifications to a set of test images,
              fooling the classifier into making incorrect predictions. This
              challenge is a perfect opportunity for students to explore model
              vulnerabilities, gain hands-on experience with adversarial
              techniques, and contribute to ongoing research in AI robustness
              and security.
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
              In the <strong>Decoy Challenge</strong>, students will have the
              chance to exploit these vulnerabilities. You will be provided with
              a <strong>robust classifier</strong> trained on CIFAR-10 and a set
              of test images. Your task is to generate small perturbations to
              these test images that fool the classifier, forcing it to make
              incorrect predictions. By participating, you’ll be engaging in
              cutting-edge research that explores the limits of AI systems and
              helps to improve future defenses against adversarial attacks.
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
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
                  fontSize: '1.2rem',
                }}
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
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
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
                </li>
                <li>
                  Top 3 teams will present their solutions at the CU Denver AI
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
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Key Dates
            </Typography>
            <Typography variant="body1" fontSize={18} lineHeight={1.8}>
              <ul style={{ paddingLeft: '20px' }}>
                <li>
                  <strong>Challenge Start:</strong> October 1st, 2024
                </li>
                <li>
                  <strong>Submission Deadline:</strong> October 30th, 2024,
                  11:59 PM
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
    </Box>
  );
}
