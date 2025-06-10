import { GraphQLClient, gql } from 'graphql-request';
import { THEGRAPH_CONFIG } from '../config/thegraph';

// Create GraphQL client with API key in Authorization header
export const graphClient = new GraphQLClient(THEGRAPH_CONFIG.API_URL, {
  headers: {
    Authorization: `Bearer ${THEGRAPH_CONFIG.AUTH_TOKEN}`,
  },
});

// Query to get user data including friends (referrals)
export const GET_USER_WITH_FRIENDS = gql`
  query GetUserWithFriends($userId: String!) {
    user(id: $userId) {
      id
      referrals {
        id
        vipLevel
        nodePurchasedTotal
        childrenAmountIn10Levels
        referrals {
          id
        }
      }
      vipLevel
      nodePurchasedTotal
      childrenAmountIn10Levels
    }
  }
`;

// Type definitions based on the schema
export interface User {
  id: string;
  referrer?: User;
  referrals: User[];
  vipLevel: number;
  nodePurchasedTotal: string;
  childrenAmountIn10Levels: number;
}

// Function to fetch user data with friends
export async function getUserWithFriends(address: string): Promise<User | null> {
  try {
    const { user } = await graphClient.request<{ user: User }>(GET_USER_WITH_FRIENDS, {
      userId: address.toLowerCase(),
    });
    return user;
  } catch (error) {
    console.error('Error fetching user data from TheGraph:', error);
    return null;
  }
}

// Function to get address from URL parameter if present
export function getAddressFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('address');
}
