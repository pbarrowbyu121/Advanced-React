import { useState } from "react";
import { DateTime } from "luxon";

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    let { value, name, type } = e.target;
    // keep numbers as numbers instead of converting to string as is default html
    if (type === "number") {
      //   console.log("number here");
      value = parseInt(value);
      //   console.log(value);
    }
    // console.log(e.target.name, e.target.value);
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  function handleDateChange(date) {
    let date1 = new Date(date);
    let dateUTC = DateTime.fromObject({
      day: date1.getDate(),
      year: date1.getFullYear(),
      month: date1.getMonth() + 1,
      zone: "America/New_York",
    });
    setInputs({
      ...inputs,
      date: date,
    });
  }

  // function resets form back to initial state
  function resetForm() {
    setInputs(initial);
  }

  // function to clear entries
  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ""])
    );
    setInputs(blankState);
  }

  // return things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
    handleDateChange,
  };
}
