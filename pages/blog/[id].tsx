import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';
import { Blog } from '..'
import { client } from '../../libs/client';
import styles from '../../styles/Home.module.scss';

const BlogId: React.VFC<{ blog: Blog }> = ({ blog }) => {
    console.log(blog);
    return (
        <main className={styles.main}>
          <h1 className={styles.title}>{blog.title}</h1>
          <p className={styles.publishedAt}>{blog.publishedAt}</p>
          <p className="category">{blog.category && `${blog.category.name}`}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: `${blog.body}`,
            }}
            className={styles.post}
          />
        </main>
      );
};

export default BlogId;

export const getStaticPaths: GetStaticPaths = async() => {
    const data: {contents: Blog[] } = await client.get({ endpoint: "blog" });
    const paths = data.contents.map((content) => `/blog/${content.id}`);

    return {
        paths, fallback: false
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const id = context.params?.id;
    const data: Blog = await client.get({ endpoint: "blog", contentId: id as string});
  
    return {
      props: {
        blog: data,
      },
    };
  };