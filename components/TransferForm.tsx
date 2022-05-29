import { Button, LinearProgress, Card } from "@mui/material";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";

const StyledFormContainer = styled(Card)`
  max-width: 500px;
  padding: 16px;
  margin: 20px auto 0;
  .MuiFormControl-root {
    margin-bottom: 12px;
  }
`;

const TransferForm = () => {
  return (
    <StyledFormContainer>
      <Formik
        initialValues={{
          receipentAddress: "",
          amount: "",
        }}
        validate={(values) => {
          return {};
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Field
              component={TextField}
              name="receipentAddress"
              type="text"
              label="Receipent address"
              placeholder="Public address (0x), or ENS"
              fullWidth
            />
            <Field
              component={TextField}
              type="number"
              label="Amount"
              name="amount"
              placeholder="Please enter the amount to be transfered, e.g 0.1"
              fullWidth
            />
            {isSubmitting && <LinearProgress />}
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
              fullWidth
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </StyledFormContainer>
  );
};

export default TransferForm;
