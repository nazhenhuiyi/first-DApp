import type { NextPage } from "next";
import dynamic from "next/dynamic"

const ClientComponent = dynamic(() => import("../components/wallet"), {
  ssr: false,
})
const Home: NextPage = () => {
  return <ClientComponent />
};

export default Home;
