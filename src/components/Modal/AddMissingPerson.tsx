import * as React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import { Formik, Form, Field, FieldProps } from 'formik';

import Text, { createTextStyles, DEFAULT_TEXT_STYLES } from '../Text';
import { IconButton } from '../Button';
import { Colors, Sizes } from '../../config';
import Icon from '../Icon';
import { ModalProps } from '.';

import { Analytics } from '../../helpers';

const Container = styled.div`
  .extras {
    a:not(:last-child) {
      margin-bottom: ${Sizes.SPACING / 3}px;
    }
  }
`;

const Heading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${Colors.BORDER};
  padding: ${Sizes.SPACING / 3}px 0;
`;

const StyledForm = styled(Form)`
  padding: ${Sizes.SPACING / 2}px 0;
  background-color: red;
  width: 100%;

  label {
    display: block;
    margin-top: ${Sizes.SPACING / 2}px;
    margin-bottom: ${Sizes.SPACING}px;
  }

  ${Field} {
    display: block;
  }
`;

const DEFAULT_VALUES = {
  id: '',
};

const AddMissingPersonModal: React.FunctionComponent<ModalProps> = ({
  close,
}) => {
  React.useEffect(() => {
    Analytics.event({
      category: 'UI',
      action: Analytics.UI.SHOW_PROJECT_INFO,
    });
  }, []);

  return (
    <Container>
      <Heading>
        <Text as="h2">Report a missing person</Text>
        <IconButton
          size={40}
          iconProps={{ size: 25, name: 'x' }}
          onClick={close}
        />
      </Heading>
      <Formik
        initialValues={{}}
        onSubmit={(values, actions) => {
          console.log({ values, actions });

          alert(JSON.stringify(values, null, 2));

          actions.setSubmitting(false);
        }}
      >
        {({ handleSubmit }) => (
          <StyledForm>
            <label htmlFor="firstName">First Name</label>

            <Field id="firstName" name="firstName" placeholder="First Name" />

            <button type="submit">Submit</button>
          </StyledForm>
        )}
      </Formik>
    </Container>
  );
};

export default AddMissingPersonModal;
