import { FiExternalLink, FiLogOut, FiRefreshCw } from "react-icons/fi";

const Gmail = () => {
  return (
    <div className="relative h-full w-1/2 rounded-lg bg-zinc-950 px-6 py-4 text-zinc-300">
      <p className="border-b">Latest emails</p>
      <div className="mails relative h-[calc(100vh/12*8)]">
        <ul className="emails h-full overflow-y-scroll">
          {[...Array(7)].map((_, i) => (
            <GmailElement key={i} />
          ))}
        </ul>
      </div>
      <div className="absolute bottom-0 left-0 flex w-full flex-row justify-between bg-zinc-950 px-8 text-lg">
        <div className="flex flex-row gap-4">
          <button title="Refresh">
            <FiRefreshCw />
          </button>
          <button title="Log Out">
            <FiLogOut />
          </button>
        </div>

        <button className="text-center">
          See more <FiExternalLink className="inline" />
        </button>
      </div>
    </div>
  );
};

function GmailElement() {
  return (
    <li className="cursor-pointer bg-zinc-900 p-4 transition-colors hover:bg-zinc-800">
      <div className="dot"></div>
      <a
        href="https://mail.google.com/mail/u/?authuser=croosdev@gmail.com#all/1932ca78cfda69ba"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="mail-header">
          <p className="username">
            <span>
              Djinni.co&nbsp;&nbsp;
              <span className="user-email">magic@djinni.co</span>
            </span>
            <span className="header-time">15/11</span>
          </p>
        </div>
        <div className="mail-body">
          <p className="mail-line">
            <span className="subject">
              Djinni statistics for the week.&nbsp;
            </span>
            Djinni.co Search results Front-End Developer, from $500 in a week:
            no new proposals. Browse Jobs PS: Use Telegram-bot @d
          </p>
        </div>
      </a>
    </li>
  );
}

export default Gmail;
