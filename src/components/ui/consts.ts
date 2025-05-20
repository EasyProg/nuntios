const centerLayout =
  "flex items-center justify-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]";

const inputClass =
  "focus:shadow-[0_5px_30px_15px_rgb(1,170,174,0.5)] box-border inline-flex h-[35px] w-full appearance-none items-center text-gray-500 justify-center rounded bg-blackA2 px-2.5 text-[15px] leading-none text-opacity-40 outline-none selection:bg-blackA6";

const buttonClass =
  "mt-2.5 box-border hover:cursor-pointer inline-flex h-[35px] w-full bg-cyan-700 hover:bg-cyan-650 items-center justify-center rounded px-[15px] font-medium leading-none text-violet11 hover:shadow-[0_5px_30px_15px_rgb(1,170,174,0.5)] focus:shadow-[0_5px_30px_15px_rgb(1,170,174,0.5)] focus:outline-none";

const chatItemClass =
  "flex-col p-2 rounded-xs justify-between bg-cyan-950/40  hover:bg-cyan-900/50 text-gray-400 w-auto min-h-15 min-w-60";

const chatItemClassActive =
  "flex-col p-2 rounded-xs justify-between bg-cyan-700/40 hover: bg-cyan-650/40 text-gray-400 w-auto min-h-15 min-w-60";
export {
  inputClass,
  buttonClass,
  centerLayout,
  chatItemClass,
  chatItemClassActive,
};
