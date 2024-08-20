'use server';
import { redirect, notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import type { Game } from '@/types/game';
import type { GameFormData } from '@/types/form';

const GAME_NOT_FOUND = 'Not found';

export async function listGames() {
  const res = await fetch(`${process.env.MOCKAPI_URL}/games`);
  const games = await res.json();

  return games as Game[];
}

export async function getGame(id: string) {
  const res = await fetch(`${process.env.MOCKAPI_URL}/games/${id}`);
  const game = await res.json();

  if (game === GAME_NOT_FOUND) {
    notFound();
  }

  return game as Game;
}

export async function createGame(game: GameFormData) {
  const res = await fetch(`${process.env.MOCKAPI_URL}/games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...game,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  });

  if (res.ok) {
    revalidatePath('/');
    redirect('/');
  }

  return res.ok;
}

export async function updateGame(id: string, game: GameFormData) {
  const current = await getGame(id);

  const res = await fetch(`${process.env.MOCKAPI_URL}/games/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...current,
      ...game,
      updatedAt: new Date().toISOString()
    })
  });

  if (res.ok) {
    revalidatePath('/');
    revalidatePath(`/games/${id}`);
    redirect(`/games/${id}`);
  }

  return res.ok;
}

export async function deleteGame(id: string) {
  const res = await fetch(`${process.env.MOCKAPI_URL}/games/${id}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    revalidatePath('/');
    redirect('/');
  }

  return res.ok;
}
