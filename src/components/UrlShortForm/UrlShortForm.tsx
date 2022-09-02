import clsx from "clsx";
import React from "react";
import { useForm } from "react-hook-form";
import { useUrlHistory } from "../../hooks/useUrlHistory";
import { useUrlShortMutation } from "../../hooks/useUrlShortMutation";
import Button from "../../nsw/ui/components/Button";
import { UrlModel } from "../../types";
import ErrorMessage from "../ErrorMessage";
import UrlHistory from "../UrlHistory";

interface FormValues {
  originalUrl: string;
}

type ButtonStatus = "copyState" | "submitState" | "copiedState";

const UrlShortForm = () => {
  const { mutate, isLoading, isError } = useUrlShortMutation();
  const { history, setHistory } = useUrlHistory();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const { register, handleSubmit, setValue, setFocus } = useForm<FormValues>({
    defaultValues: {
      originalUrl: "",
    },
  });
  const [buttonStatus, setButtonStatus] =
    React.useState<ButtonStatus>("submitState");
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleSuccess({ id, originalUrl, shortCode, link }: UrlModel) {
    setHistory((pre: any) => [{ id, originalUrl, shortCode, link }, ...pre]);
    setValue("originalUrl", link);
    setButtonStatus("copyState");
  }

  function handleClickButton() {
    // if button status submit state we don't do anything
    if (buttonStatus === "submitState") return;

    // we copy to clipboard and set button status to copied state
    setButtonStatus("copiedState");

    // we focus on input and select value
    setFocus("originalUrl", { shouldSelect: true });

    setTimeout(() => {
      setButtonStatus("copyState");
    }, 1000);
  }

  function onSubmit({ originalUrl }: FormValues) {
    mutate(
      { originalUrl },
      {
        onSuccess: ({ data }) => {
          handleSuccess(data);
        },
        onError: (error: any) => {
          setErrorMessage(
            error?.message ||
              "Something went wrong with this url, please try again",
          );
        },
      },
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
        <label htmlFor="originalUrl" className="sr-only">
          Shorten
        </label>

        <div className="relative w-full">
          <input
            type="text"
            id="originalUrl"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Shorten your link"
            {...register("originalUrl")}
          />
        </div>

        {/* <CopyToClipboard text={""} onCopy={() => console.log("Copied")}> */}
        <Button
          disabled={isLoading}
          type={buttonStatus === "submitState" ? "submit" : "button"}
          onClick={handleClickButton}
          className={clsx(
            buttonStatus === "copiedState"
              ? "bg-green-600 "
              : "bg-blue-700  focus:ring-blue-300",
            "py-4 !px-10 ml-2 text-white borderfocus:ring-4 focus:outline-none ",
          )}
        >
          {buttonStatus === "copyState"
            ? isLoading
              ? "Please wait.."
              : "Copy"
            : buttonStatus === "copiedState"
            ? "Copied!"
            : "Shorten"}
        </Button>
      </form>

      {errorMessage && <ErrorMessage message={errorMessage} />}

      {history && history.length ? <UrlHistory /> : null}
    </div>
  );
};

export default UrlShortForm;
