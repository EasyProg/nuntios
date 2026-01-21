const anyUrlRegex =
  /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

const centerLayout =
  "flex items-center justify-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]";

const formInput =
  "focus:shadow-[0_5px_30px_15px_rgb(1,170,174,0.5)] shadow-[0_3ppx_20px_10px_rgb(1,170,174,0.3)] box-border inline-flex h-[35px] w-full appearance-none items-center text-gray-500 justify-center rounded bg-blackA2 px-2.5 text-[15px] leading-none text-opacity-40 outline-none selection:bg-blackA6";

const formButton =
  "mt-2.5 box-border hover:cursor-pointer inline-flex h-[35px] w-full bg-cyan-700 hover:bg-cyan-650 items-center justify-center rounded px-[15px] font-medium leading-none text-violet11 hover:shadow-[0_5px_30px_15px_rgb(1,170,174,0.5)] focus:shadow-[0_5px_30px_15px_rgb(1,170,174,0.5)] focus:outline-none";

const chatItem =
  "flex-col p-1 rounded-xs justify-between bg-cyan-950/40  hover:bg-cyan-900/50 text-gray-400 w-auto min-h-14 min-w-60";

const chatItemActive =
  "flex-col p-1 rounded-xs justify-between bg-cyan-700/40 hover:bg-cyan-600/40 text-gray-400 w-auto min-h-14 min-w-60";

const chatInput =
  "w-auto min-w-100 h-auto border-indigo-500 !rounded-md !text-gray-500 !bg-gray-600/30 p-3 outline-none min-h-40 w-full";

const emojis = [
  "😂",
  "❤️",
  "😍",
  "🤣",
  "😊",
  "🙏",
  "💕",
  "😭",
  "😘",
  "👍",
  "😅",
  "👏",
  "😁",
  "🔥",
  "💔",
  "🤔",
  "😆",
  "🙄",
  "💪",
  "😉",
  "👌",
  "🤗",
  "😔",
  "😎",
  "💙",
  "🎉",
  "💜",
  "😢",
  "💗",
  "😋",
  "😜",
  "🤷",
  "😩",
  "🙌",
  "💖",
  "😌",
  "😏",
  "🤪",
  "😴",
  "😬",
  "👀",
  "💯",
  "🤦",
  "🎶",
  "💞",
  "✌️",
  "✨",
  "🤙",
  "😱",
  "😡",
];

const additionalEmojies = [
  "🥰",
  "😎",
  "🤩",
  "🥳",
  "😇",
  "🤠",
  "🥺",
  "🤤",
  "🤫",
  "🤭",
  "🧐",
  "🤓",
  "😈",
  "👿",
  "💀",
  "☠️",
  "👻",
  "👽",
  "🤖",
  "🎃",
  "😺",
  "😸",
  "😹",
  "😻",
  "😼",
  "😽",
  "🙀",
  "😿",
  "😾",
  "💋",
  "👄",
  "🦷",
  "👅",
  "👂",
  "👃",
  "👁️",
  "👀",
  "🧠",
  "🦴",
  "💪",
  "🦵",
  "🦶",
  "👣",
  "👁️‍🗨️",
  "🗨️",
  "🗯️",
  "💭",
  "💬",
  "👤",
  "👥",
];

export {
  centerLayout,
  formInput,
  formButton,
  chatItem,
  chatItemActive,
  chatInput,
  emojis,
  additionalEmojies,
};
