import Typography from "../../nsw/ui/components/Typography";

const UserAccount = () => {
  /**
   * get short name
   *
   * @param firstName string
   * @param lastName string
   * @returns string
   */
  function getShortName(firstName: string, lastName?: string) {
    return firstName[0].toUpperCase();
  }

  return (
    <div>
      <div className="h-10 w-10 bg-red-200 rounded-full p-2 text-center cursor-pointer font-bold shadow">
        <Typography className="text-red-500">{getShortName("Ok")}</Typography>
      </div>
    </div>
  );
};

export default UserAccount;
