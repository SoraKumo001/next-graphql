import Link from "next/link";
import {
  OrderBy,
  useCreateOneCategoryMutation,
  useFindManyCategoryQuery,
} from "@/generated/graphql";

// GraphQLのadditionalTypenamesを設定する
const context = {
  additionalTypenames: ["Category"],
};

const Page = () => {
  const [{ data: dataCategory }] = useFindManyCategoryQuery({
    context,
    variables: { orderBy: { name: OrderBy.Asc } },
  });
  // カテゴリ一覧を取得
  const [{ fetching: fetchingCategory }, createCategory] =
    useCreateOneCategoryMutation();
  // カテゴリの作成
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
    };
    // 新しいカテゴリを作成する
    if (target.name.value) {
      createCategory({
        input: {
          name: target.name.value,
        },
      });
      // フォームをリセットする
      e.currentTarget.reset();
    }
  };
  return (
    <>
      <div className="max-w-2xl m-auto py-4">
        <Link className="underline text-blue-500" href="/">
          投稿一覧
        </Link>
        {/* カテゴリフォーム */}
        <form
          className="grid border-gray-400 border-solid"
          onSubmit={handleSubmit}
        >
          <label htmlFor="flex-1">Category</label>
          <input className="border p-1" type="text" name="name" />
          <button
            className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-1 disabled:opacity-30 disabled:cursor-not-allowed"
            type="submit"
            disabled={fetchingCategory}
          >
            Create Category
          </button>
        </form>
        <hr className="m-2" />

        {/* カテゴリ一覧 */}
        <div>
          {dataCategory?.findManyCategory.map((category) => (
            <div key={category.id} className="mt-5 p-1 border rounded">
              <div className="flex-1">{category.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
