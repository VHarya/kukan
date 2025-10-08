import { ReactNode } from "react";
import { createPortal } from "react-dom";

export default function PortalBody({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return createPortal(children, document.body);
}
