import { ExternalLink, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white/50 py-8 text-slate-500 text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span>Tech Stack:</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono text-[11px] border border-slate-200">
            Next.js 16
          </span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono text-[11px] border border-slate-200">
            Prisma 7
          </span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono text-[11px] border border-slate-200">
            Pothos GraphQL
          </span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono text-[11px] border border-slate-200">
            URQL
          </span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono text-[11px] border border-slate-200">
            Tailwind CSS
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/explorer"
            className="hover:text-indigo-600 flex items-center gap-1 transition"
          >
            GraphQL Explorer <ExternalLink className="w-3 h-3" />
          </a>
          <span>•</span>
          <a
            href="https://github.com/SoraKumo001/next-graphql"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 flex items-center gap-1 transition"
          >
            GitHub <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
};
