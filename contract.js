import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://base.llamarpc.com");
const message = "Sign to prove you own the address";
const contractAddress = "0x83102E2Dc04CF0d2879C4F5dbD17246Fec2C963a";

// Function to sign the message 
export const signMessage = async (privateKey) => {
    const wallet = new ethers.Wallet(privateKey, provider);
    try {
        const signedMessage = await wallet.signMessage(message);
        return signedMessage;

    } catch (error) {
        console.error("Error signing message:", error);
    }
};

const abi = [
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "signature",
                "type": "bytes"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// Function to mint 
export const mintNft = async (privateKey, signature) => {
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, abi, wallet);

    try {
        const transaction = await contract.mint(signature, {
            gasLimit: 300000,
        });
        console.log("Mint Nft transaction sent. Waiting for confirmation...");

        await transaction.wait();
        console.log(`Nft have been succesfully minted, hash: https://basescan.org/tx/${transaction.hash}`);
        return transaction.hash;
    } catch (error) {
        console.error("Error interacting with the contract:", error);
        return null;
    }
};

const provider_base = new ethers.JsonRpcProvider("https://sepolia.base.org");
const couponabi = [
    {
        "inputs": [],
        "name": "claim",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

export const claimCoupon = async (privateKey) => {
    const wallet = new ethers.Wallet(privateKey, provider_base);
    const contract = new ethers.Contract("0xb01866F195533dE16EB929b73f87280693CA0cB4", couponabi, wallet);

    try {
        const transaction = await contract.claim({
            gasLimit: 300000,
        });
        console.log("Claim transaction sent. Waiting for confirmation...");

        await transaction.wait();
        console.log(`Coupon claimed successfully, hash: https://sepolia.basescan.org/tx/${transaction.hash}`);
        return transaction.hash;
    } catch (error) {
        console.error("Error interacting with the contract:", error);
        return null;
    }
};