import Layout from "../components/Layout";
import { useUrlsQuery } from "../hooks/useUrlsQuery";

const Dashboard = () => {
  const { data, isLoading, isError } = useUrlsQuery({});

  const handleDelete = (urlId: string) => {
    console.log(urlId);
  };

  return (
    <Layout>
      Dashboard
      {data && !isLoading && !isError ? (
        <div>
          {data.data.map((url, index) => (
            <div key={index}>
              {url.shortCode}
              <button onClick={() => handleDelete(url.id)}>X</button>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </Layout>
  );
};

export default Dashboard;
