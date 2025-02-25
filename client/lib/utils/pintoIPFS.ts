import { PinataMetadata } from "./types";

// Upload a file to Pinata
export async function uploadFileToPinata(file: File) {
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  const data = new FormData();
  data.append("file", file);

  const headers = {
    pinata_api_key: process.env.PINATA_API_KEY || "",
    pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY || "",
  };

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: data,
  });

  if (!response.ok) {
    throw new Error(`IPFS pinning error: ${response.statusText}`);
  }

  return response.json();
}

// Upload a JSON to Pinata
export async function uploadJSONToPinata(jsonData: PinataMetadata) {
  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
  const headers = {
    "Content-Type": "application/json",
    pinata_api_key: process.env.PINATA_API_KEY || "",
    pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY || "",
  };
  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(jsonData),
  });

  if (!response.ok) {
    throw new Error(`IPFS pinning error: ${response.statusText}`);
  }

  return response.json();
}

// View IPFS data
export async function viewIPFSData(ipfsHash: string) {
  const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch IPFS data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error retrieving data from IPFS:", error);
    throw error;
  }
}
