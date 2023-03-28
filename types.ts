export type Video = {
  v_channel: string;
  v_name: string;
  v_id: string;
  v_date: string; //Date ISO
  version: string;
  matches?: Match[]; //to be defined
};

export type Match = {
  timestamp: string;
  players: Player[];
  video: string;
  title: string;
  date: string;
  version: string;
  channel: Channel;
};

export type Channel = {
  id: string;
  name: string;
}

export type Player = {
  characters: Character[];
  name: string;
}

export type Character = {
  id: string;
  name: string;
  iconUrl: string;
}
