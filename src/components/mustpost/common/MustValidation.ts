export function mustValidation(
  setError: React.Dispatch<
    React.SetStateAction<{
      titleError: string;
      categoryError: string;
      itemNameError: string;
      companyError: string;
      priceError: string;
      imageUrlError: string;
    }>
  >,
  title: string,
  selectedCategoryId: string,
  itemName: string,
  company: string,
  price: number,
  imgUrl: string
): boolean {
  setError({
    titleError: "",
    categoryError: "",
    itemNameError: "",
    companyError: "",
    priceError: "",
    imageUrlError: "",
  });
  if (!title.trim()) {
    setError((prev) => ({
      ...prev,
      titleError: "제목은 필수 입력입니다.",
    }));
    return false;
  }
  if (title.length > 50) {
    setError((prev) => ({
      ...prev,
      titleError: "제목은 최대 50자까지 입력 가능합니다",
    }));
    return false;
  }
  if (!selectedCategoryId) {
    setError((prev) => ({
      ...prev,
      categoryError: "카테고리를 선택하세요.",
    }));
    return false;
  }
  if (!itemName.trim()) {
    setError((prev) => ({
      ...prev,
      itemNameError: "상품 이름은 필수 입력입니다.",
    }));
    return false;
  }
  if (!company.trim()) {
    setError((prev) => ({
      ...prev,
      companyError: "구매처는 필수 입력입니다.",
    }));
    return false;
  }
  if (price <= 0) {
    setError((prev) => ({
      ...prev,
      priceError: "가격을 올바른 단위로 입력해주세요.",
    }));
    return false;
  }
  if (price > 10000000) {
    setError((prev) => ({
      ...prev,
      priceError: "가격은 최대 999만원까지 입력 가능합니다.",
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
}
