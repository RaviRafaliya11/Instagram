import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/Modal";

export default function Home({ randomusers }) {
  return (
    <div>
      <Head>
        <title>Instagram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Feed randomusers={randomusers} />
      <Modal />
    </div>
  );
}
export async function getServerSideProps() {
  const randomusers = await fetch(
    "https://randomuser.me/api/?results=50&inc=name,picture,email"
  ).then((res) => res.json());
  return {
    props: {
      randomusers: randomusers.results,
    },
  };
}
