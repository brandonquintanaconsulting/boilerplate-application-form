# Muti-Step Application Submission Flow

## Task 1 Planning

### Assumptions

- Since we have a design we can use that to drive data and data to drive development
- We'll create a dummy API JSON file to use as a mock vs API server.
- Utilize Formik for Form states and existing UI components where applicable.
- For string values I'm putting directly into the JSON object. If we're using a translation plugin we can replace those with translations keys instead.
- Since this data is a work in progress and I'm not super familiar with the build it components it might make sense to change data to fit the components and since it's a custom API format it's possible to do so.

## Task 2 Build API

Since we want this to have dynamic abilities, I want to create generic form objects and arrays of objects to scope different pages. In the design there is a 4 page wizard.

We'll start with an outer form array of objects to hold each page:
`{form: []}`

Each form will have it's own object that will represent the form page. We'll have a meta object to hold page meta and a data object to hold form fields:

```
{
  form: [
    {
      meta: {
        title: "Who is the primary contact for this policy?",
        description: "This person will receive all communications from Newfront about this policy.  You can change this contact information later.  If you're not sure, just add your contact information. "
      },
      data: []
    }
  ]
}
```

Next we'll add the form field data. Each item will represent a fieldset with items like a label, type, etc. I like to keep the attributes the same as the component in this case Formik or HTML attributes like `placeholder`. This will allow ES6 shorthand to happen naturally and we can use the spread `...` operator easily as well:

```
{
  form: [
    {
      meta: {
        title: "Who is the primary contact for this policy?",
        description: "This person will receive all communications from Newfront about this policy.  You can change this contact information later.  If you're not sure, just add your contact information."
      },
      data: [
        {
          name: 'fullName',
          label: 'Full Name',
          type: 'text',
          required: true,
          value: ''
        },
        {
          name: 'role',
          label: 'Role',
          type: 'text',
          required: false,
          value: ''
        },
        {
          name: 'phoneNumber',
          label: 'Phone Number',
          type: 'text',
          required: true,
          value: ''
        }
      ]
    }
  ]
}
```

We'll determine previous and next buttons by array position. If `form[0]` there will be no previous button. If `form[length-1]` we're at the final step so we'll do a final form submission. `Subfields` will be secondary fields for a field object. This array can appear in any field object as many levels deep.

We'll create final output for entire wizard. We'll need to implement this via #1:

```
{
  form: [
    {
      meta: {
        title: "Who is the primary contact for this policy?",
        description: "This person will receive all communications from Newfront about this policy.  You can change this contact information later.  If you're not sure, just add your contact information."
      },
      data: [
        {
          name: 'fullName',
          label: 'Full Name',
          type: 'text',
          required: true,
          value: ''
        },
        {
          name: 'role',
          label: 'Role',
          type: 'text',
          required: false,
          value: ''
        },
        {
          name: 'phoneNumber',
          label: 'Phone Number',
          type: 'text',
          required: true,
          value: ''
        }
      ]
    },
    {
      meta: {
        title: "Tell us about your company"
      },
      data: [
        {
          name: 'companyName',
          label: 'Full Name',
          type: 'text',
          required: true
        },
        {
          name: 'fein',
          label: 'What is your Federal Employer Identification Number? (FEIN)',
          type: 'text',
          required: true
        },
        {
          name: 'yearsInBusiness',
          label: 'Years in Business',
          type: 'number',
          required: false
        },
        {
          name: 'numberofLocations',
          label: 'Number of Locations',
          type: 'number',
          required: false
        },
        {
          name: 'statesOfOperation',
          label: 'In which states do you operate',
          type: 'text',
          required: false
        },
      ]
    },
    {
      meta: {
        title: "Tell Us About Your Employees"
      },
      data: [
        {
          name: 'workInjuryLocation',
          label: 'What is the name of the clinic, physician, or ER used for work injuries?',
          type: 'text',
          required: true
        },
        {
          name: 'medicalInsurance',
          label: 'Does your group provide medical insurance?',
          type: 'checkbox',
          required: false
        },
        {
          name: 'retirementPensionPlan',
          label: 'Do you offer a retirement or pension plan?',
          type: 'checkbox',
          required: false
        },
        {
          name: 'paidVacation',
          label: 'Do you give paid vacation?',
          type: 'checkbox',
          required: false,
          subFields: [
            {
              name: 'paidVacationDetails',
              label: 'Please provide details about the paid vacation',
              type: 'text',
              required: false,
            }
          ]
        },
        {
          name: 'phoneNumber',
          label: 'Phone Number',
          type: 'text',
          required: true
        }
      ]
    },
    {
      meta: {
        title: "How do you want to pay for your policy",
      },
      data: [
        {
          type: 'radioGroup',
          name: 'payment',
          required: true,
          subFields: [
            {
              label: 'I want to pay Newfront',
              description: 'You'll pay newfront instead of paying each insurance company separately.  There are no fees.',
              recommended: true,
              checked: true
            },
            {
              label: 'I want to pay the insurance company directly',
              description: 'You'll receive bills from the insurance company and it will be your responsibility to make sure they are paid to keep your coverage.',
            },
          ]
        }
      ]
    }
  ]
}
```

## Task 3 Build Multistep Form

- [[1](https://github.com/brandonquintanaconsulting/boilerplate-application-form/issues/1)] Create API or Mock for Fetching Form JSON
- [[2](https://github.com/brandonquintanaconsulting/boilerplate-application-form/issues/2)] Setup Router
- [[3](https://github.com/brandonquintanaconsulting/boilerplate-application-form/issues/3)] Implement Components
- [[4](https://github.com/brandonquintanaconsulting/boilerplate-application-form/issues/4)] Form States with Formik
- [[5](https://github.com/brandonquintanaconsulting/boilerplate-application-form/issues/5)] Submit Data to Backend

A number of these things can be done in parallel since we've spec'd the initial JSON object. We can create the API as one lane, the router can be done separately, the components can use the mock and layout UI components, form states would have to happen after UI is done. Submitting to the backend can be done at any time also since we know the state object we can find parameters to submit to the backend.
