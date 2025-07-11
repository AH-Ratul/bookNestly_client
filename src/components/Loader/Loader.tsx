import { Loader2 } from "lucide-react";

const Loader = ({ color, size }: any) => {
  return (
    <div className="flex justify-center items-center mx-auto z-50">
      <Loader2
        className={`text-${color} animate-spin`}
        style={{ fontSize: size }}
      />
    </div>
  );
};

export default Loader;
