import React, { useContext, useEffect } from "react";
import { FormContext } from "../../App";

function Stepper() {
  const { activeStepIndex } = useContext(FormContext);
  useEffect(() => {
    const stepperItems = document.querySelectorAll(".stepper-item");
    stepperItems.forEach((step, i) => {
      if (i <= activeStepIndex) {
        step.classList.add("bg-purple-200", "text-white");
      } else {
        step.classList.remove("bg-purple-200", "text-white");
      }
    });
  }, [activeStepIndex]);
  return (
    <div className="w-full flex flex-row items-center justify-center pb-16">
      <div className="flex flex-col items-center mt-5">
        <div className="my-auto stepper-item sm:w-12 sm:h-12 h-10 w-10 text-center flex justify-center items-center font-medium border-2 rounded-full border-purple-200 transition-all duration-300 delay-200 ease-out">
          <p>1</p>
        </div>
        <p className="font-medium sm:text-md text-sm text-slate-500">Basic Info</p>
      </div>
      <div className="flex-auto border-t-2 border-purple-200"></div>
      <div className="flex flex-col items-center mt-5">
        <div className="my-auto stepper-item sm:w-12 sm:h-12 h-10 w-10 text-center flex justify-center items-center font-medium border-2 rounded-full border-purple-200 transition-all duration-300 delay-200 ease-out">
          <p>2</p>
        </div>
        <p className="font-medium sm:text-md text-sm text-slate-500 mx-3">Details</p>
      </div>
      <div className="flex-auto border-t-2 border-purple-200"></div>
      <div className="flex flex-col items-center mt-5">
        <div className="my-auto stepper-item sm:w-12 sm:h-12 h-10 w-10 text-center flex justify-center items-center font-medium border-2 rounded-full border-purple-200 transition-all duration-300 delay-200 ease-out">
          <p>3</p>
        </div>
        <p className="font-medium sm:text-md text-sm text-slate-500">Completion</p>
      </div>
    </div>
  );
}

export default Stepper;
