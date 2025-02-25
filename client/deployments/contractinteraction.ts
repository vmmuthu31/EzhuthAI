import { ethers } from "ethers";
import ContractABI from "./abi.json";

// Contract addresses for different networks
export const CONTRACT_ADDRESSES = {
  // 44787: "0x7adc738bab6e32452d3065de9a1e77d755b50791", // celo
  // 17000: "0xc6c9fe196408c0ade5f394d930cf90ebab66511e", // holesky
  80002: "0x2B65Eba61bac37Ae872bEFf9d1932129B0ed24ee", // polygon amoy
} as const;

// Check if we're in a browser environment
const isBrowser = () => typeof window !== "undefined";
const { ethereum } = isBrowser() ? window : {};

// Contract interaction functions
export const contractUtils = {
  // Initialize provider and contract
  async getContract() {
    const provider = ethereum
      ? new ethers.providers.Web3Provider(ethereum)
      : new ethers.providers.JsonRpcProvider();

    const signer = provider.getSigner();
    const network = await provider.getNetwork();
    const contractAddress =
      CONTRACT_ADDRESSES[network.chainId as keyof typeof CONTRACT_ADDRESSES];

    return new ethers.Contract(contractAddress, ContractABI, signer);
  },

  // Mint new literature
  async mintLiterature(
    recipient: string,
    uri: string,
    title: string,
    author: string,
    year: number,
    category: string,
    workType: string,
    value: string = "0.01"
  ) {
    const contract = await this.getContract();
    const tx = await contract.mintLiterature(
      recipient,
      uri,
      title,
      author,
      year,
      category,
      workType,
      { value: ethers.utils.parseEther(value) }
    );
    return await tx.wait();
  },

  // Batch mint literature
  async batchMintLiterature(
    params: Array<{
      recipient: string;
      uri: string;
      title: string;
      author: string;
      year: number;
      category: string;
      workType: string;
    }>
  ) {
    const contract = await this.getContract();
    const tx = await contract.batchMintLiterature(params, {
      value: ethers.utils.parseEther((0.01 * params.length).toString()),
    });
    return await tx.wait();
  },

  // Get literature details
  async getLiteratureDetails(tokenId: number) {
    const contract = await this.getContract();
    const details = await contract.getLiteratureDetails(tokenId);
    return {
      metadata: details.metadata,
      owner: details.owner,
      uri: details.uri,
    };
  },

  // Get tokens by category
  async getTokensByCategory(category: string) {
    const contract = await this.getContract();
    return await contract.getTokensByCategory(category);
  },

  // Get tokens by author
  async getTokensByAuthor(author: string) {
    const contract = await this.getContract();
    return await contract.getTokensByAuthor(author);
  },

  // Get user's tokens
  async getMyTokens() {
    const contract = await this.getContract();
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    return await contract.tokensOfOwner(address);
  },

  // Verify literature
  async verifyLiterature(tokenId: number) {
    const contract = await this.getContract();
    const tx = await contract.verifyLiterature(tokenId);
    return await tx.wait();
  },

  // Update metadata
  async updateMetadata(
    tokenId: number,
    newTitle: string,
    newAuthor: string,
    newYear: number,
    newCategory: string,
    newWorkType: string
  ) {
    const contract = await this.getContract();
    const tx = await contract.updateMetadata(
      tokenId,
      newTitle,
      newAuthor,
      newYear,
      newCategory,
      newWorkType
    );
    return await tx.wait();
  },

  // Set blacklist status
  async setBlacklistStatus(account: string, status: boolean) {
    const contract = await this.getContract();
    const tx = await contract.setBlacklistStatus(account, status);
    return await tx.wait();
  },

  // Calculate royalty
  async calculateRoyalty(tokenId: number, salePrice: string) {
    const contract = await this.getContract();
    return await contract.calculateRoyalty(
      tokenId,
      ethers.utils.parseEther(salePrice)
    );
  },

  // Withdraw royalties
  async withdrawRoyalties() {
    const contract = await this.getContract();
    const tx = await contract.withdrawRoyalties();
    return await tx.wait();
  },

  // Emergency withdraw
  async emergencyWithdraw() {
    const contract = await this.getContract();
    const tx = await contract.emergencyWithdraw();
    return await tx.wait();
  },

  // Pause minting
  async pauseMinting() {
    const contract = await this.getContract();
    const tx = await contract.pauseMinting();
    return await tx.wait();
  },

  // Unpause minting
  async unpauseMinting() {
    const contract = await this.getContract();
    const tx = await contract.unpauseMinting();
    return await tx.wait();
  },
};
