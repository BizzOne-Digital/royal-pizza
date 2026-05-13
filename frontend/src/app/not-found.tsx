import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
      <p className="font-display text-5xl text-gold">404</p>
      <h1 className="mt-4 font-display text-2xl text-cream">Page not found</h1>
      <p className="mt-2 text-sm text-cream/70">
        That address is not on our map. Head back to the Royal.
      </p>
      <Link
        href="/"
        className="ribbon-red mt-8 rounded-md px-8 py-3 text-sm font-semibold text-cream"
      >
        Return home
      </Link>
    </div>
  );
}
