declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_TENDERLY_USER: string;
    NEXT_PUBLIC_TENDERLY_PROJECT: string;
    TENDERLY_ACCESS_KEY: string;
    NEXT_PUBLIC_TENDERLY_FORK_ID: string;
    NEXT_PUBLIC_OWNER_ADDRESS: string;
  }
}
