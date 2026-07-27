import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { GetInvolved } from "@/components/GetInvolved";

export const metadata: Metadata = {
  title: "Get Involved — NISARG Foundation",
  description:
    "Volunteer, donate, intern, or partner with NISARG Foundation to support sustainable agriculture and rural community development across India.",
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Be part of the change."
        description="Whether you want to volunteer, donate, intern, or build a CSR partnership — there's a meaningful way for you to contribute."
      />
      <GetInvolved />
    </>
  );
}
