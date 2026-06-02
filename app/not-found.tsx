import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-8xl mx-auto px-4 py-24 text-center">
      <div className="inline-block bg-primary text-white text-sm font-black px-3 py-1 mb-6 uppercase tracking-widest">
        404
      </div>
      <h1 className="text-4xl font-black mb-4">Page Not Found</h1>
      <p className="text-gray-500 mb-8">
        The article or page you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Link
        href="/"
        className="inline-block bg-primary text-white font-bold uppercase tracking-wider text-sm px-6 py-3 hover:bg-primary-dark transition-colors"
      >
        ← Back to Homepage
      </Link>
    </div>
  );
}
