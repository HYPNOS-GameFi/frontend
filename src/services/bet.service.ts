import { Api } from "@/provider";

export const BetService = {
  async onBetOnChallenge(
    walletId: string,
    gameId: number,
    amount: number,
    shipId: number
  ) {
    try {
      const payload = {
        walletId,
        contractAddress: "0xeC0b52dA681658a2627cC89B0e20bC74f424C2bE",
        operations: [
          {
            argumentsValues: [Number(gameId), Number(amount), Number(shipId)],
            messageValue: 0,
            functionSignature: "betOnChallenge(uint256,uint256,uint256)",
          },
        ],
      };
      const { data } = await Api.post("/transactions/custom", payload);
      await new Promise((resolve) => setTimeout(resolve, 30 * 1000));
      const hashRes = await Api.get(`/transactions/${data.id}`);
      console.log(hashRes);
      const hash = hashRes.data.transactionHash;
      return hash;
    } catch (error) {
      console.error(error);
    }
  },

  async onClaimBet(walletId: string, gameId: number) {
    try {
      const payload = {
        walletId,
        contractAddress: "0xeC0b52dA681658a2627cC89B0e20bC74f424C2bE",
        operations: [
          {
            argumentsValues: [gameId],
            messageValue: 0,
            functionSignature: "claimBet(uint256)",
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

  async onClaimPolygon(walletId: string, address: string, amount: number) {
    try {
      const payload1 = {
        walletId,
        contractAddress: "0xeC0b52dA681658a2627cC89B0e20bC74f424C2bE",
        operations: [
          {
            argumentsValues: [address, Number(amount)],
            messageValue: 0,
            functionSignature: "setAirdrop(address, uint256)",
          },
        ],
      };

      const payload2 = {
        walletId,
        contractAddress: "0xeC0b52dA681658a2627cC89B0e20bC74f424C2bE",
        operations: [
          {
            argumentsValues: [Number(amount), address],
            messageValue: 0,
            functionSignature: "_distributeBet(uint256, address)",
          },
        ],
      };

      const { data: data1 } = await Api.post("/transactions/custom", payload1);
      const { data: data2 } = await Api.post("/transactions/custom", payload2);
      await new Promise((resolve) => setTimeout(resolve, 60 * 1000));
      const hashRes = await Api.get(`/transactions/${data1.id}`);
      const hashRes2 = await Api.get(`/transactions/${data2.id}`);
      const hash = hashRes.data.transactionHash;
      const hash2 = hashRes2.data.transactionHash;

      return { hash, hash2 };
    } catch (error) {
      console.error(error);
    }
  },

  async getMyBets(address: string) {
    try {
      const data = JSON.stringify({
        query: `
        {
          betedOnChallenges(
            orderBy: blockTimestamp
            orderDirection: desc
            where: {_address: "${address}"}
          ) {
            _address
            _tokenId
            _totalAmount1
            _totalAmount2
            gameid
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
      const response = await Api.request(config);
      const bets = response.data.data.betedOnChallenges;
      return bets;
    } catch (error) {
      console.log(error);
    }
  },
};
