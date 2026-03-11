import React from "react";
import Typewriter from "typewriter-effect";
import { useTranslation } from "react-i18next";

export default function Type() {
  const { t } = useTranslation();

  return (
    <Typewriter
      options={{
        strings: [
          t("type_devops"),
          t("type_platform"),
          t("type_cloud"),
          t("type_terraform"),
          t("type_cicd"),
          t("type_infra"),
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 30,
      }}
    />
  );
}
