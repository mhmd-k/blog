import { CardContent, Card, CardHeader } from "@mui/material";
import { Skeleton } from "@mui/material";
import React from "react";

function LazyPost() {
  return (
    <Card sx={{ width: "100%", margin: "20px 0", height: 300 }}>
      <CardHeader
        action={null}
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
      <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      <CardContent>
        <React.Fragment>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </React.Fragment>
      </CardContent>
    </Card>
  );
}

export default LazyPost;
