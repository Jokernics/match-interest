import { forwardRef } from "react";

type inputProps = React.InputHTMLAttributes<HTMLInputElement>;

type Ref = HTMLInputElement;

const MyInput = forwardRef<Ref, inputProps>((props, ref) => (
  <input
    ref={ref}
    {...props}
    className={`rounded outline-none pl-2 h-9 text-black ${props.className}`}
    type={props.type || "search"}
  />
));

export default MyInput;
