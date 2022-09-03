import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useLinkHistory } from "../../hooks/useLinkHistory";
import { useUrlShortMutation } from "../../hooks/useUrlShortMutation";
import Alert from "../../nsw/ui/components/Alert";
import Button from "../../nsw/ui/components/Button";
import TextField from "../../nsw/ui/components/TextField";
import Typography from "../../nsw/ui/components/Typography";
import { UrlModel } from "../../types";
import UrlHistory from "../LinkHistory";

interface FormValues {
  fullUrl: string;
  expiredAt?: string;
}

type ButtonStatus = "copyState" | "submitState" | "copiedState";

const LinkShortForm = () => {
  const [showAdvanced, setShowAdvanced] = React.useState<boolean>(false);
  const { mutate, isLoading } = useUrlShortMutation();
  const { history, setHistory } = useLinkHistory();

  const validationSchema = Yup.object({
    fullUrl: Yup.string()
      .required("Please enter a valid URL!")
      .url("url must be a valid URL"),
    expiredAt: Yup.string().nullable(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    setError,
    formState: { isValid, touchedFields, errors },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      fullUrl: "",
      expiredAt: "",
    },
    resolver: yupResolver(validationSchema),
  });
  const [buttonStatus, setButtonStatus] =
    React.useState<ButtonStatus>("submitState");

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

  function onSubmit({ fullUrl, expiredAt }: FormValues) {
    mutate(
      { fullUrl, expiredAt: expiredAt || undefined },
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
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="mb-10">
        <div className="space-y-4">
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

          <div className={showAdvanced ? "block" : "hidden"}>
            <Typography className="text-gray-600 dark:text-white mb-2">
              Expiry
            </Typography>

            <TextField type="date" fullWidth {...register("expiredAt")} />
          </div>

          <button
            type="button"
            onClick={() => setShowAdvanced((value) => !value)}
            className="flex items-center"
          >
            <Cog6ToothIcon className="w-6 h-6 mr-2" />
            <span>Advanced Options</span>
          </button>

          <Button
            disabled={isLoading || !isValid}
            type={buttonStatus === "submitState" ? "submit" : "button"}
            onClick={handleClickButton}
            className={clsx(
              buttonStatus === "copiedState"
                ? "bg-green-600 "
                : "bg-blue-700  focus:ring-blue-300",
              "!py-4 !px-20 text-white borderfocus:ring-4 focus:outline-none",
            )}
            fullWidth
          >
            {buttonStatus === "copyState"
              ? isLoading
                ? "Please wait.."
                : "Copy"
              : buttonStatus === "copiedState"
              ? "Copied!"
              : "Shorten"}
          </Button>
        </div>
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
