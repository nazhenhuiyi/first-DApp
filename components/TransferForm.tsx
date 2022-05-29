import React from "react";
import { Button, LinearProgress, Card } from "@mui/material";
import BigNumber from "bignumber.js";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import { ethers } from "ethers";

const StyledFormContainer = styled(Card)`
  max-width: 500px;
  padding: 16px;
  margin: 20px auto 0;
  .MuiFormControl-root {
    margin-bottom: 12px;
  }
`;

interface Values {
  receipentAddress: string;
  amount: string;
}

interface TransferFormProps {
  balance?: ethers.BigNumber;
  isConnected: boolean;
}

const TransferForm: React.FC<TransferFormProps> = ({ balance }) => {
  return (
    <StyledFormContainer>
      <Formik
        initialValues={{
          receipentAddress: "",
          amount: "",
        }}
        validate={(values: Values) => {
          const errors = {
            receipentAddress: "",
            amount: "",
          };
          if (values.receipentAddress) {
            try {
              ethers.utils.getAddress(values.receipentAddress);
            } catch (e) {
              errors.receipentAddress = "the address is invalid";
            }
          }
          if (values.amount && balance) {
            let bigNumberAmount;
            try {
              bigNumberAmount = ethers.utils.parseEther(
                new BigNumber(values.amount).toFixed()
              );
            } catch (e: any) {
              // TODO fractional component exceeds decimals
              errors.amount = e.message;
            }
            if (bigNumberAmount?.gte(balance)) {
              errors.amount =
                "The transfer amount should be smaller than the balance";
            }
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
        validateOnChange={false}
        validateOnBlur
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Field
              component={TextField}
              name="receipentAddress"
              type="text"
              label="Receipent address"
              placeholder="Please enter Public address (0x)"
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
