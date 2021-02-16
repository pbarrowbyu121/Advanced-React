import { createAuth } from "@keystone-next/auth";
import "dotenv/config";
import { User } from "./schemas/User";
import { Order } from "./schemas/Order";
import { Portfolio } from "./schemas/Portfolio";
import { config, createSchema } from "@keystone-next/keystone/schema";
import {
  withItemData,
  statelessSessions,
} from "@keystone-next/keystone/session";
// import console = require("console");

const databaseURL =
  process.env.DATABASE_URL || "mongodb://localhost/papertraders";

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 7, // how long stay signed in
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
    //TOD: Add in initial rolds here
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: "mongoose",
      url: databaseURL,
      // TODO: Add data seeding here
    },
    lists: createSchema({
      // Schema items go in here
      User,
      Order,
      Portfolio,
    }),
    ui: {
      // Show the UI only for people who pass this test
      isAccessAllowed: ({ session }) => {
        // console.log(session);
        return !!session?.data;
      },
    },
    // Add session values here
    session: withItemData(statelessSessions(sessionConfig), {
      User: "id",
    }),
  })
);
