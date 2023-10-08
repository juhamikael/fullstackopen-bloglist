import { cn } from "../lib/utils";

export const renderPasswordBlocks = (passwordSafeLevel) => {
  const blocks = [];
  for (let i = 1; i <= 3; i++) {
    const color =
      i <= passwordSafeLevel.numLevel
        ? `${passwordSafeLevel.color}`
        : "bg-white";
    blocks.push(
      <div
        key={i}
        className={cn(
          "w-1/3 h-4 rounded-xl transition-all duration-500 ease-in-out",
          color
        )}
      ></div>
    );
  }
  return (
    <div>
      <div className="flex gap-x-2">{blocks}</div>
      <div
        className={cn(
          "text-xs font-bold transition-all duration-500 ease-in-out",
          passwordSafeLevel.textColor
        )}
      >
        {passwordSafeLevel.level}
      </div>
    </div>
  );
};
