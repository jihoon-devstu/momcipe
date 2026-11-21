import { notFound, redirect } from "next/navigation";
import { GuideEditor } from "@/components/GuideEditor";
import { isEditor } from "@/lib/auth";
import { getGuide, listGuides } from "@/lib/store";
import { groupsBySection } from "../../groups";

export const dynamic = "force-dynamic";

export default async function EditGuidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!(await isEditor())) redirect(`/login?next=/guides/${id}/edit`);
  const guide = await getGuide(id);
  if (!guide) notFound();
  return <GuideEditor guide={guide} initialSection={guide.section} groupsBySection={groupsBySection(await listGuides())} />;
}
