import Link from "next/link";
import { useRouter } from "next/router";
import {
  OrderBy,
  useCountPostQuery,
  useCreateOnePostMutation,
  useDeleteOnePostMutation,
  useFindManyPostQuery,
} from "@/generated/graphql";

// GraphQLのadditionalTypenamesを設定する
const context = {
  additionalTypenames: ["Post"],
};

// 1ページに表示する投稿の数
const PageLimit = 5;

const Page = () => {
  const router = useRouter();
  // ページ番号を取得する
  const page = Number(router.query.page) || 1;
  // useFindManyPostQueryフックを使用して、投稿を取得する(updatedAtを降順)
  const [{ data: dataPost }] = useFindManyPostQuery({
    variables: {
      orderBy: { updatedAt: OrderBy.Desc },
      limit: 5,
      offset: (page - 1) * PageLimit,
    },
    context,
  });
  // useCountPostQueryフックを使用して、投稿の総数を取得する
  const [{ data: dataPostCount }] = useCountPostQuery({ context });
  // useCreateOnePostMutationフックを使用して、新しい投稿を作成する
  const [{ fetching: fetchingCreatePost }, createPost] =
    useCreateOnePostMutation();

  // useDeleteOnePostMutationフックを使用して、投稿を削除する
  const [, deletePost] = useDeleteOnePostMutation();

  // 投稿フォームが送信されたときに呼び出される関数
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      content: { value: string };
    };
    // 新しい投稿を作成する
    createPost({
      input: {
        title: target.title.value || "タイトルなし",
        content: target.content.value || "内容なし",
      },
    });
    // フォームをリセットする
    e.currentTarget.reset();
  };

  // 投稿の総数を取得する
  const postCounts = dataPostCount?.countPost ?? 0;
  // 投稿の総ページ数を計算する
  const postPages = Math.ceil(postCounts / PageLimit);
  return (
    <>
      <div>
        <Link className="underline text-blue-500" href="/explorer">
          動作確認用 Apollo Explorer
        </Link>
      </div>
      <div>
        <Link
          className="underline text-blue-500"
          href="https://github.com/SoraKumo001/next-graphql"
        >
          ソースコード
        </Link>
      </div>
      <div className="max-w-2xl m-auto">
        {/* 投稿フォーム */}
        <form
          className="grid border-gray-400 border-solid"
          onSubmit={handleSubmit}
        >
          <label htmlFor="flex-1">Title</label>
          <input className="border p-1" type="text" name="title" />
          <label htmlFor="content">Content</label>
          <textarea className="border p-2 rounded" rows={5} name="content" />
          <button
            className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-1 disabled:opacity-30 disabled:cursor-not-allowed"
            type="submit"
            disabled={fetchingCreatePost}
          >
            Create Post
          </button>
        </form>
        <hr className="m-2" />
        {/* ページネーション */}
        <div className="flex gap-2 items-center">
          <div>最大5件表示</div>
          <div>
            Page {page}/{postPages}
          </div>
          <button
            className="border p-1 rounded disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={page <= 1}
            onClick={() => router.push({ query: { page: page - 1 } })}
          >
            ←
          </button>
          <button
            className="border p-1 rounded disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={page >= postPages}
            onClick={() => router.push({ query: { page: page + 1 } })}
          >
            →
          </button>
          All:{postCounts}
        </div>

        {/* 投稿一覧 */}
        <div>
          {dataPost?.findManyPost.map((post) => (
            <div key={post.id} className="mt-5 p-1 border rounded">
              <div className="flex gap-2">
                <div className="flex-1">{post.title}</div>
                <div>[{post.id}]</div>
                <div>
                  {new Date(post.updatedAt).toLocaleString("ja-JP", {
                    timeZone: "Asia/Tokyo",
                  })}
                </div>
                <button
                  className="border p-px rounded bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold px-px"
                  onClick={() => deletePost({ where: { id: post.id } })}
                >
                  Del
                </button>
              </div>
              <div className="whitespace-pre-wrap">{post.content}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
