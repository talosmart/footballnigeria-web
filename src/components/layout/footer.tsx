import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-text-secondary font-DM-sans grid gap-y-14 bg-white px-3.5 py-12 lg:px-36">
      {/* Social media icons */}
      <section className="border-b-border-default border-b pb-5">
        <ul className="flex items-center justify-center gap-x-4">
          <li>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-x-2 text-sm"
            >
              <Image
                src="/x.svg"
                alt="nigeria football x account"
                width={21}
                height={21}
              />
              <span className="hidden lg:inline-block">Twitter</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-x-2 text-sm"
            >
              <Image
                src="/linkedin.svg"
                alt="nigeria football linkedin account"
                width={21}
                height={21}
              />
              <span className="hidden lg:inline-block">LinkedIn</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-x-2 text-sm"
            >
              <Image
                src="/instagram.svg"
                alt="nigeria football instagram account"
                width={21}
                height={21}
              />
              <span className="hidden lg:inline-block">Instagram</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-x-2 text-sm"
            >
              <Image
                src="/facebook.svg"
                alt="nigeria football facebook account"
                width={21}
                height={21}
              />
              <span className="hidden lg:inline-block">Facebook</span>
            </a>
          </li>
        </ul>
      </section>

      {/* Quick links */}
      <section className="flex flex-wrap gap-x-24 gap-y-4 lg:justify-center">
        <section>
          <h3 className="font-lato text-primary mb-5 text-lg font-semibold">
            Quick Links
          </h3>
          <ul className="grid gap-y-4 text-sm leading-5">
            {[
              { name: "Football", path: "/" },
              { name: "Tranfer", path: "/" },
              { name: "Fan Zone", path: "/fan-zone" },
              { name: "Historical Records", path: "/historical-records" },
              { name: "Grass Root", path: "/grass-root" },
            ].map((link, index) => (
              <li key={index}>
                <Link href={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="font-lato text-primary mb-5 text-lg font-semibold">
            Important
          </h3>
          <ul className="grid gap-y-4 text-sm leading-5">
            {[
              { name: "Competitions", path: "/" },
              { name: "News", path: "/" },
              { name: "Leagues", path: "/fan-zone" },
            ].map((link, index) => (
              <li key={index}>
                <Link href={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="font-lato">
          <div className="mb-5">
            <h3 className="text-primary mb-5 text-lg font-semibold">
              Contact Us
            </h3>
            <p>For Subscription / general enquiries:</p>
          </div>
          <ul className="grid gap-y-4 text-sm leading-5">
            <li>
              <Link href="#" className="flex items-center gap-x-1.5">
                <Image
                  src="/email.svg"
                  alt="phone icon"
                  width={20}
                  height={20}
                />
                NigeriaFC@gmail.com
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-x-1.5">
                <Image
                  src="/phone.svg"
                  alt="phone icon"
                  width={20}
                  height={20}
                />
                +2348037369123
              </Link>
            </li>
          </ul>
        </section>
      </section>

      {/* Copyright */}
      <section className="border-border-default justify-between border-t pt-5 text-center text-sm leading-7 lg:flex">
        <p>Copyright © 2025 footballnigeria.com</p>
        <p>
          All Rights Reserved |{" "}
          <Link className="underline" href={"#"}>
            Terms and Conditions
          </Link>{" "}
          |{" "}
          <Link className="underline" href={"#"}>
            Privacy Policy
          </Link>
        </p>
      </section>
    </footer>
  );
}
