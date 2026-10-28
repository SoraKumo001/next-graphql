"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "urql";
import {
  CreateOneCategory,
  DeleteOneCategory,
  FindManyCategory,
  OrderBy,
} from "../../../graphql/query.graphql";
import {
  ArrowLeft,
  Layers,
  Plus,
  Trash2,
  Loader2,
  Tag,
  Hash,
  Inbox,
  Copy,
  Check,
} from "lucide-react";

// GraphQLのadditionalTypenamesを設定する
const context = {
  additionalTypenames: ["Category"],
};

export default function CategoryPage() {
  const [name, setName] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [{ data: dataCategory, fetching: fetchingList }] = useQuery({
    query: FindManyCategory,
    context,
    variables: { orderBy: { name: OrderBy.Asc } },
  });

  const [{ fetching: fetchingCreate }, createCategory] = useMutation(CreateOneCategory);
  const [, deleteCategory] = useMutation(DeleteOneCategory);

  // カテゴリの作成
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    await createCategory({
      input: {
        name: trimmed,
      },
    });

    setName("");
  };

  // カテゴリの削除
  const handleDeleteCategory = (id: string, categoryName: string) => {
    if (confirm(`カテゴリ「${categoryName}」を削除してもよろしいですか？`)) {
      deleteCategory({ where: { id } });
    }
  };

  // IDのコピー
  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = dataCategory?.findManyCategory ?? [];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* 戻るリンク & ヘッダー */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-indigo-600 transition mb-3 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>投稿一覧へ戻る</span>
        </Link>
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-xs">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                カテゴリ管理
              </h1>
              <p className="text-xs text-slate-500">
                投稿にタグ付けするカテゴリの追加・一覧・削除
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {categories.length} カテゴリ
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* 新規カテゴリ追加カード */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6">
          <h2 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-500" />
            <span>新しいカテゴリを作成</span>
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Tag className="w-4 h-4" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="カテゴリ名（例: 技術メモ, 日記, React）"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>
            <button
              type="submit"
              disabled={fetchingCreate || !name.trim()}
              className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              {fetchingCreate ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>作成中...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>追加する</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* カテゴリ一覧カード */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-800">
              登録済みカテゴリ
            </h2>
            <span className="text-xs text-slate-400">
              全 {categories.length} 件
            </span>
          </div>

          {fetchingList && categories.length === 0 ? (
            <div className="py-12 text-center">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-500 mx-auto mb-2" />
              <p className="text-xs text-slate-400">カテゴリを読み込んでいます...</p>
            </div>
          ) : categories.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="py-3.5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-slate-50/50 -mx-3 px-3 rounded-xl transition"
                >
                  {/* カテゴリ名とID（省略せずにフルネームを表示） */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                      <span className="font-semibold text-slate-900 text-base break-words">
                        {category.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 pl-4">
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">
                        <Hash className="w-3 h-3 text-slate-400" />
                        {category.id}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyId(category.id)}
                        className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-indigo-600 transition"
                        title="IDをコピー"
                      >
                        {copiedId === category.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span className="text-emerald-600">コピー完了</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>IDコピー</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* 削除ボタン */}
                  <div className="flex items-center justify-end sm:justify-start pl-4 sm:pl-0">
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(category.id, category.name)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition"
                      title="カテゴリを削除"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>削除</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-slate-200 rounded-xl p-8 text-center">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2">
                <Inbox className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-slate-600 mb-1">
                カテゴリが登録されていません
              </p>
              <p className="text-xs text-slate-400">
                上のフォームから最初のカテゴリを追加してください。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
