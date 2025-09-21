import logo from "@/assets/tiburon_logo.jpeg";

export default function Logo() {
  return (
    <div className="fixed top-5 right-5 z-50">
      <img
        src={logo}
        alt="Logo"
        className="w-15 h-15 cursor-pointer rounded-md"
      />
    </div>
  );
}
