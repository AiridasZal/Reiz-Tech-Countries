import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const TableControls = ({ children }: Props) => {
  return (
    <div className="flex flex-wrap gap-4 py-8 md:gap-0 md:justify-start sm:[&>*:last-child]:ml-auto sm:[&>*:last-child]:mr-0">
      {children}
    </div>
  );
};

export default TableControls;
