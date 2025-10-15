import { Transaction } from "@mysten/sui/transactions";
import { MIST_PER_SUI } from "@mysten/sui/utils";

export const buyHero = (packageId: string, listHeroId: string, priceInSui: string) => {
  const tx = new Transaction();

  // TODO: Convert SUI to MIST (1 SUI = 1,000,000,000 MIST)
  // Hints:
  // const priceInMist = ?
  // TODO: Split coin for exact payment
  // Hints  
  // Use tx.splitCoins(tx.gas, [priceInMist]) to create a payment coin
  // const [paymentCoin] = ?
  // TODO: Add moveCall to buy a hero
  // Function: `${packageId}::marketplace::buy_hero`
  // Arguments: listHeroId (object), paymentCoin (coin)
  // Hints:
  // Use tx.object() for the ListHero object
  // Use the paymentCoin from splitCoins for payment
  const priceInMist = BigInt(priceInSui) * MIST_PER_SUI;
  const [paymentCoin] = tx.splitCoins(tx.gas, [tx.pure.u64(priceInMist)]);

  tx.moveCall({
    target: `${packageId}::marketplace::buy_hero`,
    arguments: [
      tx.object(listHeroId),
      paymentCoin,
    ],
  })

  return tx;
};
