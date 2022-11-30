import { useEffect, useRef, useState } from "react";
import { createScript } from "../../utils/create-scripts";

export enum Status {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
}

interface WrapperProps {
  children: React.ReactNode;
  apiKey: string;
  render: (status: Status) => React.ReactElement;
}
export const Wrapper = ({ children, apiKey, render }: WrapperProps) => {

  const [status, setStatus] = useState(Status.LOADING);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === true) return

    const script = createScript({ apiKey })
    script.onload = () => setStatus(Status.SUCCESS);

    return () => {
      effectRan.current = true;
    }
  }, [])

  if (status === Status.SUCCESS && children) return <>{children}</>

  if (render) return render(status);

  return null;
}

export default Wrapper