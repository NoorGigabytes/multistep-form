import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { FormContext } from "../../../App";
import * as yup from "yup";
import { FiCamera } from "react-icons/fi";

function Basic() {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);

  const renderError = (message) => (
    <p className="italic text-red-600 text-sm">{message}</p>
  );

  const [selectedPackage, setSelectedPackage] = useState("");

  const handlePackageSelect = (e) => {
    const packageValue = e.target.value;
    setSelectedPackage(packageValue);
  };

  const [fileName, setFileName] = useState(null);

  const ImageUploadInput = ({ field, form, ...props }) => {
    
    // const handleChange = (event) => {
    //   const file = event.currentTarget.files[0];
    //   form.setFieldValue(field.name, file);
    //   setFileName(file.name);
    // };

    const handleChange = (event) => {
      const files = Array.from(event.currentTarget.files);
      form.setFieldValue(field.name, files);
      setFileName(files.map(file => file.name).join(', '));
    };
  
    return (
      <div className="flex flex-col items-center mb-2 w-full">
        <label className="mt-3 font-medium hover:text-slate-500 text-gray-300 cursor-pointer border-2 hover:border-slate-500 w-full text-center py-3 rounded-md border-dashed tansition-all duration-300 ease-out">
        <input
          type="file"
          accept="image/*"
          style={{display: 'none'}}
          onChange={handleChange}
          className="sr-only rounded-md border p-2 w-full"
          {...props}
          multiple
        />
          <p>Upload profile picture(s)</p>
          <FiCamera className="mx-auto text-4xl" />
        </label>
        <p className="sm:text-sm text-xs text-gray-400">{fileName}</p>
      </div>
    );
  };

  const ValidationSchema = yup.object().shape({
    name: yup.string().required('This field is required'),
    email: yup.string().email().required('This field is required'),
    package: yup.string().oneOf(['basic', 'premium', 'delux']).required('Please select a package'),
    image: yup.array().min(1, 'Please attach at least one image file').required('Please attach at least one image file'),
    // image: yup.string().nullable().required('Please attach a valid image file'),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        package: "",
        image: [],
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
          <label className="font-medium text-slate-500">Name</label>
          <Field
            name="name"
            className="rounded-md border p-2 w-full"
            placeholder="John Doe"
          />
        <ErrorMessage name="name" render={renderError} />
        </div>
        <div className="flex flex-col items-start mb-2 w-full">
          <label className="font-medium text-slate-500">Email</label>
          <Field
            name="email"
            className="rounded-md border p-2 w-full"
            placeholder="john.doe@gmail.com"
          />
        <ErrorMessage name="email" render={renderError} />
        </div>

        <div className="flex flex-col items-start mb-2 w-full">
          <Field component={ImageUploadInput} name="image" />
          <ErrorMessage component="div" name="image" render={renderError}/>
        </div>

        <div className="flex flex-col items-start mb-2">
          <label className="font-medium text-slate-500 mb-3">Package</label>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
            <label
                className={`border p-4 rounded-md cursor-pointer hover:border-purple-200 ${
                  selectedPackage === "basic"
                    ? "border-purple-200 bg-purple-50"
                    : ""
                }`}
              >
                <Field
                  type="radio"
                  name="package"
                  value="basic"
                  className="sr-only"
                  onClick={handlePackageSelect}
                />
                <div className="font-medium text-lg mb-2 text-slate-500">
                  Basic
                </div>
                <div className="text-sm text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
                <div className="font-medium text-purple-300 mt-2">$10/month</div>
              </label>
            <label
                className={`border p-4 rounded-md cursor-pointer hover:border-purple-200 ${
                  selectedPackage === "premium"
                    ? "border-purple-200 bg-purple-50"
                    : ""
                }`}
              >
                <Field
                  type="radio"
                  name="package"
                  value="premium"
                  className="sr-only"
                  onClick={handlePackageSelect}
                />
                <div className="font-medium text-lg mb-2 text-slate-500">
                  Premium
                </div>
                <div className="text-sm text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
                <div className="font-medium text-purple-300 mt-2">$20/month</div>
              </label>
            <label
                className={`border p-4 rounded-md cursor-pointer hover:border-purple-200 ${
                  selectedPackage === "delux"
                    ? "border-purple-200 bg-purple-50"
                    : ""
                }`}
              >
                <Field
                  type="radio"
                  name="package"
                  value="delux"
                  className="sr-only"
                  onClick={handlePackageSelect}
                />
                <div className="font-medium text-lg mb-2 text-slate-500">
                  Delux
                </div>
                <div className="text-sm text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
                <div className="font-medium text-purple-300 mt-2">$30/month</div>
              </label>
          </div>
        <ErrorMessage name="package" render={renderError} />
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

export default Basic;
