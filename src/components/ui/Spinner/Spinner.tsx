import type { FC } from "react";

const Spinner: FC = () => (
  <div className="flex">
    <div className="w-5 h-5 bg-cyan-500/40 rounded-sm animate-bounce [animation-delay:0.1s]" />
    <div className="w-5 h-5 bg-cyan-500/40 rounded-sm ml-1 mr-1 animate-bounce [animation-delay:0.3s]" />
    <div className="w-5 h-5 bg-cyan-500/40 rounded-sm animate-bounce [animation-delay:0.5s]" />
  </div>
);

export default Spinner;
