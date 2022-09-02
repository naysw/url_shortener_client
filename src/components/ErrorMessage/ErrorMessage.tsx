interface Props {
  message: string;
}

const ErrorMessage = ({ message }: Props) => {
  return (
    <div className="bg-red-400 rounded-lg text-white px-3 py-2 mt-4">
      {message}
    </div>
  );
};

export default ErrorMessage;
