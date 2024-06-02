import { API } from "@/constants";
import { Api } from "@/provider";
import axios from "axios";

export const MintService = {
  async onMintUSD(walletId: string, address: string) {
    try {
      const payload = {
        contractAddress: "0x25E703DF9366Bd58E9540bEC2d4149B6966bc0d7",
        walletId,
        operations: [
          {
            functionSignature: "mint(address,uint256)",
            argumentsValues: [address, 10000000],
            messageValue: 0,
          },
        ],
      };
      const { data } = await Api.post("/transactions/custom", payload);
      await new Promise((resolve) => setTimeout(resolve, 30 * 1000));
      const hashRes = await Api.get(`/transactions/${data.id}`);
      const hash = hashRes.data;
      return hash;
    } catch (error) {
      console.error(error);
    }
  },

  async onMintClass(walletId: string, shipId: number) {
    try {
      const payload = {
        contractAddress: "0xeC0b52dA681658a2627cC89B0e20bC74f424C2bE",
        walletId,
        operations: [
          {
            functionSignature: "mintClass(uint8)",
            argumentsValues: [shipId],
            messageValue: 0,
          },
        ],
      };
      const { data } = await Api.post("/transactions/custom", payload);
      await new Promise((resolve) => setTimeout(resolve, 30 * 1000));
      const hashRes = await Api.get(`/transactions/${data.id}`);
      console.log(hashRes);
      console.log("hashRes: ", hashRes);
      const hash = hashRes.data.transactionHash;
      const id = await this.fetchLogMint(hash);
      return { id, hash };
    } catch (error) {
      console.error(error);
    }
  },

  async onMintRandomize(walletId: string) {
    try {
      const payload = {
        walletId,
        contractAddress: "0xeC0b52dA681658a2627cC89B0e20bC74f424C2bE",
        operations: [
          {
            functionSignature: "mintRandomize()",
            argumentsValues: [],
            messageValue: 0,
          },
        ],
      };
      const { data } = await Api.post("/transactions/custom", payload);
      await new Promise((resolve) => setTimeout(resolve, 30 * 1000));
      const hashRes = await Api.get(`/transactions/${data.id}`);
      const hash = hashRes.data;
      return hash;
    } catch (error) {
      console.error(error);
    }
  },

  async onRandomizeClass(walletId: string, shipId: number) {
    console.log(shipId);
    const id = Number(shipId);
    console.log(id);
    try {
      const payload = {
        walletId,
        contractAddress: "0xeC0b52dA681658a2627cC89B0e20bC74f424C2bE",
        operations: [
          {
            argumentsValues: [id],
            messageValue: 0,
            functionSignature: "randomizeClass(uint256)",
          },
        ],
      };
      const { data } = await Api.post("/transactions/custom", payload);
      await new Promise((resolve) => setTimeout(resolve, 30 * 1000));
      const hashRes = await Api.get(`/transactions/${data.id}`);
      const hash = hashRes.data;
      console.log(hash);
      return hash;
    } catch (error) {
      console.error(error);
    }
  },

  async onClaimPool(walletId: string) {
    try {
      const payload = {
        walletId: "0803dc60-2123-4d78-ae65-6880753f595a",
        contractAddress: "0x99A8D5e6c7D88218F9234a73f792fb1c3665642E",
        operations: [
          {
            functionSignature: "claimPool()",
            argumentsValues: [],
            messageValue: 0,
          },
        ],
      };
      const { data } = await axios.post(`${API}/transactions/custom`, payload, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicHJvamVjdElkIjoiOGUzZmQ1M2ItNGI3OS00MDk1LTg2NmEtODBmYjQ4OWM2ZmYxIiwic2NvcGVzIjpbIlJFQURfV0FMTEVUUyIsIlJFQURfQ09OVFJBQ1RTIiwiUkVBRF9UT0tFTl9UWVBFUyIsIlJFQURfVFJBTlNBQ1RJT05TIiwiREVQTE9ZX0NPTlRSQUNUUyIsIldSSVRFX0NPTlRSQUNUUyIsIldSSVRFX0NVU1RPTV9UUkFOU0FDVElPTlMiLCJXUklURV9NSU5UUyIsIldSSVRFX01JTlRTIiwiV1JJVEVfVE9LRU5fVFlQRVMiLCJXUklURV9UUkFOU0ZFUlMiLCJXUklURV9XQUxMRVRTIiwiU0lHTl9NRVNTQUdFIl0sImlhdCI6MTcxNzM2MzY1Nn0.cmue1TN9MBpR1FQa-0fuo44PRDo-iGnpmVLfIE84oEY74uLpIvqsAkB-BUFTLqKd04K8B3REk2eetFFtt09gzwmefiPkdvXWAjqTbvbcpx4N3XaZFmb-d0b5-H-ATheoBAYfLHS4d68U_PRgMKMBUmRWkoYKaPVlJFB1x8n-KdL_DzXmAMeDVh_HoB33qqViw6dTCLEg7LoWvY0NVaiGTd6K57MEg1VFxSQb-Mni4GZy1zTHUjmrvEgZWMnLoALJ2c4Dy4gjfosuxHmVHs8wZcixTcTmbyYWigtkELMO1KFPkL2Z5j4qybw5j2jgcsbsbPpmYC6TCoHfalIorfM0mAV1y4gSxmxy_Hkn41OFtkvXdiKSRV_8PF6KvO-cKRjQEXHWPXa1u-D6qYUxBGZOGceADnG5BF-Sco3tKmDFYBMB6mENdnf7PsNJEBxnioQW0uKgfCYKM_rOkfN6HnWrjAymCFpJCuO1hL2VXH0U51y_ICVQ3waElSZA6i1otS0ZBE-rTv9J8N7mrWnMyqCNUOE7eI8Me_s37Qgwmbv9Bjn1uFbfV4if4G48j60PEIki_5rgLo5x9zUX3h-HMcrIQVxw2CGfYHcQQePbvW0R5KLG8KXV1_YdkaSQ9s0I9fdqqaYpq5b1-MQpMZGqtytFctxxV0MD8Gdmta5scDrUGjo",
        },
      });
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 30 * 1000));
      const hashRes = await Api.get(`/transactions/${data.id}`);
      const hash = hashRes.data;
      console.log(hash);
      return hash;
    } catch (error) {
      console.error(error);
    }
  },

  async fetchLogMint(hash: string) {
    try {
      const data = JSON.stringify({
        query: `
        {
          transfers(where: {transactionHash: "${hash}"}) {
            tokenId
          }
        }`,
      });
      const config = {
        method: "post",
        url: "https://api.studio.thegraph.com/query/77162/hypnos/v0.0.7",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      };
      const response = await axios.request(config);
      return response.data.data.transfers[0].tokenId;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};
