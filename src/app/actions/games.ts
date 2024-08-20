'use server';

import { redirect, notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import type { Game } from '@/types/game';
import type { GameFormData } from '@/types/form';
import { GameSchema } from '@/types/form';

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
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Error('Unauthorized');
  }

  const result = GameSchema.safeParse(game);

  if (!result.success) {
    return new Error('Invalid game data');
  }

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
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Error('Unauthorized');
  }

  const result = GameSchema.safeParse(game);

  if (!result.success) {
    return new Error('Invalid game data');
  }

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
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Error('Unauthorized');
  }

  const res = await fetch(`${process.env.MOCKAPI_URL}/games/${id}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    revalidatePath('/');
    redirect('/');
  }

  return res.ok;
}
