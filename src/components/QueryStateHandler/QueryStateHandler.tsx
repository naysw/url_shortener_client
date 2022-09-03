import React from "react";

type QueryStatus = "loading" | "error" | "success";

interface Props<T> {
  status: QueryStatus;
  data: T;
  error: any;
  /**
   * React children or child render callback
   */
  children?: ((props: T) => React.ReactNode) | React.ReactNode;

  /**
   * render loading
   */
  renderLoading?: React.ReactNode;

  /**
   * render error
   */
  renderError?: ((error: any) => React.ReactNode) | React.ReactNode;

  /**
   * render idle
   */
  renderIdle?: React.ReactNode;
}

const QueryStateHandler = <T extends unknown>({
  children,
  status,
  error,
  data,
  renderLoading,
  renderError,
  renderIdle,
}: Props<T>): React.ReactElement => {
  if (status === "loading")
    return <>{renderLoading ? renderLoading : "Loading"}</>;

  if (status === "error")
    return (
      <>
        {renderError && typeof renderError === "function"
          ? renderError(error)
          : React.isValidElement(renderError)
          ? renderError
          : null}
      </>
    );

  if (status === "success")
    return <>{children && typeof children === "function" && children(data)}</>;

  return <>{renderIdle}</>;
};

export default QueryStateHandler;
