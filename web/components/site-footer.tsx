import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-800 px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-center text-sm text-zinc-500 sm:text-left">
          © {new Date().getFullYear()} ObsidianAI. Orlando, FL ·{" "}
          <a href="mailto:team@obsidianai.org" className="text-cyan-500 hover:underline">
            team@obsidianai.org
          </a>
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-400">
          <Link href="#pricing" className="hover:text-cyan-300">
            Pricing
          </Link>
          <a
            href="https://github.com/abowden101/ObsidianAI"
            className="hover:text-cyan-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
