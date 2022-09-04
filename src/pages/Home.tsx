import Layout from "../components/Layout";
import LinkHistory from "../components/LinkHistory";
import LinkItemSkeleton from "../components/LinkItemSkeleton";
import LinkShortForm from "../components/LinkShortForm";
import useAuth from "../hooks/useAuth";
import { Paths } from "../paths";

const Home = () => {
  const { user } = useAuth({ redireactIfUnauthenticated: Paths.LOGIN });

  return (
    <Layout>
      <div className="py-10">
        {user ? (
          <div>
            <LinkShortForm />
            <LinkHistory />
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="bg-gray-200 select-none text-transparent w-full h-12 rounded-md animate-pulse mb-6">
                Text Field
              </div>

              <div className="bg-gray-200 select-none text-transparent w-full h-12 rounded-md animate-pulse">
                Button
              </div>
            </div>

            {new Array(3).fill(0).map((_, index) => (
              <LinkItemSkeleton key={index} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
