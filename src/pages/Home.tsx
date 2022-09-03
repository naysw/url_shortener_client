import Layout from "../components/Layout";
import LinkShortForm from "../components/LinkShortForm";
import useAuth from "../hooks/useAuth";
import { Paths } from "../paths";

const Home = () => {
  const { user } = useAuth({ redireactIfUnauthenticated: Paths.LOGIN });

  return (
    <Layout>
      <div className="py-10">
        {user ? <LinkShortForm /> : <div>Loading</div>}
      </div>
    </Layout>
  );
};

export default Home;
