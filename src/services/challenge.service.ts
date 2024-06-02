import { Api } from "@/provider";
import axios from "axios";

export const ChallengeService = {
  async onOpenChallenge(
    walletId: string,
    shipId: number,
    typeGame: number,
    durationGame: number
  ) {
    try {
      const payload = {
        operations: [
          {
            functionSignature: "openChallenge(uint256,uint8,uint8)",
            argumentsValues: [Number(shipId), typeGame, durationGame],
            messageValue: 0,
          },
        ],
        contractAddress: "0xeC0b52dA681658a2627cC89B0e20bC74f424C2bE",
        walletId,
      };
      const { data } = await Api.post("/transactions/custom", payload);
      await new Promise((resolve) => setTimeout(resolve, 30 * 1000));
      const hashRes = await Api.get(`/transactions/${data.id}`);
      const hash = hashRes.data.transactionHash;
      return hash;
    } catch (error) {
      console.error(error);
    }
  },

  async onPickChallenge(walletId: string, gameId: number, shipId: number) {
    try {
      const payload = {
        walletId,
        contractAddress: "0xeC0b52dA681658a2627cC89B0e20bC74f424C2bE",
        operations: [
          {
            functionSignature: "pickChallenge(uint256, uint256)",
            argumentsValues: [Number(gameId), Number(shipId)],
            messageValue: 0,
          },
        ],
      };
      const { data } = await Api.post("/transactions/custom", payload);
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

  async onPlayChallenge(
    walletId: string,
    shipId: number,
    gameId: number,
    pointsToBet: number
  ) {
    try {
      const payload = {
        walletId,
        contractAddress: "0xeC0b52dA681658a2627cC89B0e20bC74f424C2bE",
        operations: [
          {
            functionSignature: "playChallenge(uint256,uint256,uint256)",
            argumentsValues: [shipId, gameId, pointsToBet],
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

  async onPlayPoints(walletId: string, shipId: number, betPoints: number) {
    try {
      const payload = {
        walletId,
        contractAddress: "0xeC0b52dA681658a2627cC89B0e20bC74f424C2bE",
        operations: [
          {
            functionSignature: "playPoints(uint256, uint256)",
            argumentsValues: [shipId, betPoints],
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

  async getChallengesFinalizeds(address: string) {
    console.log(`{_winner: "${address}"}`);
    try {
      const data = JSON.stringify({
        query: `
        {
          challengeFinalizeds(where: {_winner: "${address}"}) {
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
      const response = await axios.request(config);
      const challenges = response.data.data.challengeFinalizeds.length;
      return challenges;
    } catch (error) {
      console.log(error);
    }
  },

  async getAvailableChallenges() {
    try {
      const data = JSON.stringify({
        query: `
        {
          challengeOpens(orderBy: blockTimestamp, orderDirection: desc) {
            _type
            _user
            _tokenId
            _choice
            gameid
          }
          challengeAccepteds(orderBy: blockTimestamp, orderDirection: desc) {
            _tokenId
            _user
            gameid
          }
          challengeFinalizeds(orderBy: blockTimestamp, orderDirection: desc) {
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
      const response = await axios.request(config);
      const arrays = response.data.data;

      const { challengeOpens, challengeAccepteds, challengeFinalizeds } =
        arrays;

      const filteredChallengeOpens = challengeOpens.filter(
        (open: any) =>
          !challengeFinalizeds.some(
            (finalized: any) => finalized.gameid === open.gameid
          )
      );

      const updatedChallengeOpens = filteredChallengeOpens.map((open: any) => {
        const isAccepted = challengeAccepteds.some(
          (accepted: any) => accepted.gameid === open.gameid
        );
        return { ...open, disabled: isAccepted };
      });

      console.log(updatedChallengeOpens);
      return updatedChallengeOpens;
    } catch (error) {
      console.log(error);
    }
  },

  async getNotAvailableShips() {
    try {
      const data = JSON.stringify({
        query: `
        {
          challengeOpens(orderBy: blockTimestamp, orderDirection: desc) {
            _type
            _user
            _tokenId
            _choice
            gameid
            blockTimestamp
          }
          challengeAccepteds(orderBy: blockTimestamp, orderDirection: desc) {
            _tokenId
            _user
            gameid
            blockTimestamp
          }
          challengeFinalizeds(orderBy: blockTimestamp, orderDirection: desc) {
            gameid
            blockTimestamp
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
      const arrays = response.data.data;

      const { challengeOpens, challengeAccepteds, challengeFinalizeds } =
        arrays;

      const filteredChallengeOpens = challengeOpens.filter(
        (open: any) =>
          !challengeFinalizeds.some(
            (finalized: any) => finalized.gameid === open.gameid
          )
      );

      const availableShips = filteredChallengeOpens.map((open: any) => {
        const tokenIdAccepted = challengeAccepteds.find(
          (e: any) => Number(e.gameid) === Number(open.gameid)
        );
        const tokenId2 = tokenIdAccepted?._tokenId;
        const user2 = tokenIdAccepted?._user;
        const blockTimestamp2 = tokenIdAccepted?.blockTimestamp;
        return { ...open, tokenId2, user2, blockTimestamp2 };
      });
      return availableShips;
    } catch (error) {
      console.log(error);
    }
  },

  async fetchLog(hash: string) {
    try {
      const data = JSON.stringify({
        query: `
        {
          transfers(where: {transactionHash: "${hash}"}) {
            gameId
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

  async getBets(gameId: string | number) {
    try {
      const data = JSON.stringify({
        query: `
        {
          betedOnChallenges(
            where: {gameid: "${gameId}"}
            orderBy: blockTimestamp
            orderDirection: desc
            first: 1
          ) {
            _totalAmount1
            _totalAmount2
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
      const bets = response.data.data.betedOnChallenges;
      return bets;
    } catch (error) {
      console.log(error);
    }
  },

  async getChallengePoints(gameId: string | number) {
    try {
      const data = JSON.stringify({
        query: `
        {
          updatedChallengePoints_collection(
            orderBy: blockTimestamp
            where: {gameid: "${gameId}"}
            first: 1
            orderDirection: desc
          ) {
            _address1
            _address2
            _points1
            _points2
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
      const challengePoints =
        response.data.data.updatedChallengePoints_collection;
      return challengePoints;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};
