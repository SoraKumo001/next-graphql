import {
  OrderBy,
  useCreateOnePostMutation,
  useFindManyPostQuery,
} from "@/generated/graphql";

// GraphQLのadditionalTypenamesを設定する
const context = {
  additionalTypenames: ["Post"],
};

const Page = () => {
  // useFindManyPostQueryフックを使用して、投稿を取得する(updatedAtを降順)
  const [{ data: dataPost }] = useFindManyPostQuery({
    variables: { orderBy: { updatedAt: OrderBy.Desc } },
    context,
  });
  // useCreateOnePostMutationフックを使用して、新しい投稿を作成する
  const [{ fetching: fetchingCreatePost }, createPost] =
    useCreateOnePostMutation();

  // 投稿フォームが送信されたときに呼び出される関数
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      content: { value: string };
    };
    // createPost関数を使用して、新しい投稿を作成する
    createPost({
      input: {
        title: target.title.value,
        content: target.content.value,
      },
    });
    e.currentTarget.reset();
  };
  return (
    <>
      <style jsx>{`
        .postForm {
          margin: auto;
          display: grid;
          max-width: 600px;
        }
        .postContent {
          margin: auto;
          margin-top: 20px;
          padding: 1em;
          box-sizing: border-box;
          border-radius: 5px;
          max-width: 600px;
          border: 1px solid #ccc;
        }
      `}</style>
      {/* 投稿フォーム */}
      <form className="postForm" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" defaultValue="タイトル" />
        <label htmlFor="content">Content</label>
        <textarea rows={5} name="content" />
        <button type="submit" disabled={fetchingCreatePost}>
          Create Post
        </button>
      </form>
      {/* 投稿一覧 */}
      <div>
        {dataPost?.findManyPost.map((post) => (
          <div key={post.id} className="postContent">
            <div>
              {post.title}{" "}
              {new Date(post.updatedAt).toLocaleString("ja-JP", {
                timeZone: "Asia/Tokyo",
              })}
            </div>
            <div>{post.content}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
