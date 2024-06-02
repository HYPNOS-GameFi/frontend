import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  bgColor?: "yellow" | "white" | "gray" | "transparent" | "white-transparent";
  active?: boolean;
  className?: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  width?: string;
  height?: string;
};

export function Button({
  children,
  bgColor = "yellow",
  className,
  type = "button",
  height = "h-[48px]",
  onClick,
  disabled,
  loading,
  width = "w-full",
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        `rounded-lg font-nexa text-sm active:scale-95 uppercase transition-all duration-300 ease-in-out px-8 ${height} ${width} `,
        {
          "bg-white border border-transparent text-black": bgColor === "white",
        },
        {
          "bg-transparent text-white hover:bg-[#EFEFEF] border border-[#EFEFEF] hover:text-black":
            bgColor === "white-transparent",
        },
        {
          "bg-yellow-primary border border-transparent hover:bg-transparent hover:border hover:border-yellow-primary hover:text-[#EFEFEF] text-black":
            bgColor === "yellow",
        },
        {
          "bg-[#EFEFEF] border border-transparent bg-opacity-50 text-[#EFEFEF]":
            bgColor === "gray",
        },
        {
          "bg-transparent text-yellow-primary border border-yellow-primary hover:bg-yellow-primary hover:text-black rounded-md":
            bgColor === "transparent",
        },
        className
      )}
    >
      {loading ? "LOADING..." : children}
    </button>
  );
}
