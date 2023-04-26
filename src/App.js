import { createContext, useState } from "react";
import Step from "./components/Step/Step";
import Stepper from "./components/Stepper";
export const FormContext = createContext();

function App() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [formData, setFormData] = useState({});

  return (
    <div className="bg-gray-800 md:p-16 p-5 h-full">
      <FormContext.Provider
        value={{ activeStepIndex, setActiveStepIndex, formData, setFormData }}
      >
        <div className="bg-white xl:w-1/2 mb-96 rounded-xl h-max mx-auto flex flex-col md:p-16 p-8 items-center justify-start">
          <Stepper />
          <Step />
        </div>
      </FormContext.Provider>
    </div>
  );
}

export default App;
