import { or, where, and } from "firebase/firestore";
import { MatchQuery } from "../../../components/MatchList";

export const getQueryConstraintsFromMatchQuery = (mQuery: MatchQuery) => {
   const wherePlayer1 = mQuery.p1 ? or(where('p1', '==', mQuery.p1), where('p2', '==', mQuery.p1)) : undefined;
  const wherePlayer2 = mQuery.p2 ? or(where('p1', '==', mQuery.p2), where('p2', "==", mQuery.p2)) : undefined;
  const whereP1Char = mQuery.p1chars ? or(where("p1chars", "==", mQuery.p1chars), where("p2chars", "==", mQuery.p1chars)) : undefined;
  const whereP2Char = mQuery.p2chars ? or(where("p1chars", "==", mQuery.p2chars), where("p2chars", "==", mQuery.p2chars)) : undefined;
  const whereVersion = (mQuery.versions && mQuery.versions.length > 0) ? where('version', 'in', mQuery.versions) : undefined;
  const whereChannel = (mQuery.channels && mQuery.channels.length > 0) ? where('channel', 'in', mQuery.channels) : undefined;

  return [
    wherePlayer1,
    wherePlayer2,
    whereP1Char,
    whereP2Char,
    whereVersion,
    whereChannel,
  ].filter((constraint) => constraint !== undefined);
}
