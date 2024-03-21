// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
    uint256 public transactionCount;

    event Transfer(
        address indexed from,
        address indexed receiver,
        string firstname,
        string location,
        uint256 timestamp,
        string description,
        string availability,
        string transactionType
    );

    enum TransactionType { Donation, Request }

    struct TransferStruct {
        address sender;
        address receiver;
        string firstname;
        string location;
        uint256 timestamp;
        string description;
        string availability;
        TransactionType transactionType;
    }

    TransferStruct[] public transactions;

    function addToBlockchain(
        string memory firstname,
        string memory location,
        string memory description,
        string memory availability,
        string memory transactionType
    ) public {
        transactionCount += 1;

        // Convert the string to TransactionType enum
        TransactionType txType;
        if (keccak256(bytes(transactionType)) == keccak256(bytes("Donation"))) {
            txType = TransactionType.Donation;
        } else if (keccak256(bytes(transactionType)) == keccak256(bytes("Request"))) {
            txType = TransactionType.Request;
        } else {
            revert("Invalid transaction type");
        }

        transactions.push(TransferStruct({
            sender: msg.sender,
            receiver: msg.sender, // assuming the sender is also the receiver
            firstname: firstname,
            location: location,
            timestamp: block.timestamp,
            description: description,
            availability: availability,
            transactionType: txType
        }));

        emit Transfer(
            msg.sender,
            msg.sender,
            firstname,
            location,
            block.timestamp,
            description,
            availability,
            transactionType
        );
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}
