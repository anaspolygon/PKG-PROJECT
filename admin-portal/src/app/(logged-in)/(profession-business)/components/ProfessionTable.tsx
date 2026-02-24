/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  checkPermission,
  isRegularBusinessOrProfession,
  PageName,
  ProfessionItem,
  ProfessionRow,
} from "../types/ProfessionTypes";
import ActionBtn from "@/components/buttons/ActionBtn";
import Table from "@/components/ui/table";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface ProfessionProps {
  data: ProfessionItem[];
  pageName: PageName;
  openModal: () => void;
  setSelectedItem: (
    item: Omit<ProfessionRow, "risk_type" | "risk_score">,
  ) => void;
}

const ProfessionTable = ({
  data,
  pageName,
  openModal,
  setSelectedItem,
}: ProfessionProps) => {
  const info = useLocalStorage("info");
  const columns = [
    { title: "Label", key: "label" as keyof ProfessionRow },
    {
      title: "Ababil SBS Code",
      key: "ababil_sbs_code" as keyof ProfessionRow,
    },
    {
      title: "Finacle SBS Code",
      key: "finacle_sbs_code" as keyof ProfessionRow,
    },
    ...(isRegularBusinessOrProfession(pageName)
      ? [
          {
            title: "Risk Score",
            key: "risk_score" as keyof ProfessionRow,
          },
          {
            title: "Category Code",
            key: "category_code" as keyof ProfessionRow,
          }
        ]
      : []),
    ...(checkPermission(pageName, info)
      ? [
          {
            title: "Actions",
            key: "actions" as keyof ProfessionRow,
            render: (_: any, record: ProfessionRow) => (
              <div className="flex justify-start items-center">
                <ActionBtn
                  onClick={() => {
                    openModal();
                    setSelectedItem({
                      label: record.label,
                      value: record.value,
                      ababil_sbs_code: record?.ababil_sbs_code ?? "",
                      finacle_sbs_code: record?.finacle_sbs_code ?? "",
                      ...(isRegularBusinessOrProfession(pageName)
                        ? { risk_score: record?.risk_score }
                        : {}),
                      ...(isRegularBusinessOrProfession(pageName)
                        ? { category_code: record?.category_code }
                        : {}),
                    });
                  }}
                  type="edit"
                />
              </div>
            ),
          },
        ]
      : []),
  ];

  const dataSource = data.map((item) => ({
    label: item.label,
    value: item.value,
    ...item.additional_data,
  }));

  return <Table columns={columns} dataSource={dataSource} />;
};

export default ProfessionTable;
