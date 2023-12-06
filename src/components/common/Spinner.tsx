import clsx from "clsx";

export const Spinner = ({ className }: { className?: string }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={clsx(
          "border-white-500 h-10 w-10 animate-spin rounded-full border-t-4 border-solid",
          className
        )}
      ></div>
    </div>
  );
};
