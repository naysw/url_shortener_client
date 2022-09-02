import clsx from "clsx";
import React from "react";
import { useForm } from "react-hook-form";
import { useLinkHistory } from "../../hooks/useLinkHistory";
import { useUrlShortMutation } from "../../hooks/useUrlShortMutation";
import Alert from "../../nsw/ui/components/Alert";
import Button from "../../nsw/ui/components/Button";
import TextField from "../../nsw/ui/components/TextField";
import { UrlModel } from "../../types";
import UrlHistory from "../LinkHistory";

interface FormValues {
  fullUrl: string;
}

type ButtonStatus = "copyState" | "submitState" | "copiedState";

const LinkShortForm = () => {
  const { mutate, isLoading, isError } = useUrlShortMutation();
  const { history, setHistory } = useLinkHistory();
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    setError,
    formState: { isValid, isDirty, touchedFields, errors },
  } = useForm<FormValues>({
    defaultValues: {
      fullUrl: "",
    },
  });
  const [buttonStatus, setButtonStatus] =
    React.useState<ButtonStatus>("submitState");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (buttonStatus === "copyState") {
      console.log("CP");
    }
  }, [buttonStatus]);

  /**
   * handle success
   *
   * @param param0 UrlModel
   */
  function handleSuccess({ id, fullUrl, shortCode, link }: UrlModel) {
    setHistory((pre: any) => [{ id, fullUrl, shortCode, link }, ...pre]);
    setValue("fullUrl", link);
    setButtonStatus("copyState");
  }

  function handleClickButton() {
    // if button status submit state we don't do anything
    if (buttonStatus === "submitState") return;

    // we copy to clipboard and set button status to copied state
    setButtonStatus("copiedState");

    // we focus on input and select value
    setFocus("fullUrl", { shouldSelect: true });

    setTimeout(() => {
      setButtonStatus("copyState");
    }, 1000);
  }

  function onSubmit({ fullUrl }: FormValues) {
    mutate(
      { fullUrl },
      {
        onSuccess: ({ data }) => handleSuccess(data),
        onError: (error: any) => {
          setError(
            "fullUrl",
            {
              message:
                error?.message ||
                "Something went wrong with this url, please try again",
            },
            { shouldFocus: true },
          );
        },
      },
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
        <div className="w-full">
          <TextField
            {...register("fullUrl")}
            placeholder="Shorten your link"
            fullWidth
            className={
              buttonStatus === "submitState"
                ? ""
                : "text-blue-600 font-semibold"
            }
            error={
              touchedFields.fullUrl && errors.fullUrl && Boolean(errors.fullUrl)
            }
            // helperText={
            //   touchedFields.fullUrl &&
            //   errors.fullUrl &&
            //   errors.fullUrl.message
            // }
          />
        </div>

        <Button
          disabled={isLoading || !(isValid && isDirty)}
          type={buttonStatus === "submitState" ? "submit" : "button"}
          onClick={handleClickButton}
          className={clsx(
            buttonStatus === "copiedState"
              ? "bg-green-600 "
              : "bg-blue-700  focus:ring-blue-300",
            "!py-4 !px-20 ml-6 text-white borderfocus:ring-4 focus:outline-none ",
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

      {errors.fullUrl && (
        <Alert severity="error" className="mt-4">
          {errors.fullUrl.message}
        </Alert>
      )}

      {history && history.length ? <UrlHistory /> : null}
    </div>
  );
};

export default LinkShortForm;
