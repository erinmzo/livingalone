export function groupValidation(
  setError: React.Dispatch<
    React.SetStateAction<{
      titleError: string;
      endDateError: string;
      peopleNumError: string;
      itemError: string;
      imageUrlError: string;
    }>
  >,
  title: string,
  endDate: string,
  peopleNum: number,
  item: string,
  imgUrl: string
): boolean {
  setError({
    titleError: "",
    endDateError: "",
    peopleNumError: "",
    itemError: "",
    imageUrlError: "",
  });
  if (!title.trim()) {
    setError((prev) => ({
      ...prev,
      titleError: "제목은 필수 입력입니다.",
    }));
    return false;
  }
  if (!endDate.trim()) {
    setError((prev) => ({
      ...prev,
      endDateError: "마감일을 지정해주세요.",
    }));
    return false;
  }

  if (peopleNum > 30) {
    setError((prev) => ({
      ...prev,
      peopleNumError: "최대 공구 인원은 30명까지입니다.",
    }));
    return false;
  }
  if (peopleNum <= 0) {
    setError((prev) => ({
      ...prev,
      peopleNumError: "최소 공구 인원은 1명 이상입니다.",
    }));
    return false;
  }

  if (!item.trim()) {
    setError((prev) => ({
      ...prev,
      itemError: "상품 이름은 필수 입력입니다.",
    }));
    return false;
  }

  if (!imgUrl.trim()) {
    setError((prev) => ({
      ...prev,
      imageUrlError: "이미지 업로드는 필수입니다.",
    }));
    return false;
  }
  return true;
  console.log("haha");
}
