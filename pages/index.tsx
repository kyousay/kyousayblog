// pages/index.js
import React from 'react';
import Link from "next/link";
import { client } from "../libs/client";
import { GetStaticProps } from 'next';

export type Category = {
    name: string;
}

export type Blog = {
    id: string;
    title: string;
    body: string;
    publishedAt: string;
    category: Category;
}

type Props = {
    blog: Blog[]
}

const Hoge: React.VFC<Props> = ({ blog }) => {
  return (
    <div>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Hoge;

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps: GetStaticProps<Props> = async () => {
  const data: any = await client.get({ endpoint: "blog" });

  return {
    props: {
      blog: data.contents,
    },
  };
};