import styled from 'styled-components';
import Text from '../components/Text';
import { Button } from '../components/Button';
import { Colors, Sizes } from '../config';
import { useEffect } from 'react';
import { Analytics } from '../helpers';
import { Typography } from '../components/Typography';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: ${Colors.BACKGROUND};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  > h4 {
    margin-bottom: ${Sizes.SPACING}px;
  }

  > p {
    max-width: 50%;
    @media only screen and (max-width: 600px) {
      max-width: 100%;
    }
  }

  > button {
    margin-top: ${Sizes.SPACING}px;
    color: ${Colors.BACKGROUND};
  }
`;

const ContactPage = () => {
  useEffect(() => {
    Analytics.pageview('/contact');
  }, []);

  return (
    <Container>
      <Typography variant="h1">Contact</Typography>
      <Text as="h4">tpscalls</Text>
      <Text as="h1">Contact</Text>
      <Text as="p">
        We would love to hear from you! Whether you have a question about
        tpscalls, need assistance, or just want to provide feedback, feel free
        to reach out. I'm here to help you with any inquiries you may have. You
        can contact me via email at{' '}
        <a href="mailto:riley@drnt.ca">riley@drnt.ca</a> with the subject line
        "tpscalls". I look forward to connecting with you!
      </Text>
      <Button
        onClick={() => {
          window.open('mailto:riley@drnt.ca');
        }}
      >
        Email Me
      </Button>
    </Container>
  );
};

export default ContactPage;
