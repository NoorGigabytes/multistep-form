import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { FormContext } from "../../../App";
import * as yup from "yup";
import datingApps from '../../datingApps.json';
import styles from '../../styles.json';

function Workspace() {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);

  const renderError = (message) => (
    <p className="italic text-red-600">{message}</p>
  );

  const [selectedApps, setSelectedApps] = useState([]);

  const handleAppsSelect = (e) => {
    const appValue = e.target.value;
    setSelectedApps((prevSelected) => {
      if (prevSelected.includes(appValue)) {
        return prevSelected.filter((app) => app !== appValue);
      }
      return [...prevSelected, appValue];
    });
  };

  const [selectedStyles, setSelectedStyles] = useState([]);

  const handleStylesSelect = (e) => {
    const styleValue = e.target.value;
    setSelectedStyles((prevSelected) => {
      if (prevSelected.includes(styleValue)) {
        return prevSelected.filter((style) => style !== styleValue);
      }
      return [...prevSelected, styleValue];
    });
  };

  const ValidationSchema = yup.object().shape({
    description: yup.string().required('This field is required'),
    hobbies: yup.string().required('This field is required'),
    achieve: yup.string().required('This field is required'),
    appUrl: yup.string().url('It should be a valid URL'),
    apps: yup.array().min(1, 'Please select at least one app'),
    styles: yup.array().min(1, 'Please select at least one style')
    .max((formData.package === 'basic' ? 3 : formData.package === 'premium' ? 5 : 100), formData.package === 'basic' ? 'You can select only 3 styles for Basic package' : formData.package === 'premium' ? 'You can select only 5 styles for Premium package' : 'Max loaded'),
  });

  return (
    <Formik
      initialValues={{
        apps: [],
        appUrl: '',
        description: '',
        hobbies: '',
        achieve: '',
        styles: [],
        additional: '',
      }}
      validationSchema={ValidationSchema}
      onSubmit={(values) => {
        const data = { ...formData, ...values };
        setFormData(data);
        setActiveStepIndex(activeStepIndex + 1);
      }}
    >
      <Form className="flex flex-col justify-center items-center">

        <div className="flex flex-col items-start mb-2 w-full">
          <label className="font-medium text-slate-500 mb-3">Which Dating application(s) are you using?</label>
          <div className="grid sm:grid-cols-3 grid-cols-2 gap-3 w-full">
              {datingApps.datingApps.map((app, index) => (<label key={index}
                className={`border py-2 px-4 rounded-md cursor-pointer hover:border-purple-200 ${
                  selectedApps.includes(app)
                    ? "border-purple-200 bg-purple-50"
                    : ""
                }`}
              >
                <Field
                  type="checkbox"
                  name="apps"
                  value={app}
                  className="sr-only"
                  onClick={handleAppsSelect}
                />
                <div className="font-medium text-sm text-center text-slate-500">
                  {app}
                </div>
              </label>))}
          </div>
        <ErrorMessage name="apps" render={renderError} />
        </div>

        <div className="flex flex-col items-start mb-2 w-full">
          <label className="font-medium text-slate-500">Can you provide a link to your dating app profile? (Optional)</label>
          <Field
            name="appUrl"
            className="rounded-md border p-2 w-full"
          />
        <ErrorMessage name="appUrl" render={renderError} />
        </div>

        <div className="flex flex-col items-start mb-2 w-full">
          <label className="font-medium text-slate-500">Please copy and paste your current profile description here</label>
          <Field
            name="description"
            as="textarea"
            className="rounded-md border p-2 w-full"
          />
        <ErrorMessage name="description" render={renderError} />
        </div>

        <div className="flex flex-col items-start mb-2 w-full">
          <label className="font-medium text-slate-500">What are some hobbies or activities you enjoy?</label>
          <Field
            name="hobbies"
            as="textarea"
            className="rounded-md border p-2 w-full"
          />
        <ErrorMessage name="hobbies" render={renderError} />
        </div>

        <div className="flex flex-col items-start mb-2 w-full">
          <label className="font-medium text-slate-500">Tell us what do what you hope to achieve with your dating app profile</label>
          <Field
            name="achieve"
            as="textarea"
            className="rounded-md border p-2 w-full"
          />
        <ErrorMessage name="achieve" render={renderError} />
        </div>

        <div className="flex flex-col items-start mb-2 w-full">
          <label className="font-medium text-slate-500 mb-3">What style do you prefer for your profile?</label>
          <div className="grid sm:grid-cols-3 grid-cols-2 gap-3 w-full">
              {styles.styles.map((style, index) => (<label key={index}
                className={`border py-2 px-4 rounded-md cursor-pointer hover:border-purple-200 ${
                  selectedStyles.includes(style)
                    ? "border-purple-200 bg-purple-50"
                    : ""
                }`}
              >
                <Field
                  type="checkbox"
                  name="styles"
                  value={style}
                  className="sr-only"
                  onClick={handleStylesSelect}
                />
                <div className="font-medium text-sm text-center text-slate-500">
                  {style}
                </div>
              </label>))}
          </div>
        <ErrorMessage name="styles" render={renderError} />
        </div>

        <div className="flex flex-col items-start mb-2 w-full">
          <label className="font-medium text-slate-500">Is there any additional information that you think might be useful for the coach? (Optional)</label>
          <Field
            name="additional"
            as="textarea"
            className="rounded-md border p-2 w-full"
          />
        <ErrorMessage name="additional" render={renderError} />
        </div>

        <button
          className="rounded-md bg-purple-300 hover:bg-slate-500 transition-all duration-300 ease-out font-medium text-white my-2 p-2"
          type="submit"
        >
          Continue
        </button>
      </Form>
    </Formik>
  );
}

export default Workspace;
