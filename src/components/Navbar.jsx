import { Mountain } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-black h-16 ">
      <div className="flex items-center justify-start md:justify-center lg:justify-start h-full md:ml-32">
        <Link href="/" className="flex items-center">
          <Image src={"/ABG.png"} width={60} height={60} />
        </Link>
      </div>
    </nav>
  );
}
