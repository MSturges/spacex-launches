import React, { useEffect, useState } from "react";
import "./App.css";
import { GraphQLClient } from "graphql-request";

import Header from "./components/Header";
import Loading from "./components/Loading";
import Launches from "./components/Launches";

const launchesQuery = `{
  launches(sort: "launch_date_utc", order: "ASC") {
    id
    launch_success
    mission_id
    launch_date_utc
    launch_site {
      site_name
    }
    rocket {
      rocket_name
    }
    details
    links {
      video_link
    }
  }
}`;

const client = new GraphQLClient("https://api.spacex.land/graphql/");

function useGraphQL(query) {
  const [state, setState] = useState({ loading: true });

  useEffect(() => {
    client.request(query).then(
      data => {
        setState({ data, loading: false });
      },
      err => {
        console.error(err);
      }
    );
  }, [query]);

  return state;
}

export default function App() {
  const { data, loading } = useGraphQL(launchesQuery);

  return (
    <div>
      <Header />
      {loading ? <Loading /> : <Launches launches={data.launches} />}
    </div>
  );
}
