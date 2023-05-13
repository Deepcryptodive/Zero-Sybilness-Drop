import { exec } from "child_process";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="container">
      <h1>
        Zero Sybilness Drop
        <br />
      </h1>
      <h3>
      with Sismo Connect on Polygon
      </h3>
      <section>
        <ul>
          <li onClick={() => router.push("/level-2-claim-airdrop")}>
            <h3>
            Claim a gated airdrop anonymously <br />
            while proving that you are human
            </h3>
            <p>
              Sign an address with Sismo Connect where you wish to receive the token airdrop while proving
              that you are a unique individual. Supports Gitcoin Passport and other verification methods!
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
}
