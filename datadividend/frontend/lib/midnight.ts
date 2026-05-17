// datadividend/frontend/lib/midnight.ts
export type NetworkId = 'undeployed' | 'mainnet' | 'preview' | 'preprod';

export interface WalletState {
  address: string;
  coinPublicKey: string;
  encryptionPublicKey: string;
}

export interface MidnightWalletAPI {
  apiVersion: string;
  name: string;
  icon: string;
  connect: (networkId: NetworkId) => Promise<ConnectedAPI>;
  enable: () => Promise<ConnectedAPI>;
}

export interface ConnectedAPI {
  state?: () => Promise<WalletState>;
  getShieldedAddresses?: () => Promise<string[]>;
  getUnshieldedAddress?: () => Promise<string>;
  serviceUriConfig?: () => Promise<any>;
}

declare global {
  interface Window {
    midnight?: {
      mnLace?: MidnightWalletAPI;
      [key: string]: MidnightWalletAPI | undefined;
    };
  }
}

/**
 * Connects to the Midnight Wallet (e.g., Lace for Midnight)
 * @returns The connected wallet state and API
 */
export async function connectMidnightWallet(networkId: NetworkId = 'preprod') {
  if (typeof window === 'undefined') {
    throw new Error('Cannot connect to wallet on the server side');
  }

  const midnight = window.midnight;
  if (!midnight) {
    throw new Error('Midnight wallet extension not found. Please install the Midnight Lace wallet.');
  }

  // Attempt to use mnLace, or fallback to the first available wallet
  const walletId = midnight.mnLace ? 'mnLace' : Object.keys(midnight)[0];
  const wallet = midnight[walletId];

  if (!wallet) {
    throw new Error('No compatible Midnight wallet found.');
  }

  try {
    // Some versions use connect(), some use enable()
    const walletAPI = wallet.connect ? await wallet.connect(networkId) : await wallet.enable();
    
    let address = "Unknown Address";
    if (walletAPI.getUnshieldedAddress) {
      address = await walletAPI.getUnshieldedAddress();
    } else if (walletAPI.getShieldedAddresses) {
      const addresses = await walletAPI.getShieldedAddresses();
      address = addresses[0] || address;
    } else if (walletAPI.state) {
      const state = await walletAPI.state();
      address = state.address;
    }
    
    return {
      walletId,
      state: { address, coinPublicKey: "", encryptionPublicKey: "" },
      api: walletAPI
    };
  } catch (error) {
    console.error('Failed to connect to Midnight wallet:', error);
    throw new Error('Failed to connect to the wallet. User may have rejected the request.');
  }
}
