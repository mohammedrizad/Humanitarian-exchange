import React, { useContext, useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { TransactionContext } from "../context/TransactionContext";
import "./RequestStyles.css"; // Import the specific styling for Request component

function Request() {
  const {
    connectWallet,
    currentAccount,
    requestFormData,
    sendTransaction,
    handleRequestChange,
  } = useContext(TransactionContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstname, location, description, availability } = requestFormData;

    if (!firstname || !location || !description || !availability) {
      // Handle form validation, if needed
      return;
    }

    try {
      // Set isLoading to true before sending the transaction
      setIsLoading(true);

      // Assuming sendTransaction is an async function that sends the transaction
      await sendTransaction(requestFormData);

      // Optionally, you can add logic here to handle the successful submission
      console.log("Request submitted successfully!");

      // Show toast message on successful submission
      toast.success('Request submitted successfully!', {
        duration: 3000, // Auto close the toast after 3 seconds
        position: 'top-right',
      });

      // Set the transactionType back to 'Request' after submission
      handleRequestChange({ target: { value: "Request" } }, "transactionType");
    } catch (error) {
      console.error("Error while processing request:", error);
      // Handle the error as needed
    } finally {
      // Set isLoading back to false, even in case of an error
      setIsLoading(false);

      // Reset form fields when isLoading becomes false
      handleRequestChange({ target: { value: "" } }, "firstname");
      handleRequestChange({ target: { value: "" } }, "location");
      handleRequestChange({ target: { value: "" } }, "description");
      handleRequestChange({ target: { value: "" } }, "availability");
    }
  };

  return (
    <div className="app request-component">
      <Toaster position="top-right" />

      <div className="donate-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1>Request Resource</h1>

          {/* Name input field with icon */}
          <div className="input-box">
            <i className="bx bx-user"></i>
            <input
              placeholder="Name"
              type="text"
              value={requestFormData.firstname}
              onChange={(e) => handleRequestChange(e, "firstname")}
            />
          </div>

          {/* Location input field with icon */}
          <div className="input-box">
            <i className="bx bx-map"></i>
            <input
              placeholder="Location"
              type="text"
              value={requestFormData.location}
              onChange={(e) => handleRequestChange(e, "location")}
            />
          </div>

          {/* Description input field with icon */}
          <div className="input-box">
            <i className="bx bx-file"></i>
            <input
              placeholder="Description"
              type="text"
              value={requestFormData.description}
              onChange={(e) => handleRequestChange(e, "description")}
            />
          </div>

          {/* Availability input field with icon */}
          <div className="input-box">
            <i className="bx bx-cube"></i>
            <input
              placeholder="Desired Quantity"
              type="text"
              value={requestFormData.availability}
              onChange={(e) => handleRequestChange(e, "availability")}
            />
          </div>

          {/* Transaction Type input field with icon */}
          <div className="input-box">
            <i className="bx bx-lock"></i>
            <input
              type="text"
              value={requestFormData.transactionType || "Request"}
              onChange={(e) => handleRequestChange(e, "transactionType")}
              readOnly // Add the readOnly attribute
            />
          </div>

          <button type="submit" className={`login-btn ${isLoading ? "disabled" : ""}`}>
            {isLoading ? "Requesting..." : "Request"}
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
            <>
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
            </>
          )}
        </div>

        <div className="blockchain-info">
          <p>
            <strong style={{ color: "red", fontSize: "1.5em" }}>
              Attention❗
            </strong>
            <br />
            Your impact is significant! Every donation and request you make is securely etched into the unalterable foundation of the blockchain.
            This guarantees that your data remains inviolable, transparent, and utterly secure.
            Trust in our blockchain technology to uphold the integrity and safety of your valued contributions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Request;
