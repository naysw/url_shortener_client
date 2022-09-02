import Layout from "../components/Layout";
import UrlShortBox from "../components/UrlShortForm";

const Home = () => {
  return (
    <Layout>
      <div className="py-10">
        <UrlShortBox />
      </div>
    </Layout>
  );
};

export default Home;
