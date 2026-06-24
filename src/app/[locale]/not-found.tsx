import { Link } from "@/i18n/routing";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-6 text-center">
      <span className="font-display text-7xl font-bold text-leaf-400">404</span>
      <p className="text-slate-400">Bu sayfa bulunamadı · Seite nicht gefunden · Page not found</p>
      <Link
        href="/"
        className="rounded-full bg-leaf-500 px-6 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-leaf-400"
      >
        GreenPostel Global →
      </Link>
    </main>
  );
}
