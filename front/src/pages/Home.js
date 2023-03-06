import React from "react";
import DocumentMeta from "react-document-meta";
import { useTranslation } from "react-i18next";
import useMeta from "../hooks/useMeta";

function Home() {
  const {t,i18n}=useTranslation()
  const meta = useMeta(t("home.pageName"), t("home.pageDescription"));
  return (
    <DocumentMeta {...meta} className="container-fluid">
      <div><h1>Jalyss</h1></div>
    </DocumentMeta>
  );
}

export default Home;
