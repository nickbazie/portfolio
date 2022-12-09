import {useState} from 'react';
import Head from 'next/head';
import {BsFillMoonStarsFill} from 'react-icons/bs';
import {GraphQLClient, gql} from "graphql-request";
import BlogCard from '../components/BlogCard';

const graphcms = new GraphQLClient('https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clbebsflb08dx01te7wjr4kb8/master');

const QUERY = gql`
    {
        posts{
            id,
            title,
            datePublished,
            slug,
            content {
                html
            }
            author{
                name,
                avatar {
                    url
                }
            }
            coverPhoto {
                url
            }
        }        
    }
`;

export async function getStaticProps(){
    const {posts} = await graphcms.request(QUERY);
    return {
        props: {
            posts,
        },
        revalidate: 100,
    };
}
export default function Blog({posts}) {
    const [darkMode, setDarkMode ] = useState(false); 
    return (
      <div className={darkMode ? "dark" : "" }>
        <Head>
          <title>Nico Volo Portfolio </title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className="bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-900">
          <section className="min-h-screen"> 
            <nav className="py-10 mb-12 flex justify-between" >
              <h1 className="text-xl font-light font-roboto dark:text-gray-100"><a href="/">nicoVolo</a></h1>
              <ul className="flex items-center">
                <li><BsFillMoonStarsFill onClick={() => setDarkMode(!darkMode)} className="cursor-pointer text-2xl dark:text-gray-100"/></li>
                <li className="text-xl pl-5 underline text-teal-600"><a href="/blog">Blog</a></li>
                <li><a className="bg-gradient-to-r from-cyan-500 to-teal-500  text-white px-4 py-2 rounded-md ml-8 font-roboto font-light" href="#">Resume</a></li>
              </ul>
            </nav>
            {posts.map((post) => (
                <BlogCard 
                title={post.title} 
                author={post.author} 
                coverPhoto={post.coverPhoto} 
                key={post.id} 
                datePublished={post.datePublished} 
                slug={post.slug}
                />
            ))}
          </section>

        </main> 
      </div>
    )
}