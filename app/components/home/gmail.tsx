import { getDayAndMonth } from "@/lib/utils";
import { FiRefreshCw, FiLogOut, FiExternalLink } from "react-icons/fi";
import Loading from "../ui/loading";

interface GmailProps {
  emails: {
    id: string;
    threadId: string;
    internalDate: string;
    subject: string;
    snippet: string;
    date: string;
    from: string;
    unRead: boolean;
    senderName: string;
    senderEmail: string;
  }[];
  userEmail: string;
  signedIn: string;
  loading: boolean;
  handleLogout: () => void;
  reloadEmails: () => void;
  markAsRead: (id: string) => void;
  handleAuth: () => void;
}

const Gmail = ({
  emails,
  userEmail,
  handleLogout,
  reloadEmails,
  markAsRead,
  loading,
  signedIn,
  handleAuth,
}: GmailProps) => {
  return (
    <div className="relative h-full w-1/2 rounded-lg bg-zinc-950 px-6 py-4 text-zinc-300">
      {!loading && !signedIn ? (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="mb-4 text-center text-2xl">
            Login for showing your latest emails
          </div>
          <button
            onClick={handleAuth}
            className="cursor-pointer border-zinc-800 bg-zinc-900 p-4 transition-colors hover:bg-zinc-800"
          >
            Login with Google
          </button>
        </div>
      ) : (
        <>
          <p className="border-b">Latest emails</p>
          {loading ? (
            <Loading />
          ) : (
            <div className="mails relative h-[calc(100vh/12*8)]">
              <ul className="emails h-full divide-y divide-zinc-700 overflow-y-scroll pb-8">
                {emails.map((email) => (
                  <li
                    key={email.id}
                    className="cursor-pointer bg-zinc-900 p-4 transition-colors hover:bg-zinc-800"
                    onClick={() => markAsRead(email.id)}
                  >
                    <a
                      href={`https://mail.google.com/mail/u/?authuser=${userEmail}#all/${email.threadId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="mail-header flex items-center">
                        <div
                          className={`mx-2 h-3 w-3 rounded-full border-2 border-zinc-300 ${email.unRead ? "bg-zinc-300" : ""}`}
                        ></div>
                        <span className="font-bold">
                          {email.senderName || "-"}&nbsp;
                        </span>
                        <span className="italic">
                          {email.senderEmail || "-"}
                        </span>
                        &nbsp;
                        <span className="text-zinc-400">
                          {getDayAndMonth(email.date)}
                        </span>
                      </div>
                      <div className="mail-body">
                        <p className="mail-line">
                          <span className="text-lg font-bold">
                            {email.subject}.&nbsp;
                          </span>
                          {email.snippet.substring(0, 120)}
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="absolute bottom-4 left-0 flex w-full flex-row justify-between bg-zinc-950 px-8 text-lg">
            <div className="flex flex-row gap-4">
              <button title="Refresh" onClick={reloadEmails}>
                <FiRefreshCw />
              </button>
              <button title="Log Out" onClick={handleLogout}>
                <FiLogOut />
              </button>
            </div>
            <a
              href={`https://mail.google.com/mail/u/?authuser=${userEmail}`}
              className="text-center"
            >
              See more <FiExternalLink className="inline" />
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Gmail;
