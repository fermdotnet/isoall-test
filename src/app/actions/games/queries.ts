import { Game } from '@/types/game';
import { notFound } from 'next/navigation';
import { fetchGet } from '@/utils/fetch';
import NextTags from '@/types/nextTags';

const GAME_NOT_FOUND = 'Not found';

export async function listGames() {
  const res = await fetchGet('/games', {}, [NextTags.GAME]);

  return res.json as Game[];
}

export async function getGame(id: string) {
  const res = await fetchGet(`/games/${id}`, {}, [NextTags.GAME]);

  if (res.json === GAME_NOT_FOUND) {
    notFound();
  }

  return res.json as Game;
}
