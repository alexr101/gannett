import { Grid, Typography, Alert, TextField, Button } from "@mui/material";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";

const formData = {
  FULL_NAME: {
    label: "Full Name",
    // https://stackoverflow.com/questions/2385701/regular-expression-for-first-and-last-name
    validationRules: [
      {
        regex:
          /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/,
        errMsg: "Must include first and last name",
      },
    ],
  },
  EMAIL: {
    label: "Email",
    // https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
    validationRules: [
      {
        regex: /^\S+@\S+\.\S+$/,
        errMsg: "Must follow the following format name@test.com",
      },
    ],
  },
  PUBLIC_NOTICE_MESSAGE: {
    label: "Public Notice",
    // https://stackoverflow.com/questions/2249460/how-to-use-javascript-regex-to-check-for-empty-form-fields
    // regex rules can be broken down and paired with error messagees so run more detailed error messages
    // regex: [label: 'no input', regex: //, label: 'too long', regex: //,]
    validationRules: [
      {
        regex: /([^\s])/,
        errMsg: "Must not be empty",
      },
    ],
  },
};

const INPUT_TYPE = {
  FULL_NAME: "FULL_NAME",
  EMAIL: "EMAIL",
  PUBLIC_NOTICE_MESSAGE: "PUBLIC_NOTICE_MESSAGE",
};

const RESPONSE_TYPE = {
  ERROR: "error",
};

export default function PublicNoticeForm() {
  // URL for submitting the input form
  const submission_url = "/api/submit";

  const [formMessageType, setFormMessageType] = useState("");
  const [formMessage, setFormMessage] = useState("");

  const [fullName, setFullName] = useState("");
  const [fullNameErr, setFullNameErr] = useState("");

  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const [publicNoticeMessage, setPublicNoticeMessage] = useState("");
  const [publicNoticeMessageErr, setPublicNoticeMessageErr] = useState("");

  // Using to automate form validation. I'm sure there's a better way.
  // I'm thinking a better solution is something like a HOC React component that takes in
  // configurations or props (like formData.EMAIL above) & automatically takes care of it's value, update & & errUpdate functionality. Basically
  // spliting up & abstracting my approach here, which is clunky for sure.
  // However it would be challenging if we still have to display a summary of errors outside of individual components.
  // An onErr hook on each component that syncs state could solve that though.
  const inputStateMap = {
    FULL_NAME: {
      value: fullName,
      update: setFullName,
      errUpdate: setFullNameErr,
    },
    EMAIL: {
      value: email,
      update: setEmail,
      errUpdate: setEmailErr,
    },
    PUBLIC_NOTICE_MESSAGE: {
      value: publicNoticeMessage,
      update: setPublicNoticeMessage,
      errUpdate: setPublicNoticeMessageErr,
    },
  };

  // abstracted this so it's configuration managed
  const isFormValid = () => {
    let formValid = true;
    const errors = [];
    for (const inputType in INPUT_TYPE) {
      const inputState = inputStateMap[inputType];
      const inputData = formData[inputType];

      inputState.errUpdate("");
      for (const validationRule of inputData.validationRules) {
        if (!validationRule.regex.test(inputState.value)) {
          formValid = false;
          const err = `Please verify ${inputData.label} it ${validationRule.errMsg}`;
          errors.push(err);
          inputState.errUpdate(validationRule.errMsg);
        }
      }
    }
    setFormMessage(errors.join(", "));
    setFormMessageType("error");
    return formValid;
  };

  const clearForm = () => {
    setFullName("");
    setEmail("");
    setPublicNoticeMessage("");
  };

  const updateFormMessage = (msg, type) => {};

  async function postNoticeUpdate() {
    if (!isFormValid()) {
      return;
    }

    const data = {
      customer_name: fullName,
      customer_email: email,
      text_body: publicNoticeMessage,
    };
    const fetchRes = await fetch(submission_url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const res = await fetchRes.json();

    if (res.status === RESPONSE_TYPE.ERROR && res.message) {
      updateFormMessage(res.message, "error");
    } else {
      updateFormMessage("Submission Successful", "success");
      clearForm();
    }
  }

  const onChange = (e, type) => {
    const inputState = inputStateMap[type];
    inputState.update(e.target.value);
  };

  return (
    <>
      <Grid>
        {formMessage && (
          <Alert color={formMessageType}>
            <span>{formMessage}</span>
          </Alert>
        )}
      </Grid>
      <Grid>
        <Typography>
          Please enter your information into the submission form below and click
          &quot;Submit&quot; when finished.
        </Typography>
        {/* Input form should go here */}
        <FormControl>
          <TextField
            id="full-name-input"
            value={fullName}
            label={formData.FULL_NAME.label}
            onChange={(e) => {
              console.log({ e });
              onChange(e, INPUT_TYPE.FULL_NAME);
            }}
            error={fullNameErr}
            helperText={fullNameErr}
          />
          <TextField
            id="email-input"
            value={email}
            label={formData.EMAIL.label}
            onChange={(e) => onChange(e, INPUT_TYPE.EMAIL)}
            error={emailErr}
            helperText={emailErr}
          />

          <TextField
            id="public-notice-input"
            placeholder="MultiLine with rows: 2 and rowsMax: 20"
            multiline
            rows={10}
            maxRows={10}
            value={publicNoticeMessage}
            label={formData.PUBLIC_NOTICE_MESSAGE.label}
            onChange={(e) => onChange(e, INPUT_TYPE.PUBLIC_NOTICE_MESSAGE)}
            error={publicNoticeMessageErr}
            helperText={publicNoticeMessageErr}
          />

          <Button color="primary" onClick={postNoticeUpdate}>
            Submit
          </Button>
        </FormControl>
      </Grid>
    </>
  );
}
