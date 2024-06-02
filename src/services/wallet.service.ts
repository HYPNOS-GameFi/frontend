import { IUser } from "@/interfaces/IUser";
import { Api } from "@/provider";
import axios from "axios";

export const WalletService = {
  async getWallets() {
    try {
      const { data } = await Api.get("/wallets");
      return data;
    } catch (error) {
      console.error(error);
    }
  },

  async createWallet() {
    try {
      const { data } = await Api.post("/wallets");
      return data as IUser;
    } catch (error) {
      console.error(error);
    }
  },

  async getPointsProfile(address: string) {
    try {
      const data = JSON.stringify({
        query: `
    {
      updatedPoints_collection(
        where: {_address: "${address}"}
        first: 1
        orderBy: blockTimestamp
        orderDirection: desc
      ) {
        _points
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
      const collection = response.data.data.updatedPoints_collection[0];
      return collection;
    } catch (error) {
      console.log(error);
    }
  },

  async getShipsTo(address: string) {
    try {
      const data = JSON.stringify({
        query: `
        {
          transfers(where: {to: "${address}"}) {
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
      const tokens = response.data.data.transfers;
      return tokens;
    } catch (error) {
      console.log(error);
    }
  },

  async getShipsFrom(address: string) {
    try {
      const data = JSON.stringify({
        query: `
        {
          transfers(where: {from: "${address}"}) {
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
      const tokens = response.data.data.transfers;
      return tokens;
    } catch (error) {
      console.log(error);
    }
  },

  async getShipInfo(shipId: string | number) {
    try {
      const data = JSON.stringify({
        query: `
        {
          shipMinteds(where: {_tokenId: "${shipId}"}) {
            _tokenId
            _shipClass
            _metadata
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
      const tokens = response.data.data.shipMinteds[0];
      return tokens;
    } catch (error) {
      console.log(error);
    }
  },

  async getUserShips(address: string) {
    try {
      const tokensTo = await this.getShipsTo(address);
      const tokensFrom = await this.getShipsFrom(address);
      const filteredTokensTo = tokensTo.filter(
        (tokenTo: any) =>
          !tokensFrom.some(
            (tokenFrom: any) => tokenFrom.tokenId === tokenTo.tokenId
          )
      );
      const infoShips: any[] = [];
      const promises = filteredTokensTo.map((e: any) =>
        this.getShipInfo(e.tokenId)
      );
      const results = await Promise.all(promises);
      infoShips.push(...results);
      return infoShips;
    } catch (error) {
      console.log(error);
    }
  },
};
