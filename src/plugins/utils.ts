export function isEmpty(value: any) {
  // null, undefined 확인, 문자열일때도 확인
  if (value == null || value == undefined) {
    return true;
  }

  // 숫자 처리: 숫자는 0이 비어 있다고 판단
  if (typeof value === "number") {
    return value === 0; // 0일 때만 비어 있다고 간주
  }

  // 문자열 확인: 공백 문자열 비어 있음
  if (typeof value === "string") {
    return value.trim() === "";
  }

  // 배열 확인: 길이가 0이면 비어 있음
  if (Array.isArray(value)) {
    return value.length === 0;
  }

  // 객체 확인: 키가 없으면 비어 있음
  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }

  // 기타 값은 비어 있지 않음
  return false;
}
