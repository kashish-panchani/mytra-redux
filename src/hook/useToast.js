  import toast from "react-hot-toast";

const useToast = () => {
  const success = (msg) => {
    toast.success(msg);
  };

  const error = (msg) => {
    toast.error(msg);
  };

  return {
    error,
    success,
  };
};

export default useToast;
