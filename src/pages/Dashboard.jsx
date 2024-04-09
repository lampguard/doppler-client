import { useEffect } from "react";
import Layout from "../components/DashboardLayout/Template";
import { useLazyGetMetricsQuery } from "../services/metrics";

const Dashboard = () => {
  const [trigger, { isLoading, data, isUninitialized }] =
    useLazyGetMetricsQuery();
  useEffect(() => {
    trigger()
      .unwrap()
      .then((data) => console.log)
      .catch(console.error);
  }, []);

  return (
    <Layout title="Dashboard">
      {isLoading || isUninitialized ? (
        <div className="h-screen w-screen flex items-center justify-center">
          <span className="loading loading-ring loading-lg text-theme"></span>
        </div>
      ) : (
        <>{JSON.stringify(data)}</>
      )}
    </Layout>
  );
};

export default Dashboard;
