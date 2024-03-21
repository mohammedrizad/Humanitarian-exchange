import React, { useContext, useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import "./Donate.css"; // Import the provided CSS file
import { TransactionContext } from "../context/TransactionContext";

function Donate() {
  const {
    connectWallet,
    currentAccount,
    donateFormData,
    sendTransaction,
    handleDonateChange,
  } = useContext(TransactionContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      firstname,
      location,
      phone,
      email,
      description,
      availability,
      transactionType,
    } = donateFormData;

    if (
      !firstname ||
      !location ||
      !phone ||
      !email ||
      !description ||
      !availability ||
      !transactionType
    ) {
      // Handle form validation, if needed
      return;
    }

    try {
      // Set isLoading to true before sending the transaction
      setIsLoading(true);

      // Assuming sendTransaction is an async function that sends the transaction
      await sendTransaction(donateFormData);

      // Optionally, you can add logic here to handle the successful submission
      console.log("Donation submitted successfully!");

      // Show toast message on successful submission
      toast.success('Donation submitted successfully!', {
        duration: 3000, // Auto close the toast after 3 seconds
        position: 'top-right',
      });

      // Set the transactionType back to 'Donation' after submission
      handleDonateChange({ target: { value: "Donation" } }, "transactionType");
    } catch (error) {
      console.error("Error while processing donation:", error);
      // Handle the error as needed
    } finally {
      // Set isLoading back to false, even in case of an error
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Reset form fields when isLoading becomes false
    if (!isLoading) {
      handleDonateChange({ target: { value: "" } }, "firstname");
      handleDonateChange({ target: { value: "" } }, "location");
      handleDonateChange({ target: { value: "" } }, "phone");
      handleDonateChange({ target: { value: "" } }, "email");
      handleDonateChange({ target: { value: "" } }, "description");
      handleDonateChange({ target: { value: "" } }, "availability");
    }
  }, [isLoading]);

  return (
    <div className="app donate-component">
      <div className="donate-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1>Donate resource</h1>

          {[
            { name: "Name", icon: "bx bx-user", value: "firstname" },
            { name: "Location", icon: "bx bx-map", value: "location" },
            { name: "Phone Number", icon: "bx bx-phone", value: "phone" },
            { name: "Email", icon: "bx bx-envelope", value: "email" },
            { name: "Description", icon: "bx bx-file", value: "description" },
            { name: "Available Quantity", icon: "bx bx-cube", value: "availability" },
          ].map((field) => (
            <div key={field.value} className="input-box">
              <i className={field.icon}></i>
              <input
                placeholder={field.name}
                type={field.value === "phone" ? "tel" : "text"}
                value={donateFormData[field.value]}
                onChange={(e) => handleDonateChange(e, field.value)}
              />
            </div>
          ))}

          <div className="input-box">
            <i className="bx bx-lock"></i>
            <input
              type="text"
              value={donateFormData.transactionType || "Donation"}
              onChange={(e) => handleDonateChange(e, "transactionType")}
              readOnly // Add the readOnly attribute
            />
          </div>

          <button
            type="submit"
            className={`login-btn relative ${isLoading ? "disabled" : ""}`}
          >
            {isLoading && (
              <div className="loader-container">
                {/* Use the correct class here */}
                <div></div>
              </div>
            )}
            {isLoading ? "Donating..." : "Donate"}
          </button>
        </form>
      </div>

      <div className="wallet-and-info-container">
        <div className="wallet-container">
          {!currentAccount ? (
            <button className="connect-wallet-button" onClick={connectWallet}>
              Connect Wallet
            </button>
          ) : (
            <button
              className="connect-wallet-button"
              onClick={() =>
                window.open(
                  `https://sepolia.etherscan.io/address/${currentAccount}`,
                  "_blank"
                )
              }
            >
              Metamask Connected!
            </button>
          )}
        </div>

        <div className="blockchain-info">
          <p>
            <strong style={{ color: "red", fontSize: "1.5em" }}>
              Attention❗
            </strong>
            <br />
            Your contributions matter! Every piece of information you provide,
            whether it's a donation or a request, is securely added as an
            immutable block to the blockchain. This ensures that your data is
            tamper-proof, transparent, and completely secure. Rest assured, the
            blockchain technology we employ guarantees the integrity and safety
            of your valuable contributions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Donate;
