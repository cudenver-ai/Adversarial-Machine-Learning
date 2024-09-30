import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import { useInView } from 'react-intersection-observer';
import HeroBanner from '../components/HeroBanner.jsx';
import MarkdownLatex from '../components/Formula.jsx';

export default function ProblemPage() {
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
        title="Understanding the Challenge"
        subtitle="Description, rules, evaluation, and more."
        imageUrl="https://picsum.photos/1200/600?image=190"
        color="white"
      />
      {/* Text on Left, Image on Right */}
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              The Challenge
            </Typography>
            <Typography variant="body1" fontSize={18} lineHeight={1.8}>
              The <strong>Decoy Challenge</strong> focuses on generating
              adversarial examples that can mislead a machine learning model
              trained on the CIFAR-10 dataset. Participants will receive a
              pre-trained, <strong>robust classifier</strong> and a set of test
              examples from the CIFAR-10 dataset. Your objective is to create
              subtle perturbations to these test examples that can fool the
              classifier while maintaining the images' visual integrity.
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, mt: 4 }}>
              Types of Perturbations
            </Typography>
            <Typography variant="body1" fontSize={18} lineHeight={1.8}>
              The adversarial examples you generate should be crafted using
              small, imperceptible perturbations to the test images. These
              perturbations should not significantly change the visual
              appearance of the images but must be sufficient to cause the
              classifier to misclassify them.
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 4 }}>
              Objective
            </Typography>
            <Typography variant="body1" fontSize={18} lineHeight={1.8}>
              <ul style={{ paddingLeft: '20px' }}>
                <li>
                  Your goal is to{' '}
                  <strong>maximize the classifier’s error rate</strong> by
                  making slight modifications to the provided test images.
                </li>
                <li>
                  The challenge will test how effectively you can deceive a
                  robust classifier while keeping the perturbations small and
                  unnoticeable to the human eye.
                </li>
              </ul>
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 2 }}>
              Specific Tasks:
            </Typography>
            <Typography variant="body1" fontSize={18} lineHeight={1.8}>
              <ol style={{ paddingLeft: '20px' }}>
                <li>
                  <strong>
                    Adversarial Example Generation [Classification, Deception]
                  </strong>
                  :
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                    <li>
                      Participants will receive a set of CIFAR-10 test images
                      and a pre-trained robust classifier.
                    </li>
                    <li>
                      The task is to modify these test images so that the
                      classifier makes incorrect predictions on as many images
                      as possible.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Perturbation Constraints</strong>:
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                    <li>
                      The perturbations should be small in magnitude, ensuring
                      the modified images remain visually similar to the
                      originals.
                    </li>
                    <li>
                      Participants will be evaluated on their ability to create{' '}
                      <strong>efficient adversarial examples</strong>—those that
                      confuse the classifier with minimal visible changes to the
                      input images.
                    </li>
                  </ul>
                </li>
              </ol>
            </Typography>

            <Typography
              variant="body1"
              fontSize={18}
              lineHeight={1.8}
              sx={{ mt: 2, mb: 2 }}
            >
              By taking on the <strong>Decoy Challenge</strong>, you will not
              only test your skills in adversarial machine learning but also
              contribute to the ongoing research aimed at creating more
              resilient AI models. Join us in advancing the understanding of
              adversarial techniques and their impact on machine learning!
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              Rules and Evaluation
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              Rules
            </Typography>

            <Typography variant="body1" fontSize={18} lineHeight={1.8}>
              To participate in the{' '}
              <strong>
                Decoy Challenge: Deceptive Examples to Confuse and Outsmart Your
                AI
              </strong>
              , all CU Denver students must follow these guidelines to ensure a
              fair and streamlined competition:
            </Typography>

            <Typography variant="body1" fontSize={18} lineHeight={1.8}>
              <ol style={{ paddingLeft: '20px' }}>
                <li>
                  <strong>Dataset and Classifier:</strong>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                    <li>
                      You will be provided with a{' '}
                      <strong>pre-trained CIFAR-10 classifier</strong> and a{' '}
                      <strong>test set</strong> of images.
                    </li>
                    <li>
                      You are free to use <strong>any tools</strong> or{' '}
                      <strong>
                        state-of-the-art adversarial attack algorithms
                      </strong>{' '}
                      (e.g., FGSM, PGD, C&W, etc.) to generate adversarial
                      examples.
                    </li>
                    <li>
                      There are{' '}
                      <strong>
                        no specific constraints on perturbation magnitude
                      </strong>
                      —your goal is to successfully deceive the classifier, but
                      subtle, effective attacks will likely score higher.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>Submission:</strong>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                    <li>
                      Participants are required to submit only the{' '}
                      <strong>perturbed versions of the test images</strong>.
                    </li>
                    <li>
                      The perturbed data must be submitted in a{' '}
                      <strong>pickle file format</strong> as described in the
                      provided starter code.
                    </li>
                    <li>
                      Each submission should include:
                      <ul
                        style={{ paddingLeft: '20px', listStyleType: 'circle' }}
                      >
                        <li>
                          A <strong>pickle file (.pkl)</strong> containing the
                          adversarial examples.
                        </li>
                      </ul>
                    </li>
                    <li>
                      The <strong>starter code</strong> provided will help you
                      understand how to format your submission and implement
                      various adversarial algorithms.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>Evaluation Time Limits:</strong>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                    <li>
                      Your adversarial examples should be generated within a{' '}
                      <strong>reasonable time frame</strong> using standard
                      tools and techniques.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>Ethics:</strong>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                    <li>
                      All participants must ensure their submissions adhere to
                      ethical standards. Any inappropriate content will result
                      in disqualification.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>Final Submission:</strong>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                    <li>
                      The final submission deadline is{' '}
                      <strong>October 29th, 2024</strong>. Late submissions will
                      not be accepted.
                    </li>
                  </ul>
                </li>
              </ol>
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, mt: 4 }}>
              Evaluation
            </Typography>

            <Typography variant="body1" fontSize={18} lineHeight={1.8}>
              Your submission will be evaluated based on a{' '}
              <strong>multi-faceted scoring system</strong> that balances
              adversarial effectiveness, model confidence, the degree of
              perturbation, and perceptual similarity.
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, mt: 4 }}>
              Explanation of Metrics:
            </Typography>
            <Typography variant="h7">
              The following formula defines the scoring system:
            </Typography>
            <MarkdownLatex />
            <Typography variant="body1" fontSize={18} lineHeight={1.8}>
              <ol style={{ paddingLeft: '20px' }}>
                <li>
                  <strong>
                    Incorrect Classification Ratio (incorrect_ratio):
                  </strong>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                    <li>
                      The proportion of adversarial examples that cause the
                      classifier to make <strong>incorrect predictions</strong>.
                    </li>
                    <li>
                      A higher incorrect ratio means a more successful attack.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>
                    Confidence on Incorrect Predictions
                    (avg_confidence_incorrect):
                  </strong>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                    <li>
                      Measures the classifier’s <strong>confidence</strong> in
                      the incorrect predictions made after the adversarial
                      perturbations.
                    </li>
                    <li>
                      Higher confidence in incorrect predictions will improve
                      your score.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>Confidence Gap (avg_confidence_gap):</strong>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                    <li>
                      Compares the <strong>confidence drop</strong> between the
                      correct prediction (before perturbation) and the incorrect
                      prediction (after perturbation).
                    </li>
                    <li>
                      A higher confidence gap indicates a more significant
                      attack impact.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>
                    Perturbation Magnitude (L2 norm) (avg_l2_perturbation):
                  </strong>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                    <li>
                      Quantifies the <strong>average size</strong> of the
                      perturbation. Lower perturbations are generally preferred.
                    </li>
                    <li>
                      This is normalized by the maximum possible perturbation to
                      ensure fairness across different approaches.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>Perceptual Similarity (SSIM) (avg_ssim):</strong>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                    <li>
                      Evaluates how visually similar the perturbed images are to
                      the original ones.
                    </li>
                    <li>
                      Lower SSIM values (closer to 0) indicate a more successful
                      attack since it implies that the perturbation was
                      perceptually subtle yet effective.
                    </li>
                  </ul>
                </li>
              </ol>
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              Participation
            </Typography>
            <Typography variant="body1" fontSize={18} lineHeight={1.8}>
              The Decoy Challenge is open to all CU Denver students across
              disciplines, interested in data science, Artificial Intelligence,
              and related fields. Whether you’re a beginner or an advanced
              student, this challenge allows you to explore adversarial machine
              learning in a practical setting.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, mt: 4 }}>
              How to Participate:
            </Typography>
            <Typography variant="body1" fontSize={18} lineHeight={1.8}>
              <ul style={{ paddingLeft: '20px' }}>
                <li>
                  Register for the challenge through the AI Student Association.
                </li>
                <li>Download the provided test set and classifier.</li>
                <li>
                  Use any tools or algorithms to generate adversarial examples
                  and submit your perturbed data in the format specified by the
                  starter code.
                </li>
              </ul>
            </Typography>

            <Typography variant="body1" fontSize={18} lineHeight={1.8}>
              You can participate individually or in teams (up to 4 members).
              This is your opportunity to test your skills, learn new
              techniques, and compete with fellow students in advancing
              adversarial machine learning.
            </Typography>

            <Typography
              variant="body1"
              fontSize={18}
              lineHeight={1.8}
              sx={{ fontWeight: 'bold', mt: 2 }}
            >
              Good luck, and let’s see who can outsmart AI!
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, mt: 4 }}>
              Prize
            </Typography>
            <Typography variant="body1" fontSize={18} lineHeight={1.8}>
              The Decoy Challenge: Deceptive Examples to Confuse and Outsmart
              Your AI offers exciting opportunities for CU Denver students to
              showcase their skills in adversarial machine learning. The
              top-performing teams will not only receive monetary rewards but
              will also have the prestigious opportunity to present their work
              at the CU Denver Data Science and AI Symposium on November 1st,
              2024.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, mt: 4 }}>
              Prizes for the Top 3 Teams:
            </Typography>
            <Typography variant="body1" fontSize={18} lineHeight={1.8}>
              <ul style={{ paddingLeft: '20px' }}>
                <li>
                  <strong>1st Place:</strong>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                    <li>
                      <strong>Monetary Prize:</strong> Awarded to the team with
                      the highest overall score in the challenge.
                    </li>
                    <li>
                      <strong>Presentation Opportunity:</strong> The first-place
                      team will present their solution and methods to an
                      audience of AI researchers, data scientists, and industry
                      professionals at the CU Denver Data Science and AI
                      Symposium.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>2nd Place:</strong>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                    <li>
                      <strong>Monetary Prize:</strong> Awarded to the team with
                      the second-highest score.
                    </li>
                    <li>
                      <strong>Presentation Opportunity:</strong> The
                      second-place team will also have the chance to showcase
                      their approach during the symposium.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>3rd Place:</strong>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                    <li>
                      <strong>Monetary Prize:</strong> Awarded to the team with
                      the third-highest score.
                    </li>
                    <li>
                      <strong>Presentation Opportunity:</strong> The third-place
                      team will present their adversarial techniques at the
                      symposium.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Top 10 Teams:</strong>
                  <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                    <li>
                      <strong>Certificate Prize:</strong> Awarded to the top 5
                      teams with certificates of participation.
                    </li>
                  </ul>
                </li>
              </ul>
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, mt: 4 }}>
              Recognition:
            </Typography>
            <Typography variant="body1" fontSize={18} lineHeight={1.8}>
              All winners will receive recognition during the symposium and be
              featured in CU Denver’s AI and Data Science community, providing
              valuable exposure and networking opportunities.
            </Typography>

            <Typography
              variant="body1"
              fontSize={18}
              lineHeight={1.8}
              sx={{ fontWeight: 'bold', mt: 2 }}
            >
              Whether you're looking to hone your skills, gain recognition, or
              win exciting prizes, this challenge offers CU Denver students a
              unique chance to make their mark in the field of adversarial
              machine learning!
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
      </Grid>
    </Box>
  );
}
