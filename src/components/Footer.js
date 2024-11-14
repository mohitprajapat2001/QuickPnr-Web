/**Footer Component */
import { FaBolt, FaGithub, FaGoogle, FaBook } from "react-icons/fa";

function Footer() {
  /**Daisy UI Footer Component */

  return (
    <>
      <footer className="footer bg-neutral text-neutral-content items-center p-4">
        <aside className="grid-flow-col items-center">
          <FaBolt className="transition-all hover:scale-120 scale-95 delay-150 duration-75 hover:animate-ping" />
          <p>
            Mohit Prajapat © {new Date().getFullYear()} - All right reserved
          </p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a
            href="mailto:mohit.prajapat@trootech.com"
            className="transition-all hover:scale-110 scale-95 delay-100 duration-300"
            target="_blank"
            rel="noreferrer"
          >
            <FaGoogle />
          </a>
          <a
            href="https://github.com/mohit-trootech/"
            className="transition-all hover:scale-110 scale-95 delay-100 duration-300"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="/about"
            className="transition-all hover:scale-110 scale-95 delay-100 duration-300"
            target="_blank"
            rel="noreferrer"
          >
            <FaBook />
          </a>
        </nav>
      </footer>
    </>
  );
}

export default Footer;
