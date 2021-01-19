import Layout from "../../components/layout";
import React from "react";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    }
}

export async function  getStaticProps( {params} ) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData
        }
    }
}
export default function Post({postData}) {
    const {title, id, date, contentHtml} = postData;
    return (
        <Layout>
            {/* Add this <Head> tag */}
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={date} />
                </div>
                <div dangerouslySetInnerHTML={{__html: contentHtml}} />
            </article>
        </Layout>
    )
}