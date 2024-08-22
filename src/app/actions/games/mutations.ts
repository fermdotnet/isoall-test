'use server';

import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';
import { fetchPost, fetchPut, fetchGet, fetchDelete } from '@/utils/fetch';
import type { GameFormData } from '@/types/form';
import { GameSchema } from '@/types/form';
import nextTags from '@/types/nextTags';

export async function createGame(game: GameFormData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Unauthorized');
  }

  const result = GameSchema.safeParse(game);

  if (!result.success) {
    throw new Error('Invalid game data');
  }

  const data = {
    ...game,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const res = await fetchPost('/games', data, [nextTags.GAME]);

  if (res.ok) {
    revalidateTag(nextTags.GAME);
    redirect('/');
  }

  return res.ok;
}

export async function updateGame(id: string, game: GameFormData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Unauthorized');
  }

  const result = GameSchema.safeParse(game);

  if (!result.success) {
    throw new Error('Invalid game data');
  }

  const current = (await fetchGet(`/games/${id}`, {}, [nextTags.GAME])).json;

  const res = await fetchPut(
    `/games/${id}`,
    {
      ...current,
      ...game,
      updatedAt: new Date().toISOString()
    },
    [nextTags.GAME]
  );

  if (res.ok) {
    revalidateTag(nextTags.GAME);
    redirect(`/games/${id}`);
  }

  return res.ok;
}

export async function deleteGame(id: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Unauthorized');
  }

  const res = await fetchDelete(`/games/${id}`, [nextTags.GAME]);

  if (res.ok) {
    revalidateTag(nextTags.GAME);
    redirect('/');
  }

  return res.ok;
}
