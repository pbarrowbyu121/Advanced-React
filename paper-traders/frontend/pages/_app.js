import { ApolloProvider } from "@apollo/client";
import App, { Container } from "next/app";
import Page from "../components/Page";
import withData from '../lib/withData'

class MyApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props;
    console.log(apollo)
    return (
      <ApolloProvider client={apollo}>
        <Page>
      <Component {...pageProps} />
    </Page>
    </ApolloProvider>
    );
  }
}

MyApp.getInitialProps = async function({ Component, ctx }) {
  let pageProps = {};
  if(Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query
  return {pageProps}
}
export default withData(MyApp);
