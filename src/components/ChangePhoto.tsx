"use client";

import { useRouter } from "next/navigation";
import { setRecipeImageAction } from "@/app/actions";
import { PhotoButton } from "./PhotoUpload";

/** 상세 페이지 사진 위에 붙는 '사진 바꾸기' — 요리할 때마다 새로 찍은 사진으로 바로 교체 */
export function ChangePhoto({ recipeId, hasPhoto }: { recipeId: string; hasPhoto: boolean }) {
  const router = useRouter();
  return (
    <PhotoButton
      recipeId={recipeId}
      label={hasPhoto ? "📷 사진 바꾸기" : "📷 사진 올리기"}
      className="btn bg-card/95 px-4 py-2 text-[15px] text-ink shadow-sm hover:bg-white"
      onUploaded={async (url) => {
        const res = await setRecipeImageAction(recipeId, url);
        if (res.error) throw new Error(res.error);
        router.refresh();
      }}
    />
  );
}
