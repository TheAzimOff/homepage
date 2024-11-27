//@ts-nocheck
"use client";
import { useCallback, useEffect, useState } from "react";
import Gmail from "./gmail";
import { extractEmailInfo } from "@/lib/utils";

const GmailContainer = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const SCOPES =
    "https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly";

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [clientLoaded, setClientLoaded] = useState(false);
  const [messagesIds, setMessagesIds] = useState([]);
  const [emails, setEmails] = useState([]);

  const [gapi, setGapi] = useState(null);

  // Checking if component running on client side and if so, load gapi
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("gapi-script").then((module) => {
        setGapi(module.gapi);
      });
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    if (gapi) {
      gapi.load("client:auth2", function () {
        gapi.auth2.init({ client_id: CLIENT_ID }).then((googleAuth) => {
          loadClient();
          if (
            gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile()
          ) {
            setUserId(
              gapi.auth2
                .getAuthInstance()
                .currentUser.get()
                .getBasicProfile()
                .getId(),
            );
            setUserEmail(
              gapi.auth2
                .getAuthInstance()
                .currentUser.get()
                .getBasicProfile()
                .getEmail(),
            );
          }
          if (googleAuth.isSignedIn.get()) {
            setSignedIn(true);
          }
        });
      });
    }
  }, [gapi, signedIn, CLIENT_ID]);

  const listMessages = useCallback(() => {
    setLoading(true);
    return gapi.client.gmail.users.messages
      .list({ userId: userId, maxResults: 15, q: "category: primary" })
      .then(
        (res) => {
          const messages = res.result.messages;
          const messagesId = [];
          messages.forEach((msg) => messagesId.push(msg.id));
          setMessagesIds(messagesId);
        },
        (err) => {
          console.log("Error getting messages " + err);
          setLoading(false);
          setMessagesIds([]);
        },
      );
  }, [userId]);

  const listEmails = () => {
    setLoading(true);
    setEmails([]);
    messagesIds.forEach((id) => getSingleEmail(id));
    setLoading(false);
  };

  const getSingleEmail = (messageId) => {
    const request = gapi.client.gmail.users.messages.get({
      userId,
      id: messageId,
      format: "metadata",
      metadataHeaders: ["Subject", "From", "Date"],
    });
    return request.execute((res) => {
      const { senderEmail, senderName } = extractEmailInfo(
        res.payload.headers.filter((item) => item.name === "From")[0].value,
      );
      const email = {
        id: res.id,
        threadId: res.threadId,
        subject: res.payload.headers.filter(
          (item) => item.name === "Subject",
        )[0].value,
        from: res.payload.headers.filter((item) => item.name === "From")[0]
          .value,
        date: res.payload.headers.filter((item) => item.name === "Date")[0]
          .value,
        internalDate: res.internalDate,
        snippet: res.snippet,
        unRead: res.labelIds.includes("UNREAD"),
        senderEmail,
        senderName,
      };
      setEmails((prevState) => [...prevState, email]);
    });
  };

  useEffect(() => {
    if (clientLoaded && userId) {
      listMessages();
    }
  }, [clientLoaded, userId, listMessages]);

  useEffect(listEmails, [messagesIds]);

  function loadClient() {
    gapi.client.setApiKey(API_KEY);
    return gapi.client
      .load("https://content.googleapis.com/discovery/v1/apis/gmail/v1/rest")
      .then(
        () => setClientLoaded(true),
        () => {
          setClientLoaded(false);
          setLoading(false);
        },
      );
  }

  const handleAuth = () => {
    return gapi.auth2
      .getAuthInstance()
      .signIn({ scope: SCOPES })
      .then(
        () => setSignedIn(true),
        (err) => {
          setSignedIn(false);
          setLoading(false);
          console.log(err);
        },
      );
  };

  const handleLogout = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      auth2.disconnect();
      setSignedIn(false);
    });
  };

  const markAsRead = (emailId) => {
    const newEmails = emails.map((email) =>
      email.id === emailId ? { ...email, unRead: false } : email,
    );
    setEmails(newEmails);
  };

  return (
    <Gmail
      emails={emails.sort(
        (a, b) => parseInt(b.internalDate) - parseInt(a.internalDate),
      )}
      userEmail={userEmail}
      handleLogout={handleLogout}
      reloadEmails={listEmails}
      markAsRead={markAsRead}
      loading={loading}
      signedIn={signedIn}
      handleAuth={handleAuth}
    />
  );
};

export default GmailContainer;
