type IValidationRule = {
  regex: RegExp;
  errMsg: string;
}


type IInputConfig = {
  label: string,
  validationRules: IValidationRule[];
}

type IPublicNoticeFormData = {
  FULL_NAME: IInputConfig;
  EMAIL: IInputConfig;
  PUBLIC_NOTICE_MESSAGE: IInputConfig;
}

type IInputEnum = {
  FULL_NAME: string;
  EMAIL: string;
  PUBLIC_NOTICE_MESSAGE: string;
}

type IResponseTypeMap = {
  ERROR: string;
}

const formData: IPublicNoticeFormData = {
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

const INPUT_TYPE: IInputEnum = {
  FULL_NAME: "FULL_NAME",
  EMAIL: "EMAIL",
  PUBLIC_NOTICE_MESSAGE: "PUBLIC_NOTICE_MESSAGE",
};

const RESPONSE_TYPE: IResponseTypeMap = {
  ERROR: "error",
};

export { formData, INPUT_TYPE, RESPONSE_TYPE };
