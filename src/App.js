import { useCallback, useState } from "react";
import "./App.scss";
import { Input } from "./components/Input";
import { tabs } from "./constants/tabs";
import { isValidForm } from "./features/isValidForm";

const pricePerItem = 100;

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  quantity: 1,
  price: "",
};

function App() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [formInfo, setFormInfo] = useState(initialFormState);

  const [formErrors, setFormErrors] = useState({
    email: "",
    quantity: "",
  });

  const handleInputChange = useCallback((formFieldName, newValue) => {
    setFormInfo((prev) => ({
      ...prev,
      [formFieldName]: newValue,
    }));
    console.log("app.js");

    setFormErrors((prev) => ({
      ...prev,
      [formFieldName]: "",
    }));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (selectedTab === 0) {
      if (!isValidForm.email(formInfo.email)) {
        setFormErrors((prev) => ({ ...prev, email: "Not valid" }));
        return;
      } else {
        setFormErrors((prev) => ({ ...prev, email: "" }));
      }
    }

    if (selectedTab === 1) {
      if (!isValidForm.quantity(formInfo.quantity)) {
        setFormErrors((prev) => ({
          ...prev,
          quantity: "The max quantity is 1000",
        }));
        return;
      } else {
        setFormErrors((prev) => ({ ...prev, email: "" }));
      }
    }

    if (selectedTab === 3) {
      setSelectedTab(0);
      setFormInfo(initialFormState);
      return;
    }

    setSelectedTab((prev) => prev + 1);
  }

  function handleBackButton() {
    setSelectedTab((prev) => prev - 1);
  }

  return (
    <section className="container">
      <div className="row justify-content-center min-vh-100 align-content-center p-2">
        <div className="col-10 bg-body-secondary px-2 py-4 py-md-5 px-md-0   rounded-2">
          <div className="row justify-content-center justify-content-lg-start">
            <div className=" col-12 col-md-11 col-lg-8 offset-lg-1">
            <nav aria-label=" breadcrumb row">
              <ol className="breadcrumb bg-white p-2 py-md-0 row m-1 rounded-2 text-secondary fw-medium d-md-inline-flex mw-md-50 m-md-0">
                <li className="breadcrumb-item col-1 icon icon--house pe-1 align-self-center "></li>
                {tabs.map((tab, index) => {
                  return (
                    <li
                      key={tab.name}
                      className={`breadcrumb-item col-auto flex-grow-0 m-0 d-inline-flex align-items-center ${
                        index === selectedTab ? "active" : ""
                      }`}
                      aria-current="page"
                    >
                      <p className="p-0 mb-0">{tab.name}</p>
                    </li>
                  );
                })}
              </ol>
            </nav>
            <h2 className="row display-5 fw-bolder px-2 py-3 m-0">
              {tabs[selectedTab].name}
            </h2>
            <div
                className="row flex-column justify-content-between h-80"
                style={{minHeight: '35vh'}}
            >
              <form
                className="needs-validation"
                onSubmit={handleSubmit}
                noValidate
              >
                {tabs[selectedTab].inputs.length > 0 && (
                  <>
                    {tabs[selectedTab].inputs.map((input) => {
                      const { name, type, isRequired } = input;
                      return (
                        <Input
                          value={formInfo[name.toLowerCase()]}
                          key={name}
                          fieldName={name}
                          fieldType={type}
                          isRequired={isRequired}
                          onChange={handleInputChange}
                          errorMessage={formErrors[name.toLowerCase()] || ""}
                        />
                      );
                    })}
                  </>
                )}
                {selectedTab === 2 && (
                  <h1 class="display-1 fw-bold p-0 m-0" style={{fontSize: '140px', lineHeight: '1em'}}>{`$${
                    formInfo.quantity * pricePerItem
                  }`}</h1>
                )}

                {selectedTab === 3 && (
                  <p>✅ Your email was send successfully</p>
                )}
              </form>
              <div className="col-12 d-flex align-self-start">
                <button
                  style={{ backgroundColor: "var(--blue)" }}
                  type="submit"
                  className="btn btn-primary ml-3"
                  onClick={handleSubmit}
                >
                  {selectedTab === 2 ? 'Send to Email' : 'Continue'}
                </button>
                {selectedTab > 0 && (
                  <button
                    style={{ color: "var(--blue)" }}
                    className="btn btn-light ms-3"
                    onClick={handleBackButton}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-arrow-left-short"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
                      />
                    </svg>
                    Back
                  </button>
                )}
            </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
