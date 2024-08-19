'use client';
import Link from 'next/link';

export default function Error() {
  return (
    <div>
      <h1>Oops!</h1>
      <h2>Something went wrong</h2>
      <br />
      <p>An error occurred while processing your request</p>
      <br />
      <br />
      <Link href="/">Return Home</Link>
    </div>
  );
}
