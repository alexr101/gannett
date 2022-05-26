import Head from "next/head";
import { Container, Grid, Typography } from "@mui/material";
import PublicNoticeForm from "../components/PublicNoticeForm";
import PublicNoticeList from "../components/PublicNoticeList";
import Submissions from "../submissions";

export default function PublicNoticePage() {
  return (
    <Container>
      <Head>
        <title>Public Notices</title>
        <meta name="description" content="Public Notices" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid>
        <Typography variant="h1">Public Notices</Typography>
      </Grid>
      <PublicNoticeForm />
    </Container>
  );
}
