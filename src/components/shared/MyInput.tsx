type inputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function MyInput({ type = "search", ...props }: inputProps) {
  return (
    <input
      {...props}
      className={`rounded outline-none px-2 h-9 text-black ${props.className}`}
      {...{ type }}
    />
  );
}
