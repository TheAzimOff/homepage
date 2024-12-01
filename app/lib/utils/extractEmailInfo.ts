export function extractEmailInfo(str:string ) {
  const string = str.replace(/"/g, "").replace(/</g, "").replace(/>/g, "");
  const stringArr = string.split(" ");
  const nameArr = [];
  const emailArr: string[] = [];
  stringArr.forEach((s) => {
    if (!s.includes("@")) {
      nameArr.push(s);
    } else {
      emailArr.push(s);
    }
  });
  if (nameArr.length === 0) {
    nameArr.push(emailArr[0].split("@")[0]);
  }
  return {
    senderName: nameArr.join(" "),
    senderEmail: emailArr.join(" "),
  };
}