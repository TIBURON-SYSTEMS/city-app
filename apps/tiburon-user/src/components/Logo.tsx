import logo from "@/assets/tiburon_logo.jpeg";

export default function Logo() {
  return (
    <div className="">
      <img
        src={logo}
        alt="Logo"
        className="w-15 h-15 cursor-pointer rounded-sm"
      />
    </div>
  );
}
