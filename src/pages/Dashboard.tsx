import Layout from "../components/Layout";
import UrlTable from "../components/LinkTable";
import useAuth from "../hooks/useAuth";
import { useUrlsQuery } from "../hooks/useUrlsQuery";
import Typography from "../nsw/ui/components/Typography";
import { Paths } from "../paths";

const Dashboard = () => {
  const { data, isLoading, isError } = useUrlsQuery({});
  const { user } = useAuth({ redireactIfUnauthenticated: Paths.LOGIN });

  return (
    <Layout>
      <Typography variant="h4" className="mb-4">
        Welcome {user?.name}
      </Typography>

      {data && !isLoading && !isError ? (
        <div>
          <UrlTable urls={data.data} />
        </div>
      ) : (
        <div>Loading</div>
      )}
    </Layout>
  );
};

export default Dashboard;
