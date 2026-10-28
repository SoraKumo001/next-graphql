import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { printSchema } from "graphql";
import { schema } from "@/app/graphql/schema";
import { GraphQLExplorer } from "@/components/GraphQLExplorer";

export const dynamic = "force-static";

export default function ExplorerPage() {
  const schemaStr = printSchema(schema);
  return (
    <div className="relative w-full h-[calc(100vh-4rem)]">
      {/* フローティング戻るボタン */}
      <div className="absolute top-4 left-4 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/90 text-white text-xs font-semibold rounded-lg shadow-lg hover:bg-slate-800 transition backdrop-blur-sm border border-slate-700"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>アプリへ戻る</span>
        </Link>
      </div>
      <GraphQLExplorer schema={schemaStr} />
    </div>
  );
}
