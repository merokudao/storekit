"use client";
import { useEffect } from "react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import "@stoplight/elements/styles.min.css";
import { API } from "@stoplight/elements";
import { useSession, signIn, signOut } from "next-auth/react";

const allowedEmailDomains =
  process.env.NEXT_PUBLIC_ALLOWED_EMAIL_DOMAINS?.split(",") || [];
if (!allowedEmailDomains.includes("bitpack.me")) {
  allowedEmailDomains.push("bitpack.me");
}
const allowedEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(",") || [];

const APIDocs: NextPage = () => {
  const router = useRouter();
  const query = router.query.apidocs;
  const { data: session, status } = useSession();

  // for debugging on prod
  console.log(session?.user);

  const emailDomain = session?.user?.email?.split("@")?.[1] || "";

  useEffect(() => {
    if (!query) return;
    const validate = async () => {
      const res = await fetch(`/api-specs/${query}.yml`);
      return res.ok;
    };
    validate().then((valid) => {
      if (!valid)
        router.push("/404").then(() => "Invalid api spec, Redirecting to 404");
    });

    if (status === "authenticated") {
      if (
        !allowedEmailDomains.includes(emailDomain) &&
        !allowedEmails.includes(session?.user?.email || "")
      ) {
        window.alert("You must be a bitpack.me user to access this page.");
        signOut().then(() => {
          console.log("Logged in with non-bitpack.me email, logging out");
        });
        signIn().then(() => {
          console.log(
            "User is unauthenticated, redirecting to /api/auth/signin"
          );
        });
      }
    }

    if (status === "unauthenticated") {
      signIn().then(() => {
        console.log("User is unauthenticated, redirecting to /api/auth/signin");
      });
    }
  }, [query, router, status, emailDomain]);

  if (
    !query ||
    status === "loading" ||
    status === "unauthenticated" ||
    (status === "authenticated" &&
      !allowedEmailDomains.includes(emailDomain) &&
      !allowedEmails.includes(session?.user?.email || ""))
  ) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Bitpack.me API Docs</title>
        <meta name="description" content="API docs for bitpack.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <API
          apiDescriptionUrl={`/api-specs/${router.query.apidocs}.yml`}
          router="hash"
        />
      </main>
    </>
  );
};

export default APIDocs;
