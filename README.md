# Public Notices

This code exercise is intended to evaulate your level of skill with front-end web app development.

Please carefully review the requirements and use this boilerplate code to help you get started.

If you have questions, please contact your hiring manager.

## Evaluation
Though an incomplete list, we're looking for a few things in your code:
- clarity, complexity and readability of code
- solid understanding of javascript fundamentals, functions and built-in methods
- how solutions are implemented given the requirements
- how hooks are utilized to maintain state
- prop inheritance and event bubbling
- an understanding of how apis work, crafting request payloads and handling responses
- integrating 3rd party libaries into a React application

## Description
Our stakeholders in sales are asking for the product engineering team to create a method for customers to directly
submit information for a legal notice through our website.

At a minimum, the sales team needs:
- the customer's name
- their email address
- the text for their public notice

### To Do:
1) Create a new component within `/components` that will contain the input forms and logic.
2) Import the component into the parent template `index.js`
3) Use [Material UI](https://mui.com/) to build the components and form, with inputs for:
- Customer Name
- Customer Email Address
- Text Body for Public Notice
  4)The component should inherit the values of `submission_url` variables declared in the parent template `index.js`
5) Add a "Submit" button to the form
6) When the customer submits the form, ensure that all fields are completed and are of the expected type. If the
   customer has not completed the form or there are mistakes, provide feedback to the customer about the mistake and
   how to fix it
7) If the values for the input fields are correct, create a `POST` payload and submit to the URL defined
   by `submission_url`
8) If the values are correct:
- alert the customer that the form was successfully submitted
- add a receipt displaying the datetime of submission to a list underneath the form
- clear the form so another public notice can be created for submission

### Form Requirements:
- The customer name should contain at least two strings representing their first and last name
- The customer email address should contain the attributes of an email address, including the `@` symbol and domain name
- The text body should not be empty
- The form should be able to properly handle submissions
- Customers should be given clear feedback for all successes and failures, in addition to instructions on how to remedy a failure

### Bonus Round:
- Use TypeScript
- If an error is returned by the API endpoint, display the error to the customer
- If the customer leaves the page before submission is complete, ensure the input boxes still contain the values
- Build a unit test to ensure the `submission_form` component works as expected
- Ensure code passes linting tests
- Reverse the order of submissions at `/submissions` so that the newest appears first

### To Submit:
- Push the code to your GitHub account and share the link with us

### Advice:
While these application requirements may seem daunting initially, focus on one task at a time before moving on to the
next. This helps to ensure that the application is working at all times and errors can be more easily identified
and resolved.

A functioning app with minimal feature set is more important than a featureful app that doesn't work. Give
consideration to what is a important versus what is a "nice to have". We want to see your approach to breaking big
projects down into manageable chunks.

Don't get hung up on pixel perfect design. While it's important to look inviting, we are more interested in seeing
your approach to problem solving and how the application functions.

Don't introduce code complexity that you're not willing to defend. Do not blindly paste in copy-pasta without
entirely understanding how it works. There's usually some tell-tale signs when that's done. Using it will invite
questions.

### During Review, be prepared to discuss:
- Javascript fundamentals
- The React ecosystem, in addition to the pros and cons of the different hooks
- Decisions and rationalizations for solutions
- Support libraries: if you choose to use one, we'll likely ask why instead of a vanilla Javascript solution

### What we don't care about:
- Don't worry about "code golf", or trying to make sure that five lines of code can be condensed into a single line.
  We care more about readability than code ninja skills.
- Fanciful far-flung Javascript methods. While it's great to demonstrate a solid understanding of Javascript, don't
  get hung up thinking that we care about some arcane method that can only be deciphered by Javascript monks. 
  Again, readability > code ninja skills.
- Features that haven't been outlined. Yes, we're aware that the page does not have the necessary meta tags to align
  with accessability or SEO, or that there's no footer on the page. Assume that you are creating a component that will
  exist on a page with all of that stuff.
- Reorganizing the application to fit a design pattern. Don't get hung up on ensuring that components are organized
  in a certain way, or that we're not following MVC best practices. Those are just going to burn up cycles rather than
  knocking out tasks.
