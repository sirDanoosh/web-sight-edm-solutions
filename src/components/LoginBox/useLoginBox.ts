import { ChangeEvent, useEffect, useState } from "react";

export enum USER_TYPE {
  VIEWER = "viewer",
  EDITOR = "editor",
}

const useLoginBox = () => {
  const [userName, setUserName] = useState<string>("");
  const [userType, setUserType] = useState<USER_TYPE>(USER_TYPE.VIEWER);
  const [isSubmittable, setIsSubmittable] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [tagValidationList, setTagValidationList] = useState<{
    min8: boolean;
    min1u: boolean;
    min1l: boolean;
    min1s: boolean;
  }>({
    min8: false,
    min1u: false,
    min1l: false,
    min1s: false,
  });

  function changeUserType(e: ChangeEvent<HTMLInputElement>) {
    setUserType(e.target.value as USER_TYPE);
  }

  function updateUserName(e: ChangeEvent<HTMLInputElement>) {
    setUserName(e.target.value);
  }

  function updatePassword(e: ChangeEvent<HTMLInputElement>) {
    const passwordTemp = e.target.value;

    const hasLower = /[a-z]/.test(passwordTemp);
    const hasUpper = /[A-Z]/.test(passwordTemp);
    const has8Characters = passwordTemp.length >= 8;
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
      passwordTemp
    );

    const tagValidationTemp = {
      min8: has8Characters,
      min1l: hasLower,
      min1s: hasSpecial,
      min1u: hasUpper,
    };

    const progressTemp =
      Object.values(tagValidationTemp).filter((item) => item === true).length *
      25;

    setTagValidationList(tagValidationTemp);
    setProgress(progressTemp);
  }

  function submitHandler() {
    if (isSubmittable) {
      if (userType === USER_TYPE.VIEWER) {
        window.location.href = "/table?viewer";
      } else {
        window.location.href = "/table?editor";
      }
    }
  }

  useEffect(() => {
    if (
      userName &&
      tagValidationList.min1l &&
      tagValidationList.min1u &&
      tagValidationList.min1s &&
      tagValidationList.min8
    ) {
      setIsSubmittable(true);
    } else {
      setIsSubmittable(false);
    }
  }, [tagValidationList, userName]);

  return {
    tagValidationList,
    userType,
    changeUserType,
    updateUserName,
    updatePassword,
    submitHandler,
    isSubmittable,
    progress,
  };
};

export default useLoginBox;
