import React from "react";
import { TableToggleCommonProps } from "react-table";

interface Props extends TableToggleCommonProps {}

const TableCheckbox = React.forwardRef<any, Props>(
  ({ indeterminate, ...rest }, ref: any) => {
    const defaultRef = React.useRef<null>();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <input type="checkbox" ref={resolvedRef} {...rest} className="w-4 h-4" />
    );
  },
);

TableCheckbox.displayName = "TableCheckbox";

export default TableCheckbox;
