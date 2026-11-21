import { redirect } from "next/navigation";
import { GuideEditor } from "@/components/GuideEditor";
import { isEditor } from "@/lib/auth";
import { SECTIONS, type Section } from "@/lib/guides";
import { listGuides } from "@/lib/store";
import { groupsBySection } from "../groups";

export const metadata = { title: "새로 적기" };

export default async function NewGuidePage({ searchParams }: { searchParams: Promise<{ section?: string }> }) {
  const raw = (await searchParams).section;
  const section: Section = SECTIONS.some((s) => s.id === raw) ? (raw as Section) : "cleaning";
  if (!(await isEditor())) redirect(`/login?next=/guides/new?section=${section}`);
  return <GuideEditor guide={null} initialSection={section} groupsBySection={groupsBySection(await listGuides())} />;
}
