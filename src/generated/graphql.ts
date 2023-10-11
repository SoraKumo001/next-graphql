import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: { input: any; output: any; }
  /** The `Byte` scalar type represents byte value as a Buffer */
  Bytes: { input: any; output: any; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: string; output: string; }
  /** A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal. */
  Decimal: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  Json: { input: any; output: any; }
};

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilter>;
  notIn?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  posts: Array<Post>;
  postsCount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type CategoryPostsArgs = {
  filter?: InputMaybe<PostFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
};


export type CategoryPostsCountArgs = {
  filter?: InputMaybe<PostFilter>;
};

export type CategoryCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CategoryFilter = {
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  posts?: InputMaybe<PostListFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CategoryListFilter = {
  every?: InputMaybe<CategoryFilter>;
  none?: InputMaybe<CategoryFilter>;
  some?: InputMaybe<CategoryFilter>;
};

export type CategoryOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  posts?: InputMaybe<PostOrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

export type CategoryUniqueFilter = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type CategoryUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  posts?: InputMaybe<CategoryUpdatePostsRelationInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CategoryUpdatePostsRelationInput = {
  connect?: InputMaybe<Array<PostUniqueFilter>>;
  create?: InputMaybe<Array<PostCreateInput>>;
  delete?: InputMaybe<Array<PostUniqueFilter>>;
  deleteMany?: InputMaybe<Array<PostWithoutCategoriesFilter>>;
  disconnect?: InputMaybe<Array<PostUniqueFilter>>;
  set?: InputMaybe<Array<PostUniqueFilter>>;
  update?: InputMaybe<Array<CategoryUpdatePostsRelationInputUpdate>>;
  updateMany?: InputMaybe<Array<CategoryUpdatePostsRelationInputUpdateMany>>;
};

export type CategoryUpdatePostsRelationInputUpdate = {
  data?: InputMaybe<PostUpdateWithoutCategoriesInput>;
  where?: InputMaybe<PostUniqueFilter>;
};

export type CategoryUpdatePostsRelationInputUpdateMany = {
  data?: InputMaybe<PostUpdateWithoutCategoriesInput>;
  where?: InputMaybe<PostWithoutCategoriesFilter>;
};

export type CategoryUpdateWithoutPostsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CategoryWithoutPostsFilter = {
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  is?: InputMaybe<Scalars['DateTime']['input']>;
  isNot?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createManyCategory: Scalars['Int']['output'];
  createManyPost: Scalars['Int']['output'];
  createOneCategory: Category;
  createOnePost: Post;
  deleteManyCategory: Scalars['Int']['output'];
  deleteManyPost: Scalars['Int']['output'];
  deleteOneCategory: Category;
  deleteOnePost: Post;
  updateManyCategory: Scalars['Int']['output'];
  updateManyPost: Scalars['Int']['output'];
  updateOneCategory: Category;
  updateOnePost: Post;
};


export type MutationCreateManyCategoryArgs = {
  input: Array<CategoryCreateInput>;
};


export type MutationCreateManyPostArgs = {
  input: Array<PostCreateInput>;
};


export type MutationCreateOneCategoryArgs = {
  input: CategoryCreateInput;
};


export type MutationCreateOnePostArgs = {
  input: PostCreateInput;
};


export type MutationDeleteManyCategoryArgs = {
  where: CategoryFilter;
};


export type MutationDeleteManyPostArgs = {
  where: PostFilter;
};


export type MutationDeleteOneCategoryArgs = {
  where: CategoryUniqueFilter;
};


export type MutationDeleteOnePostArgs = {
  where: PostUniqueFilter;
};


export type MutationUpdateManyCategoryArgs = {
  data: CategoryUpdateInput;
  where: CategoryFilter;
};


export type MutationUpdateManyPostArgs = {
  data: PostUpdateInput;
  where: PostFilter;
};


export type MutationUpdateOneCategoryArgs = {
  data: CategoryUpdateInput;
  where: CategoryUniqueFilter;
};


export type MutationUpdateOnePostArgs = {
  data: PostUpdateInput;
  where: PostUniqueFilter;
};

export enum OrderBy {
  Asc = 'Asc',
  Desc = 'Desc'
}

export type Post = {
  __typename?: 'Post';
  categories: Array<Category>;
  categoriesCount: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  published: Scalars['Boolean']['output'];
  publishedAt: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type PostCategoriesArgs = {
  filter?: InputMaybe<CategoryFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CategoryOrderBy>>;
};


export type PostCategoriesCountArgs = {
  filter?: InputMaybe<CategoryFilter>;
};

export type PostCreateCategoriesRelationInput = {
  connect?: InputMaybe<Array<CategoryUniqueFilter>>;
  create?: InputMaybe<Array<CategoryCreateInput>>;
};

export type PostCreateInput = {
  categories?: InputMaybe<PostCreateCategoriesRelationInput>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PostFilter = {
  categories?: InputMaybe<CategoryListFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  published?: InputMaybe<BooleanFilter>;
  publishedAt?: InputMaybe<DateTimeFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type PostListFilter = {
  every?: InputMaybe<PostFilter>;
  none?: InputMaybe<PostFilter>;
  some?: InputMaybe<PostFilter>;
};

export type PostOrderBy = {
  categories?: InputMaybe<CategoryOrderBy>;
  content?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  published?: InputMaybe<OrderBy>;
  publishedAt?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

export type PostUniqueFilter = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type PostUpdateCategoriesRelationInput = {
  connect?: InputMaybe<Array<CategoryUniqueFilter>>;
  create?: InputMaybe<Array<CategoryCreateInput>>;
  delete?: InputMaybe<Array<CategoryUniqueFilter>>;
  deleteMany?: InputMaybe<Array<CategoryWithoutPostsFilter>>;
  disconnect?: InputMaybe<Array<CategoryUniqueFilter>>;
  set?: InputMaybe<Array<CategoryUniqueFilter>>;
  update?: InputMaybe<Array<PostUpdateCategoriesRelationInputUpdate>>;
  updateMany?: InputMaybe<Array<PostUpdateCategoriesRelationInputUpdateMany>>;
};

export type PostUpdateCategoriesRelationInputUpdate = {
  data?: InputMaybe<CategoryUpdateWithoutPostsInput>;
  where?: InputMaybe<CategoryUniqueFilter>;
};

export type PostUpdateCategoriesRelationInputUpdateMany = {
  data?: InputMaybe<CategoryUpdateWithoutPostsInput>;
  where?: InputMaybe<CategoryWithoutPostsFilter>;
};

export type PostUpdateInput = {
  categories?: InputMaybe<PostUpdateCategoriesRelationInput>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PostUpdateWithoutCategoriesInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PostWithoutCategoriesFilter = {
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  published?: InputMaybe<BooleanFilter>;
  publishedAt?: InputMaybe<DateTimeFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type Query = {
  __typename?: 'Query';
  countCategory: Scalars['Int']['output'];
  countPost: Scalars['Int']['output'];
  findFirstCategory?: Maybe<Category>;
  findFirstPost?: Maybe<Post>;
  findManyCategory: Array<Category>;
  findManyPost: Array<Post>;
  findUniqueCategory: Category;
  findUniquePost: Post;
};


export type QueryCountCategoryArgs = {
  filter?: InputMaybe<CategoryFilter>;
};


export type QueryCountPostArgs = {
  filter?: InputMaybe<PostFilter>;
};


export type QueryFindFirstCategoryArgs = {
  filter?: InputMaybe<CategoryFilter>;
  orderBy?: InputMaybe<Array<CategoryOrderBy>>;
};


export type QueryFindFirstPostArgs = {
  filter?: InputMaybe<PostFilter>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
};


export type QueryFindManyCategoryArgs = {
  filter?: InputMaybe<CategoryFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CategoryOrderBy>>;
};


export type QueryFindManyPostArgs = {
  filter?: InputMaybe<PostFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
};


export type QueryFindUniqueCategoryArgs = {
  filter: CategoryUniqueFilter;
};


export type QueryFindUniquePostArgs = {
  filter: PostUniqueFilter;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  is?: InputMaybe<Scalars['String']['input']>;
  isNot?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<StringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type PostFragment = { __typename?: 'Post', id: string, published: boolean, title: string, content: string, createdAt: string, updatedAt: string, publishedAt: string };

export type CategoryFragment = { __typename?: 'Category', id: string, name: string, createdAt: string, updatedAt: string };

export type CountPostQueryVariables = Exact<{
  filter?: InputMaybe<PostFilter>;
}>;


export type CountPostQuery = { __typename?: 'Query', countPost: number };

export type CountCategoryQueryVariables = Exact<{
  filter?: InputMaybe<CategoryFilter>;
}>;


export type CountCategoryQuery = { __typename?: 'Query', countCategory: number };

export type FindUniquePostQueryVariables = Exact<{
  filter: PostUniqueFilter;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  postsCountFilter?: InputMaybe<PostFilter>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
}>;


export type FindUniquePostQuery = { __typename?: 'Query', findUniquePost: { __typename?: 'Post', categoriesCount: number, id: string, published: boolean, title: string, content: string, createdAt: string, updatedAt: string, publishedAt: string, categories: Array<{ __typename?: 'Category', postsCount: number, id: string, name: string, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', id: string, published: boolean, title: string, content: string, createdAt: string, updatedAt: string, publishedAt: string }> }> } };

export type FindUniqueCategoryQueryVariables = Exact<{
  filter: CategoryUniqueFilter;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
  postsCountFilter?: InputMaybe<PostFilter>;
}>;


export type FindUniqueCategoryQuery = { __typename?: 'Query', findUniqueCategory: { __typename?: 'Category', postsCount: number, id: string, name: string, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', categoriesCount: number, id: string, published: boolean, title: string, content: string, createdAt: string, updatedAt: string, publishedAt: string, categories: Array<{ __typename?: 'Category', id: string, name: string, createdAt: string, updatedAt: string }> }> } };

export type FindFirstPostQueryVariables = Exact<{
  filter?: InputMaybe<PostFilter>;
  orderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  postsCountFilter?: InputMaybe<PostFilter>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
}>;


export type FindFirstPostQuery = { __typename?: 'Query', findFirstPost?: { __typename?: 'Post', categoriesCount: number, id: string, published: boolean, title: string, content: string, createdAt: string, updatedAt: string, publishedAt: string, categories: Array<{ __typename?: 'Category', postsCount: number, id: string, name: string, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', id: string, published: boolean, title: string, content: string, createdAt: string, updatedAt: string, publishedAt: string }> }> } | null };

export type FindFirstCategoryQueryVariables = Exact<{
  filter?: InputMaybe<CategoryFilter>;
  orderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
  postsCountFilter?: InputMaybe<PostFilter>;
}>;


export type FindFirstCategoryQuery = { __typename?: 'Query', findFirstCategory?: { __typename?: 'Category', postsCount: number, id: string, name: string, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', categoriesCount: number, id: string, published: boolean, title: string, content: string, createdAt: string, updatedAt: string, publishedAt: string, categories: Array<{ __typename?: 'Category', id: string, name: string, createdAt: string, updatedAt: string }> }> } | null };

export type FindManyPostQueryVariables = Exact<{
  filter?: InputMaybe<PostFilter>;
  orderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  postsCountFilter?: InputMaybe<PostFilter>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
}>;


export type FindManyPostQuery = { __typename?: 'Query', findManyPost: Array<{ __typename?: 'Post', categoriesCount: number, id: string, published: boolean, title: string, content: string, createdAt: string, updatedAt: string, publishedAt: string, categories: Array<{ __typename?: 'Category', postsCount: number, id: string, name: string, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', id: string, published: boolean, title: string, content: string, createdAt: string, updatedAt: string, publishedAt: string }> }> }> };

export type FindManyCategoryQueryVariables = Exact<{
  filter?: InputMaybe<CategoryFilter>;
  orderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
  postsCountFilter?: InputMaybe<PostFilter>;
}>;


export type FindManyCategoryQuery = { __typename?: 'Query', findManyCategory: Array<{ __typename?: 'Category', postsCount: number, id: string, name: string, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', categoriesCount: number, id: string, published: boolean, title: string, content: string, createdAt: string, updatedAt: string, publishedAt: string, categories: Array<{ __typename?: 'Category', id: string, name: string, createdAt: string, updatedAt: string }> }> }> };

export type CreateOnePostMutationVariables = Exact<{
  input: PostCreateInput;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  postsCountFilter?: InputMaybe<PostFilter>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
}>;


export type CreateOnePostMutation = { __typename?: 'Mutation', createOnePost: { __typename?: 'Post', categoriesCount: number, id: string, published: boolean, title: string, content: string, createdAt: string, updatedAt: string, publishedAt: string, categories: Array<{ __typename?: 'Category', postsCount: number, id: string, name: string, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', id: string, published: boolean, title: string, content: string, createdAt: string, updatedAt: string, publishedAt: string }> }> } };

export type CreateOneCategoryMutationVariables = Exact<{
  input: CategoryCreateInput;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
  postsCountFilter?: InputMaybe<PostFilter>;
}>;


export type CreateOneCategoryMutation = { __typename?: 'Mutation', createOneCategory: { __typename?: 'Category', postsCount: number, id: string, name: string, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', categoriesCount: number, id: string, published: boolean, title: string, content: string, createdAt: string, updatedAt: string, publishedAt: string, categories: Array<{ __typename?: 'Category', id: string, name: string, createdAt: string, updatedAt: string }> }> } };

export type CreateManyPostMutationVariables = Exact<{
  input: Array<PostCreateInput> | PostCreateInput;
}>;


export type CreateManyPostMutation = { __typename?: 'Mutation', createManyPost: number };

export type CreateManyCategoryMutationVariables = Exact<{
  input: Array<CategoryCreateInput> | CategoryCreateInput;
}>;


export type CreateManyCategoryMutation = { __typename?: 'Mutation', createManyCategory: number };

export type UpdateOnePostMutationVariables = Exact<{
  where: PostUniqueFilter;
  data: PostUpdateInput;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  postsCountFilter?: InputMaybe<PostFilter>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
}>;


export type UpdateOnePostMutation = { __typename?: 'Mutation', updateOnePost: { __typename?: 'Post', categoriesCount: number, id: string, published: boolean, title: string, content: string, createdAt: string, updatedAt: string, publishedAt: string, categories: Array<{ __typename?: 'Category', postsCount: number, id: string, name: string, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', id: string, published: boolean, title: string, content: string, createdAt: string, updatedAt: string, publishedAt: string }> }> } };

export type UpdateOneCategoryMutationVariables = Exact<{
  where: CategoryUniqueFilter;
  data: CategoryUpdateInput;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
  postsCountFilter?: InputMaybe<PostFilter>;
}>;


export type UpdateOneCategoryMutation = { __typename?: 'Mutation', updateOneCategory: { __typename?: 'Category', postsCount: number, id: string, name: string, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', categoriesCount: number, id: string, published: boolean, title: string, content: string, createdAt: string, updatedAt: string, publishedAt: string, categories: Array<{ __typename?: 'Category', id: string, name: string, createdAt: string, updatedAt: string }> }> } };

export type UpdateManyPostMutationVariables = Exact<{
  where: PostFilter;
  data: PostUpdateInput;
}>;


export type UpdateManyPostMutation = { __typename?: 'Mutation', updateManyPost: number };

export type UpdateManyCategoryMutationVariables = Exact<{
  where: CategoryFilter;
  data: CategoryUpdateInput;
}>;


export type UpdateManyCategoryMutation = { __typename?: 'Mutation', updateManyCategory: number };

export type DeleteOnePostMutationVariables = Exact<{
  where: PostUniqueFilter;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  postsCountFilter?: InputMaybe<PostFilter>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
}>;


export type DeleteOnePostMutation = { __typename?: 'Mutation', deleteOnePost: { __typename?: 'Post', categoriesCount: number, id: string, published: boolean, title: string, content: string, createdAt: string, updatedAt: string, publishedAt: string, categories: Array<{ __typename?: 'Category', postsCount: number, id: string, name: string, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', id: string, published: boolean, title: string, content: string, createdAt: string, updatedAt: string, publishedAt: string }> }> } };

export type DeleteOneCategoryMutationVariables = Exact<{
  where: CategoryUniqueFilter;
  postsFilter?: InputMaybe<PostFilter>;
  postsOrderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  postsLimit?: InputMaybe<Scalars['Int']['input']>;
  postsOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesFilter?: InputMaybe<CategoryFilter>;
  categoriesOrderBy?: InputMaybe<Array<CategoryOrderBy> | CategoryOrderBy>;
  categoriesLimit?: InputMaybe<Scalars['Int']['input']>;
  categoriesOffset?: InputMaybe<Scalars['Int']['input']>;
  categoriesCountFilter?: InputMaybe<CategoryFilter>;
  postsCountFilter?: InputMaybe<PostFilter>;
}>;


export type DeleteOneCategoryMutation = { __typename?: 'Mutation', deleteOneCategory: { __typename?: 'Category', postsCount: number, id: string, name: string, createdAt: string, updatedAt: string, posts: Array<{ __typename?: 'Post', categoriesCount: number, id: string, published: boolean, title: string, content: string, createdAt: string, updatedAt: string, publishedAt: string, categories: Array<{ __typename?: 'Category', id: string, name: string, createdAt: string, updatedAt: string }> }> } };

export type DeleteManyPostMutationVariables = Exact<{
  where: PostFilter;
}>;


export type DeleteManyPostMutation = { __typename?: 'Mutation', deleteManyPost: number };

export type DeleteManyCategoryMutationVariables = Exact<{
  where: CategoryFilter;
}>;


export type DeleteManyCategoryMutation = { __typename?: 'Mutation', deleteManyCategory: number };

export const PostFragmentDoc = gql`
    fragment post on Post {
  id
  published
  title
  content
  createdAt
  updatedAt
  publishedAt
}
    `;
export const CategoryFragmentDoc = gql`
    fragment category on Category {
  id
  name
  createdAt
  updatedAt
}
    `;
export const CountPostDocument = gql`
    query CountPost($filter: PostFilter) {
  countPost(filter: $filter)
}
    `;

export function useCountPostQuery(options?: Omit<Urql.UseQueryArgs<CountPostQueryVariables>, 'query'>) {
  return Urql.useQuery<CountPostQuery, CountPostQueryVariables>({ query: CountPostDocument, ...options });
};
export const CountCategoryDocument = gql`
    query CountCategory($filter: CategoryFilter) {
  countCategory(filter: $filter)
}
    `;

export function useCountCategoryQuery(options?: Omit<Urql.UseQueryArgs<CountCategoryQueryVariables>, 'query'>) {
  return Urql.useQuery<CountCategoryQuery, CountCategoryQueryVariables>({ query: CountCategoryDocument, ...options });
};
export const FindUniquePostDocument = gql`
    query FindUniquePost($filter: PostUniqueFilter!, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $postsCountFilter: PostFilter, $categoriesCountFilter: CategoryFilter) {
  findUniquePost(filter: $filter) {
    ...post
    categories(
      filter: $categoriesFilter
      orderBy: $categoriesOrderBy
      limit: $categoriesLimit
      offset: $categoriesOffset
    ) {
      ...category
      posts(
        filter: $postsFilter
        orderBy: $postsOrderBy
        limit: $postsLimit
        offset: $postsOffset
      ) {
        ...post
      }
      postsCount(filter: $postsCountFilter)
    }
    categoriesCount(filter: $categoriesCountFilter)
  }
}
    ${PostFragmentDoc}
${CategoryFragmentDoc}`;

export function useFindUniquePostQuery(options: Omit<Urql.UseQueryArgs<FindUniquePostQueryVariables>, 'query'>) {
  return Urql.useQuery<FindUniquePostQuery, FindUniquePostQueryVariables>({ query: FindUniquePostDocument, ...options });
};
export const FindUniqueCategoryDocument = gql`
    query FindUniqueCategory($filter: CategoryUniqueFilter!, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $categoriesCountFilter: CategoryFilter, $postsCountFilter: PostFilter) {
  findUniqueCategory(filter: $filter) {
    ...category
    posts(
      filter: $postsFilter
      orderBy: $postsOrderBy
      limit: $postsLimit
      offset: $postsOffset
    ) {
      ...post
      categories(
        filter: $categoriesFilter
        orderBy: $categoriesOrderBy
        limit: $categoriesLimit
        offset: $categoriesOffset
      ) {
        ...category
      }
      categoriesCount(filter: $categoriesCountFilter)
    }
    postsCount(filter: $postsCountFilter)
  }
}
    ${CategoryFragmentDoc}
${PostFragmentDoc}`;

export function useFindUniqueCategoryQuery(options: Omit<Urql.UseQueryArgs<FindUniqueCategoryQueryVariables>, 'query'>) {
  return Urql.useQuery<FindUniqueCategoryQuery, FindUniqueCategoryQueryVariables>({ query: FindUniqueCategoryDocument, ...options });
};
export const FindFirstPostDocument = gql`
    query FindFirstPost($filter: PostFilter, $orderBy: [PostOrderBy!], $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $postsCountFilter: PostFilter, $categoriesCountFilter: CategoryFilter) {
  findFirstPost(filter: $filter, orderBy: $orderBy) {
    ...post
    categories(
      filter: $categoriesFilter
      orderBy: $categoriesOrderBy
      limit: $categoriesLimit
      offset: $categoriesOffset
    ) {
      ...category
      posts(
        filter: $postsFilter
        orderBy: $postsOrderBy
        limit: $postsLimit
        offset: $postsOffset
      ) {
        ...post
      }
      postsCount(filter: $postsCountFilter)
    }
    categoriesCount(filter: $categoriesCountFilter)
  }
}
    ${PostFragmentDoc}
${CategoryFragmentDoc}`;

export function useFindFirstPostQuery(options?: Omit<Urql.UseQueryArgs<FindFirstPostQueryVariables>, 'query'>) {
  return Urql.useQuery<FindFirstPostQuery, FindFirstPostQueryVariables>({ query: FindFirstPostDocument, ...options });
};
export const FindFirstCategoryDocument = gql`
    query FindFirstCategory($filter: CategoryFilter, $orderBy: [CategoryOrderBy!], $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $categoriesCountFilter: CategoryFilter, $postsCountFilter: PostFilter) {
  findFirstCategory(filter: $filter, orderBy: $orderBy) {
    ...category
    posts(
      filter: $postsFilter
      orderBy: $postsOrderBy
      limit: $postsLimit
      offset: $postsOffset
    ) {
      ...post
      categories(
        filter: $categoriesFilter
        orderBy: $categoriesOrderBy
        limit: $categoriesLimit
        offset: $categoriesOffset
      ) {
        ...category
      }
      categoriesCount(filter: $categoriesCountFilter)
    }
    postsCount(filter: $postsCountFilter)
  }
}
    ${CategoryFragmentDoc}
${PostFragmentDoc}`;

export function useFindFirstCategoryQuery(options?: Omit<Urql.UseQueryArgs<FindFirstCategoryQueryVariables>, 'query'>) {
  return Urql.useQuery<FindFirstCategoryQuery, FindFirstCategoryQueryVariables>({ query: FindFirstCategoryDocument, ...options });
};
export const FindManyPostDocument = gql`
    query FindManyPost($filter: PostFilter, $orderBy: [PostOrderBy!], $limit: Int, $offset: Int, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $postsCountFilter: PostFilter, $categoriesCountFilter: CategoryFilter) {
  findManyPost(filter: $filter, orderBy: $orderBy, limit: $limit, offset: $offset) {
    ...post
    categories(
      filter: $categoriesFilter
      orderBy: $categoriesOrderBy
      limit: $categoriesLimit
      offset: $categoriesOffset
    ) {
      ...category
      posts(
        filter: $postsFilter
        orderBy: $postsOrderBy
        limit: $postsLimit
        offset: $postsOffset
      ) {
        ...post
      }
      postsCount(filter: $postsCountFilter)
    }
    categoriesCount(filter: $categoriesCountFilter)
  }
}
    ${PostFragmentDoc}
${CategoryFragmentDoc}`;

export function useFindManyPostQuery(options?: Omit<Urql.UseQueryArgs<FindManyPostQueryVariables>, 'query'>) {
  return Urql.useQuery<FindManyPostQuery, FindManyPostQueryVariables>({ query: FindManyPostDocument, ...options });
};
export const FindManyCategoryDocument = gql`
    query FindManyCategory($filter: CategoryFilter, $orderBy: [CategoryOrderBy!], $limit: Int, $offset: Int, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $categoriesCountFilter: CategoryFilter, $postsCountFilter: PostFilter) {
  findManyCategory(
    filter: $filter
    orderBy: $orderBy
    limit: $limit
    offset: $offset
  ) {
    ...category
    posts(
      filter: $postsFilter
      orderBy: $postsOrderBy
      limit: $postsLimit
      offset: $postsOffset
    ) {
      ...post
      categories(
        filter: $categoriesFilter
        orderBy: $categoriesOrderBy
        limit: $categoriesLimit
        offset: $categoriesOffset
      ) {
        ...category
      }
      categoriesCount(filter: $categoriesCountFilter)
    }
    postsCount(filter: $postsCountFilter)
  }
}
    ${CategoryFragmentDoc}
${PostFragmentDoc}`;

export function useFindManyCategoryQuery(options?: Omit<Urql.UseQueryArgs<FindManyCategoryQueryVariables>, 'query'>) {
  return Urql.useQuery<FindManyCategoryQuery, FindManyCategoryQueryVariables>({ query: FindManyCategoryDocument, ...options });
};
export const CreateOnePostDocument = gql`
    mutation CreateOnePost($input: PostCreateInput!, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $postsCountFilter: PostFilter, $categoriesCountFilter: CategoryFilter) {
  createOnePost(input: $input) {
    ...post
    categories(
      filter: $categoriesFilter
      orderBy: $categoriesOrderBy
      limit: $categoriesLimit
      offset: $categoriesOffset
    ) {
      ...category
      posts(
        filter: $postsFilter
        orderBy: $postsOrderBy
        limit: $postsLimit
        offset: $postsOffset
      ) {
        ...post
      }
      postsCount(filter: $postsCountFilter)
    }
    categoriesCount(filter: $categoriesCountFilter)
  }
}
    ${PostFragmentDoc}
${CategoryFragmentDoc}`;

export function useCreateOnePostMutation() {
  return Urql.useMutation<CreateOnePostMutation, CreateOnePostMutationVariables>(CreateOnePostDocument);
};
export const CreateOneCategoryDocument = gql`
    mutation CreateOneCategory($input: CategoryCreateInput!, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $categoriesCountFilter: CategoryFilter, $postsCountFilter: PostFilter) {
  createOneCategory(input: $input) {
    ...category
    posts(
      filter: $postsFilter
      orderBy: $postsOrderBy
      limit: $postsLimit
      offset: $postsOffset
    ) {
      ...post
      categories(
        filter: $categoriesFilter
        orderBy: $categoriesOrderBy
        limit: $categoriesLimit
        offset: $categoriesOffset
      ) {
        ...category
      }
      categoriesCount(filter: $categoriesCountFilter)
    }
    postsCount(filter: $postsCountFilter)
  }
}
    ${CategoryFragmentDoc}
${PostFragmentDoc}`;

export function useCreateOneCategoryMutation() {
  return Urql.useMutation<CreateOneCategoryMutation, CreateOneCategoryMutationVariables>(CreateOneCategoryDocument);
};
export const CreateManyPostDocument = gql`
    mutation CreateManyPost($input: [PostCreateInput!]!) {
  createManyPost(input: $input)
}
    `;

export function useCreateManyPostMutation() {
  return Urql.useMutation<CreateManyPostMutation, CreateManyPostMutationVariables>(CreateManyPostDocument);
};
export const CreateManyCategoryDocument = gql`
    mutation CreateManyCategory($input: [CategoryCreateInput!]!) {
  createManyCategory(input: $input)
}
    `;

export function useCreateManyCategoryMutation() {
  return Urql.useMutation<CreateManyCategoryMutation, CreateManyCategoryMutationVariables>(CreateManyCategoryDocument);
};
export const UpdateOnePostDocument = gql`
    mutation UpdateOnePost($where: PostUniqueFilter!, $data: PostUpdateInput!, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $postsCountFilter: PostFilter, $categoriesCountFilter: CategoryFilter) {
  updateOnePost(where: $where, data: $data) {
    ...post
    categories(
      filter: $categoriesFilter
      orderBy: $categoriesOrderBy
      limit: $categoriesLimit
      offset: $categoriesOffset
    ) {
      ...category
      posts(
        filter: $postsFilter
        orderBy: $postsOrderBy
        limit: $postsLimit
        offset: $postsOffset
      ) {
        ...post
      }
      postsCount(filter: $postsCountFilter)
    }
    categoriesCount(filter: $categoriesCountFilter)
  }
}
    ${PostFragmentDoc}
${CategoryFragmentDoc}`;

export function useUpdateOnePostMutation() {
  return Urql.useMutation<UpdateOnePostMutation, UpdateOnePostMutationVariables>(UpdateOnePostDocument);
};
export const UpdateOneCategoryDocument = gql`
    mutation UpdateOneCategory($where: CategoryUniqueFilter!, $data: CategoryUpdateInput!, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $categoriesCountFilter: CategoryFilter, $postsCountFilter: PostFilter) {
  updateOneCategory(where: $where, data: $data) {
    ...category
    posts(
      filter: $postsFilter
      orderBy: $postsOrderBy
      limit: $postsLimit
      offset: $postsOffset
    ) {
      ...post
      categories(
        filter: $categoriesFilter
        orderBy: $categoriesOrderBy
        limit: $categoriesLimit
        offset: $categoriesOffset
      ) {
        ...category
      }
      categoriesCount(filter: $categoriesCountFilter)
    }
    postsCount(filter: $postsCountFilter)
  }
}
    ${CategoryFragmentDoc}
${PostFragmentDoc}`;

export function useUpdateOneCategoryMutation() {
  return Urql.useMutation<UpdateOneCategoryMutation, UpdateOneCategoryMutationVariables>(UpdateOneCategoryDocument);
};
export const UpdateManyPostDocument = gql`
    mutation UpdateManyPost($where: PostFilter!, $data: PostUpdateInput!) {
  updateManyPost(where: $where, data: $data)
}
    `;

export function useUpdateManyPostMutation() {
  return Urql.useMutation<UpdateManyPostMutation, UpdateManyPostMutationVariables>(UpdateManyPostDocument);
};
export const UpdateManyCategoryDocument = gql`
    mutation UpdateManyCategory($where: CategoryFilter!, $data: CategoryUpdateInput!) {
  updateManyCategory(where: $where, data: $data)
}
    `;

export function useUpdateManyCategoryMutation() {
  return Urql.useMutation<UpdateManyCategoryMutation, UpdateManyCategoryMutationVariables>(UpdateManyCategoryDocument);
};
export const DeleteOnePostDocument = gql`
    mutation DeleteOnePost($where: PostUniqueFilter!, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $postsCountFilter: PostFilter, $categoriesCountFilter: CategoryFilter) {
  deleteOnePost(where: $where) {
    ...post
    categories(
      filter: $categoriesFilter
      orderBy: $categoriesOrderBy
      limit: $categoriesLimit
      offset: $categoriesOffset
    ) {
      ...category
      posts(
        filter: $postsFilter
        orderBy: $postsOrderBy
        limit: $postsLimit
        offset: $postsOffset
      ) {
        ...post
      }
      postsCount(filter: $postsCountFilter)
    }
    categoriesCount(filter: $categoriesCountFilter)
  }
}
    ${PostFragmentDoc}
${CategoryFragmentDoc}`;

export function useDeleteOnePostMutation() {
  return Urql.useMutation<DeleteOnePostMutation, DeleteOnePostMutationVariables>(DeleteOnePostDocument);
};
export const DeleteOneCategoryDocument = gql`
    mutation DeleteOneCategory($where: CategoryUniqueFilter!, $postsFilter: PostFilter, $postsOrderBy: [PostOrderBy!], $postsLimit: Int, $postsOffset: Int, $categoriesFilter: CategoryFilter, $categoriesOrderBy: [CategoryOrderBy!], $categoriesLimit: Int, $categoriesOffset: Int, $categoriesCountFilter: CategoryFilter, $postsCountFilter: PostFilter) {
  deleteOneCategory(where: $where) {
    ...category
    posts(
      filter: $postsFilter
      orderBy: $postsOrderBy
      limit: $postsLimit
      offset: $postsOffset
    ) {
      ...post
      categories(
        filter: $categoriesFilter
        orderBy: $categoriesOrderBy
        limit: $categoriesLimit
        offset: $categoriesOffset
      ) {
        ...category
      }
      categoriesCount(filter: $categoriesCountFilter)
    }
    postsCount(filter: $postsCountFilter)
  }
}
    ${CategoryFragmentDoc}
${PostFragmentDoc}`;

export function useDeleteOneCategoryMutation() {
  return Urql.useMutation<DeleteOneCategoryMutation, DeleteOneCategoryMutationVariables>(DeleteOneCategoryDocument);
};
export const DeleteManyPostDocument = gql`
    mutation DeleteManyPost($where: PostFilter!) {
  deleteManyPost(where: $where)
}
    `;

export function useDeleteManyPostMutation() {
  return Urql.useMutation<DeleteManyPostMutation, DeleteManyPostMutationVariables>(DeleteManyPostDocument);
};
export const DeleteManyCategoryDocument = gql`
    mutation DeleteManyCategory($where: CategoryFilter!) {
  deleteManyCategory(where: $where)
}
    `;

export function useDeleteManyCategoryMutation() {
  return Urql.useMutation<DeleteManyCategoryMutation, DeleteManyCategoryMutationVariables>(DeleteManyCategoryDocument);
};