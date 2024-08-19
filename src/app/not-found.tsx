import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h1>Oops!</h1>
      <h2>Page not found</h2>
      <br />
      <p>Could not find requested resource</p>
      <br />
      <br />
      <Link href="/">Return Home</Link>
    </div>
  );
}
