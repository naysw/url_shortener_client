import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
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
import CopyButton from "../CopyButton";
import UrlHistory from "../LinkHistory";

interface FormValues {
  fullUrl: string;
  expiredAt?: string;
}

const LinkShortForm = () => {
  const [showAdvanced, setShowAdvanced] = React.useState<boolean>(false);
  const { mutate, isLoading } = useUrlShortMutation();
  const { history, setHistory } = useLinkHistory();
  const [copy, setCopy] = React.useState(false);

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
    getValues,
    control,
    reset,
    formState: { isValid, touchedFields, errors },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      fullUrl: "",
      expiredAt: "",
    },
    resolver: yupResolver(validationSchema),
  });

  /**
   * handle success
   *
   * @param param0 UrlModel
   */
  const handleSuccess = ({
    id,
    fullUrl,
    shortCode,
    shortUrl: link,
  }: UrlModel) => {
    setHistory((pre: any) => [
      { id, fullUrl, shortCode, shortUrl: link },
      ...pre,
    ]);
    setValue("fullUrl", link);
  };

  const handleClickButton = () => {
    setCopy(true);
    // we focus on input and select value
    setFocus("fullUrl", { shouldSelect: true });

    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };

  const onSubmit = ({ fullUrl, expiredAt }: FormValues) => {
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
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="mb-10">
        <div className="space-y-4">
          <TextField
            {...register("fullUrl")}
            placeholder="Shorten your link"
            fullWidth
            className="text-blue-600 font-semibold"
            InputProps={{
              endAdornment: <CopyButton text={getValues().fullUrl} />,
            }}
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

            <TextField
              type="date"
              fullWidth
              {...register("expiredAt")}
              error={
                touchedFields.expiredAt &&
                errors.expiredAt &&
                Boolean(errors.expiredAt)
              }
            />
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
            type="submit"
            className="bg-blue-700  focus:ring-blue-300 !py-4 !px-20 text-white borderfocus:ring-4 focus:outline-none"
            fullWidth
          >
            {isLoading ? "Please wait.." : "Shorten"}
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
