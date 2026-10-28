"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "urql";
import {
  CountPost,
  CreateOnePost,
  DeleteOnePost,
  FindManyCategory,
  FindManyPost,
  OrderBy,
} from "../../graphql/query.graphql";
import {
  Send,
  Trash2,
  Calendar,
  Tag,
  FolderPlus,
  ChevronLeft,
  ChevronRight,
  Loader2,
  FileText,
  Check,
  Sparkles,
  Inbox,
  Hash,
} from "lucide-react";

const context = {
  additionalTypenames: ["Post", "Category"],
};

// 1ページに表示する投稿の数
const PageLimit = 5;

export const Home = ({ page }: { page: number }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // FindManyPostを使用して、投稿を取得する(updatedAtを降順)
  const [{ data: dataPost, fetching: fetchingPosts }] = useQuery({
    query: FindManyPost,
    variables: {
      orderBy: { updatedAt: OrderBy.Desc },
      categoriesOrderBy: { name: OrderBy.Asc },
      limit: PageLimit,
      offset: (page - 1) * PageLimit,
    },
    context,
  });

  // カテゴリ一覧
  const [{ data: dataCategory }] = useQuery({
    query: FindManyCategory,
    variables: { orderBy: { name: OrderBy.Asc } },
    context,
  });

  // 投稿の総数を取得する
  const [{ data: dataPostCount }] = useQuery({
    query: CountPost,
    context,
  });

  // 新しい投稿を作成する
  const [{ fetching: fetchingCreatePost }, createPost] =
    useMutation(CreateOnePost);
  // 投稿を削除する
  const [{ fetching: deletingPostId }, deletePost] = useMutation(DeleteOnePost);

  // カテゴリトグル
  const handleToggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // 投稿フォーム送信
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    await createPost({
      input: {
        title: title.trim() || "タイトルなし",
        content: content.trim() || "内容なし",
        categories: {
          connect: selectedCategories.map((id) => ({ id })),
        },
      },
    });

    setTitle("");
    setContent("");
    setSelectedCategories([]);
  };

  const handleDeletePost = (id: string, postTitle: string) => {
    if (confirm(`「${postTitle}」を削除してもよろしいですか？`)) {
      deletePost({ where: { id } });
    }
  };

  // 投稿の総数を取得する
  const postCounts = dataPostCount?.countPost ?? 0;
  // 投稿の総ページ数を計算する
  const postPages = Math.max(1, Math.ceil(postCounts / PageLimit));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* ヒーローセクション */}
      <div className="mb-8 text-center sm:text-left sm:flex sm:items-end sm:justify-between border-b border-slate-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next.js 16 + GraphQL App</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Posts & Categories
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Pothos、Prisma、URQL を用いたエンドツーエンドな GraphQL CRUD
            アプリケーション
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-2 justify-center">
          <Link
            href="/category"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition hover:border-slate-300"
          >
            <FolderPlus className="w-4 h-4 text-indigo-500" />
            <span>カテゴリ管理</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 左カラム：新規投稿フォーム */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 sticky top-24">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <h2 className="font-semibold text-slate-900 text-base">
              新しい投稿を作成
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5"
              >
                タイトル
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="投稿のタイトルを入力..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5"
              >
                内容
              </label>
              <textarea
                id="content"
                name="content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="投稿の内容を入力..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition resize-y"
              />
            </div>

            {/* カテゴリ選択 */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  カテゴリ
                </label>
                <Link
                  href="/category"
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-medium hover:underline inline-flex items-center gap-0.5"
                >
                  <FolderPlus className="w-3 h-3" />
                  新規追加
                </Link>
              </div>

              {dataCategory?.findManyCategory &&
              dataCategory.findManyCategory.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50/70 border border-slate-200/80 rounded-xl max-h-36 overflow-y-auto">
                  {dataCategory.findManyCategory.map((category) => {
                    const isSelected = selectedCategories.includes(category.id);
                    return (
                      <button
                        type="button"
                        key={category.id}
                        onClick={() => handleToggleCategory(category.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                          isSelected
                            ? "bg-indigo-600 text-white shadow-xs"
                            : "bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        <span>{category.name}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center">
                  <p className="text-xs text-slate-500 mb-1">
                    カテゴリがありません
                  </p>
                  <Link
                    href="/category"
                    className="text-xs text-indigo-600 font-medium hover:underline"
                  >
                    最初のカテゴリを作成する →
                  </Link>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={
                fetchingCreatePost || (!title.trim() && !content.trim())
              }
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-indigo-500/20 transition-all cursor-pointer"
            >
              {fetchingCreatePost ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>投稿中...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>投稿する</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* 右カラム：投稿一覧 & ページネーション */}
        <div className="lg:col-span-7 space-y-4">
          {/* コントロールバー */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-slate-800">
                投稿一覧
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                {postCounts} 件
              </span>
            </div>

            {/* ページネーション */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">
                Page {page} of {postPages}
              </span>
              <div className="flex items-center gap-1">
                <Link
                  href={`/?page=${page <= 1 ? 1 : page - 1}`}
                  className={`p-1.5 rounded-lg border border-slate-200 transition ${
                    page <= 1
                      ? "opacity-30 cursor-not-allowed pointer-events-none text-slate-400"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Link>
                <Link
                  href={`/?page=${page >= postPages ? postPages : page + 1}`}
                  className={`p-1.5 rounded-lg border border-slate-200 transition ${
                    page >= postPages
                      ? "opacity-30 cursor-not-allowed pointer-events-none text-slate-400"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* 投稿リスト */}
          {fetchingPosts &&
          (!dataPost?.findManyPost || dataPost.findManyPost.length === 0) ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mx-auto mb-3" />
              <p className="text-sm text-slate-500">
                投稿を読み込んでいます...
              </p>
            </div>
          ) : dataPost?.findManyPost && dataPost.findManyPost.length > 0 ? (
            <div className="space-y-3.5">
              {dataPost.findManyPost.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-sm hover:border-slate-300/90 transition-all p-5 flex flex-col justify-between group"
                >
                  <div>
                    {/* カードヘッダー */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="inline-flex items-center gap-0.5 text-[11px] font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200/60">
                            <Hash className="w-2.5 h-2.5" />
                            {post.id}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.updatedAt).toLocaleString("ja-JP", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-indigo-600 transition">
                          {post.title}
                        </h3>
                      </div>

                      {/* 削除ボタン */}
                      <button
                        type="button"
                        onClick={() => handleDeletePost(post.id, post.title)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        title="投稿を削除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* 投稿本文 */}
                    <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed mb-4">
                      {post.content}
                    </p>
                  </div>

                  {/* カテゴリタグ一覧 */}
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100">
                      <Tag className="w-3 h-3 text-slate-400" />
                      {post.categories.map((category) => (
                        <span
                          key={category.id}
                          className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200/80"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 shadow-xs p-12 text-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <Inbox className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-700 mb-1">
                投稿がありません
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                左のフォームからタイトルと内容を入力して、最初の投稿を作成してみましょう。
              </p>
            </div>
          )}

          {/* 下部ページネーション (複数ページある場合のみ) */}
          {postPages > 1 && (
            <div className="flex justify-center items-center gap-2 pt-2">
              <Link
                href={`/?page=${page <= 1 ? 1 : page - 1}`}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium transition ${
                  page <= 1
                    ? "opacity-30 cursor-not-allowed pointer-events-none text-slate-400"
                    : "bg-white text-slate-700 hover:bg-slate-50 shadow-xs"
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>前へ</span>
              </Link>
              <span className="text-xs text-slate-500 font-medium px-2">
                {page} / {postPages}
              </span>
              <Link
                href={`/?page=${page >= postPages ? postPages : page + 1}`}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium transition ${
                  page >= postPages
                    ? "opacity-30 cursor-not-allowed pointer-events-none text-slate-400"
                    : "bg-white text-slate-700 hover:bg-slate-50 shadow-xs"
                }`}
              >
                <span>次へ</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
