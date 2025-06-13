// TheGraph API configuration


const isTestnetEnabled = process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'

const API_DEV ="https://api.studio.thegraph.com/query/112229/ffnode/version/latest"
const API_PROD = "https://gateway.thegraph.com/api/subgraphs/id/CMUuXG1X3WrGti4oeRNnqKohXCgmkFPuSWMk5MnQVQcz"

export const THEGRAPH_CONFIG = {
  API_URL: isTestnetEnabled ? API_DEV : API_PROD,
  AUTH_TOKEN: "ef5a2e0162b39dbba2391a0ea6ade8d6"
};
