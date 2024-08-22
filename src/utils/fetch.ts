import NextTags from '@/types/nextTags';

type FetchResponse = {
  ok: boolean;
  json: any;
};

export const queryFetch = async (url: string, options: RequestInit = {}): Promise<FetchResponse> => {
  const res = await fetch(`${process.env.MOCKAPI_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  });
  const data = await res.json();

  return {
    ok: res.ok,
    json: data
  };
};

export const fetchPost = async (url: string, data: any, tags?: NextTags[]) => {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(data)
  };

  if (tags) {
    options.next = { tags };
  }

  const res = await queryFetch(url, options);

  return res;
};

export const fetchPut = async (url: string, data: any, tags?: NextTags[]) => {
  const options: RequestInit = {
    method: 'PUT',
    body: JSON.stringify(data)
  };

  if (tags) {
    options.next = { tags };
  }

  const res = await queryFetch(url, options);

  return res;
};

export const fetchDelete = async (url: string, tags?: NextTags[]) => {
  const options: RequestInit = {
    method: 'DELETE'
  };

  if (tags) {
    options.next = { tags };
  }

  const res = await queryFetch(url, options);

  return res;
};

export const fetchGet = async (url: string, data: any, tags?: NextTags[]) => {
  url = data ? `${url}?${new URLSearchParams(data).toString()}` : url;

  const options: RequestInit = {
    method: 'GET'
  };

  if (tags) {
    options.next = { tags };
  }

  const res = await queryFetch(url, options);

  return res;
};
