import Layout from "../components/Layout";
import UrlTable from "../components/UrlTable";
import { useUrlsQuery } from "../hooks/useUrlsQuery";

const Dashboard = () => {
  const { data, isLoading, isError } = useUrlsQuery({});

  return (
    <Layout>
      Dashboard
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
