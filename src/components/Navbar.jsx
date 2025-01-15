import { Mountain } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-black h-16 ">
      <div className="flex items-center justify-start md:justify-center lg:justify-start h-full p-4 px-8">
        <Link href="/" className="flex items-center">
          <Image src={"/ABG.png"} width={84} height={69} />
        </Link>
      </div>
    </nav>
  );
}
