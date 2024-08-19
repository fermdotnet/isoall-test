'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import type { Game } from '@/types/game';
import type { GameFormData } from '@/types/form';

export async function listGames() {
  const res = await fetch(`${process.env.MOCKAPI_URL}/games`);
  const games = await res.json();

  return games as Game[];
}

export async function getGame(id: string) {
  const res = await fetch(`${process.env.MOCKAPI_URL}/games/${id}`);
  const game = await res.json();

  return game as Game;
}

export async function createGame(game: GameFormData) {
  const res = await fetch(`${process.env.MOCKAPI_URL}/games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...game,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }),
  });

  if (res.ok) {
    revalidatePath('/');
    redirect('/');
  }

  return res.ok;
}

export async function updateGame(id: string, game: GameFormData) {
  const res = await fetch(`${process.env.MOCKAPI_URL}/games/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(game),
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
    method: 'DELETE',
  });

  if (res.ok) {
    revalidatePath('/');
    redirect('/');
  }

  return res.ok;
}
